"use client";

import { Button } from "@/components/ui/button";

interface InfoCardProps {
  onShowInfo: () => void;
}

export function InfoCard({ onShowInfo }: InfoCardProps) {
  return (
    <div className="relative h-full">
      <div className="rounded-3xl border border-rose-200/70 bg-white p-6 md:p-8 shadow-xl">
        <div className="flex items-start gap-4">
          <span className="text-5xl">📸</span>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Capitalism meets comedy</h3>
            <p className="mt-2 text-slate-700">
              We've monetized laughter. Your great-grandmother paid more for a gumball, but at least this won't rot your teeth.
            </p>
            <ul className="mt-4 space-y-2 text-slate-700 list-disc list-inside">
              <li>Pick a topic (or let chaos decide)</li>
              <li>Download your scratch card to flex on social media</li>
              <li>Repeat until broke or satisfied</li>
            </ul>
            <div className="mt-6">
              <Button
                onClick={onShowInfo}
                variant="outline"
                className="rounded-xl border-rose-200/70 bg-white hover:bg-rose-50 text-slate-800"
              >
                How it works and help
              </Button>
            </div>
          </div>
        </div>

        {/* Simple color bars for personality */}
        <div className="mt-6 flex gap-2" aria-hidden>
          <div className="h-2 w-12 rounded-md bg-rose-300" />
          <div className="h-2 w-8 rounded-md bg-pink-300" />
          <div className="h-2 w-16 rounded-md bg-red-300" />
        </div>
      </div>
    </div>
  );
}