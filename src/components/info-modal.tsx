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
          <h4 className="text-xl font-bold">How it works and help</h4>
          <button
            onClick={onClose}
            className="rounded-xl border border-rose-200/70 px-3 py-1 text-sm hover:bg-rose-50"
          >
            Close
          </button>
        </div>
        <div className="mt-4 grid gap-4 text-sm">
          <div>
            <p className="font-semibold">Steps</p>
            <ol className="mt-2 list-decimal list-inside space-y-1 text-slate-700">
              <li>Connect your wallet in the header</li>
              <li>Pick a topic and request a joke</li>
              <li>Approve a 5¢ USDC payment</li>
              <li>Watch the joke stream in real time</li>
            </ol>
          </div>
          <div>
            <p className="font-semibold">Need help</p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-slate-700">
              <li>
                <strong>No Web3 wallet found</strong>: install MetaMask or Coinbase Wallet
              </li>
              <li>
                <strong>Switch network</strong>: use the header to select a supported network
              </li>
              <li>
                <strong>Payment required</strong>: add a little USDC and try again
              </li>
              <li>
                <strong>Still stuck</strong>: refresh the page and reconnect
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-rose-200/70 bg-rose-50 p-3 text-slate-700">
            <p className="text-xs">
              Tech note: payments use x402-fetch with wallet native authorization. No sign ups, just a tiny
              approval per joke.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}