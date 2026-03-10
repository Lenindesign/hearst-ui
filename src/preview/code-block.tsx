"use client";

import { useState } from "react";

export function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative rounded-lg border bg-[#1e1e2e] text-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs text-white/40">{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-xs text-white/40 transition-colors hover:text-white/70"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-white/80">
        <code>{code}</code>
      </pre>
    </div>
  );
}
