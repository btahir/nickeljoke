# NickelJoke - Pay a Nickel to Get a Joke Using x402 Micropayments

![Screenshot of the app](./src/app/opengraph-image.png)

**NickelJoke** is a web application that generates personalized jokes on any topic using AI, powered by the [x402](https://x402.org) payment protocol. Pay small amounts of USDC to get custom jokes, demonstrating the future of micropayments for AI services.

Built with [Next.js](https://nextjs.org), [x402](https://x402.org), and [Coinbase CDP](https://docs.cdp.coinbase.com/), this app showcases how easy it is to monetize AI services with cryptocurrency payments in a fun, engaging way. 

This project was built using the [x402 AI Starter Kit](https://github.com/vercel-labs/x402-ai-starter) - a Next.js template that demonstrates how to integrate x402 payments with AI services.

## ✨ Features

- 🎭 **AI-Powered Jokes** - Generate custom jokes on any topic using advanced AI
- 💰 **Micropayments** - Pay small amounts of USDC using the x402 protocol
- 🎲 **Smart Suggestions** - Get random topic ideas for instant inspiration
- 📱 **Mobile-First** - Beautiful, responsive design with smooth animations
- 🎨 **Interactive Experience** - Scratch-to-reveal joke cards with satisfying animations
- 📤 **Social Sharing** - Share your favorite jokes with unique, shareable links
- 🎉 **Delightful UX** - Confetti animations and engaging visual feedback
- 🔗 **Easy Wallet Connection** - Seamless Base network integration

## 🛠️ Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[x402](https://x402.org)** - Payment protocol for HTTP
- **[Coinbase CDP](https://docs.cdp.coinbase.com/)** - Wallet and payment infrastructure
- **[Wagmi](https://wagmi.sh/)** - React hooks for Ethereum
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://motion.dev/)** - Animation library
- **[Radix UI](https://radix-ui.com/)** - Accessible component primitives
- **[TypeScript](https://typescriptlang.org/)** - Type safety

## 🚀 Getting Started

```bash
git clone https://github.com/btahir/nickeljoke
cd nickeljoke
pnpm install
```

## 🏃‍♂️ Running Locally

1. **Set up Coinbase CDP credentials**
   
   Sign into the [Coinbase CDP portal](https://portal.cdp.coinbase.com) and create API keys.

2. **Configure environment variables**
   
   Copy `.env.example` to `.env.local` and set:
   - `CDP_API_KEY_ID` - Your CDP API key ID
   - `CDP_API_KEY_SECRET` - Your CDP API secret
   - `CDP_WALLET_SECRET` - Your wallet secret phrase

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open the app**
   
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 How to Use

1. **Connect your wallet** using the header button
2. **Switch to Base Sepolia** (testnet) if prompted
3. **Enter a joke topic** or click "Random Topic" for suggestions
4. **Generate a joke** - this will cost a small amount of USDC
5. **Scratch to reveal** your personalized joke
6. **Share your joke** with the share button

## 🧪 Testing Payments

The app uses **Base Sepolia** (testnet) by default, so you can test with fake money. Get free testnet USDC from the [Coinbase CDP faucet](https://portal.cdp.coinbase.com/products/faucet?token=USDC&network=base-sepolia).

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect to [Vercel](https://vercel.com/) and deploy
3. Add environment variables in your Vercel project settings:
   - `CDP_API_KEY_ID`
   - `CDP_API_KEY_SECRET` 
   - `CDP_WALLET_SECRET`

### Production Setup

To use mainnet (real money):
1. Set `NETWORK=base` in your environment variables
2. Ensure your CDP wallet has sufficient USDC for joke generation costs
3. Monitor usage through the [Coinbase CDP dashboard](https://portal.cdp.coinbase.com/)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/joke/          # Joke generation API endpoint
│   └── share/[id]/        # Shared joke pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── rough-components/ # Hand-drawn style components
│   └── joke-*.tsx        # Joke-specific components
└── lib/                  # Utilities and configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
