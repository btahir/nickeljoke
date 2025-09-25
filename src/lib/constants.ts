import { base, baseSepolia } from "wagmi/chains";
import { env } from "./env";

// Use base for production, baseSepolia for development
export const TARGET_CHAIN = env.NEXT_PUBLIC_NETWORK === "base" ? base : baseSepolia;
