import { base, baseSepolia } from "wagmi/chains";
import { env } from "./env";

// Use base for production, baseSepolia for development
export const TARGET_CHAIN = env.NEXT_PUBLIC_NETWORK === "base" ? base : baseSepolia;

export const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://nickeljoke.vercel.app' 
  : 'http://localhost:3000';
