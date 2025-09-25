import { Account, toAccount } from "viem/accounts";
import { CdpClient } from "@coinbase/cdp-sdk";
import { base, baseSepolia } from "viem/chains";
import { createPublicClient, http } from "viem";
import { env } from "./env";

const cdp = new CdpClient();

const chainMap = {
  "base-sepolia": baseSepolia,
  base: base,
} as const;

export const chain = chainMap[env.NEXT_PUBLIC_NETWORK];

const publicClient = createPublicClient({
  chain,
  transport: http(),
});

export async function getOrCreatePurchaserAccount(): Promise<Account> {
  const account = await cdp.evm.getOrCreateAccount({
    name: "Purchaser",
  });
  const balances = await account.listTokenBalances({
    network: env.NEXT_PUBLIC_NETWORK,
  });

  const usdcBalance = balances.balances.find(
    (balance) => balance.token.symbol === "USDC"
  );

  // if under $0.50 while on testnet, request more
  if (
    env.NEXT_PUBLIC_NETWORK === "base-sepolia" &&
    (!usdcBalance || Number(usdcBalance.amount) < 500000)
  ) {
    const { transactionHash } = await cdp.evm.requestFaucet({
      address: account.address,
      network: env.NEXT_PUBLIC_NETWORK,
      token: "usdc",
    });
    const tx = await publicClient.waitForTransactionReceipt({
      hash: transactionHash,
    });
    if (tx.status !== "success") {
      throw new Error("Failed to recieve funds from faucet");
    }
  }

  return toAccount(account);
}

export async function getOrCreateSellerAccount(): Promise<Account> {
  // If custom seller address is provided, create a mock account with that address
  if (env.SELLER_WALLET_ADDRESS) {
    console.log('💰 Using custom seller wallet:', env.SELLER_WALLET_ADDRESS);
    return {
      address: env.SELLER_WALLET_ADDRESS as `0x${string}`,
      // Mock account - just need the address for middleware
    } as Account;
  }
  
  // Otherwise use CDP-managed wallet
  const account = await cdp.evm.getOrCreateAccount({
    name: "Seller",
  });
  console.log('💰 Using CDP-managed seller wallet:', account.address);
  return toAccount(account);
}
