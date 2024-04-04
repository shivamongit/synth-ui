import { useCallback } from 'react';
import { Copy, Download, Check } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useGenerateStore } from '../store/generateStore';

export function CodeEditor() {
  const { generatedCode, setGeneratedCode } = useGenerateStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  }, [generatedCode]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([generatedCode], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Component.tsx';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded Component.tsx');
  }, [generatedCode]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-zinc-400">Generated Code</span>
          <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500">TSX</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleCopy} className="btn-ghost text-xs" title="Copy code">
            {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
          <button onClick={handleDownload} className="btn-ghost text-xs" title="Download">
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-zinc-950 p-4">
        <pre className="font-mono text-xs leading-relaxed text-zinc-300">
          <code>{generatedCode}</code>
        </pre>
      </div>
    </div>
  );
}
