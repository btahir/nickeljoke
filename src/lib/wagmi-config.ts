import { http, createConfig } from 'wagmi'
import { baseSepolia, base } from 'wagmi/chains'
import { injected, metaMask, coinbaseWallet } from 'wagmi/connectors'

export const config = createConfig({
  chains: [baseSepolia, base],
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet({ appName: 'x402 AI Starter' }),
  ],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
})