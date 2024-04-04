import { useGenerateStore } from '../store/generateStore';
import { Monitor, Tablet, Smartphone, Grid3X3 } from 'lucide-react';

const VIEWPORT_SIZES = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: '100%', height: '100%' },
};

export function Preview() {
  const { generatedCode, viewport, setViewport, showGrid, toggleGrid, darkMode } =
    useGenerateStore();

  const size = VIEWPORT_SIZES[viewport];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <span className="text-xs font-medium text-zinc-400">Preview</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewport('mobile')}
            className={`btn-ghost text-xs ${viewport === 'mobile' ? 'text-brand-400' : ''}`}
          >
            <Smartphone className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`btn-ghost text-xs ${viewport === 'tablet' ? 'text-brand-400' : ''}`}
          >
            <Tablet className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setViewport('desktop')}
            className={`btn-ghost text-xs ${viewport === 'desktop' ? 'text-brand-400' : ''}`}
          >
            <Monitor className="h-3.5 w-3.5" />
          </button>
          <div className="mx-1 h-4 w-px bg-zinc-700" />
          <button
            onClick={toggleGrid}
            className={`btn-ghost text-xs ${showGrid ? 'text-brand-400' : ''}`}
          >
            <Grid3X3 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center overflow-auto bg-zinc-900/50 p-4">
        <div
          className={`relative overflow-hidden rounded-lg border border-zinc-700/50 ${
            darkMode ? 'bg-zinc-950' : 'bg-white'
          } ${showGrid ? 'bg-[url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'grid\' width=\'20\' height=\'20\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 20 0 L 0 0 0 20\' fill=\'none\' stroke=\'%2327272a\' stroke-width=\'0.5\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23grid)\'/%3E%3C/svg%3E")]' : ''}`}
          style={{
            width: typeof size.width === 'number' ? `${size.width}px` : size.width,
            height: typeof size.height === 'number' ? `${size.height}px` : size.height,
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
          <iframe
            title="Component Preview"
            srcDoc={buildPreviewHTML(generatedCode, darkMode)}
            className="h-full w-full border-0"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
}

function buildPreviewHTML(code: string, darkMode: boolean): string {
  return `<!DOCTYPE html>
<html class="${darkMode ? 'dark' : ''}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; }
    .dark body { background: #09090b; color: #fafafa; }
  </style>
</head>
<body>
  <div id="preview">${code}</div>
</body>
</html>`;
}
