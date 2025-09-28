"use client";

interface InfoModalProps {
  showInfo: boolean;
  onClose: () => void;
}

export function InfoModal({ showInfo, onClose }: InfoModalProps) {
  if (!showInfo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-pink-200/20"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-rose-200/70 bg-white p-6 md:p-8 text-slate-800 shadow-xl">
        <div className="flex items-start justify-between">
          <h4 className="text-xl font-bold">Overview</h4>
          <button
            onClick={onClose}
            className="rounded-xl border border-rose-200/70 px-3 py-1 text-sm hover:bg-rose-50"
          >
            Close
          </button>
        </div>
        <div className="mt-4 space-y-6 text-sm">
          <div>
            <p className="font-semibold text-slate-900">Using NickelJoke</p>
            <ol className="mt-3 space-y-2 text-slate-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-xs font-medium">1</span>
                <span>Connect your wallet and pick a topic</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-xs font-medium">2</span>
                <span>Approve a 5¢ USDC payment</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-xs font-medium">3</span>
                <span>Watch your joke stream in real time</span>
              </li>
            </ol>
          </div>

          <div>
            <p className="font-semibold text-slate-900">Setup Guide</p>
            <div className="mt-3 space-y-3 text-slate-700">
              <div>
                <p className="font-medium">1. Install wallet</p>
                <p className="text-xs text-slate-600">Download Coinbase Wallet browser extension or mobile app</p>
              </div>
              <div>
                <p className="font-medium">2. Add Base testnet</p>
                <p className="text-xs text-slate-600">Settings → Networks → Testnets → Base Sepolia</p>
              </div>
              <div>
                <p className="font-medium">3. Get test funds</p>
                <p className="text-xs text-slate-600">Visit any Base testnet faucet: <a href="https://docs.base.org/tools/network-faucets/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">official docs</a>, <a href="https://faucets.chain.link/base-sepolia" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Chainlink</a>, or <a href="https://www.alchemy.com/faucets/base-sepolia" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Alchemy</a></p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs text-amber-800">
              <strong>Quick troubleshooting:</strong> No wallet? Install MetaMask or Coinbase Wallet. Wrong network? Use the header to switch. Need USDC? Try the faucets above or refresh and reconnect.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}