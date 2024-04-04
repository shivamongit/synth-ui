import { Settings, Github, Moon, Sun } from 'lucide-react';
import { useGenerateStore } from '../store/generateStore';

interface HeaderProps {
  onSettingsClick: () => void;
}

export function Header({ onSettingsClick }: HeaderProps) {
  const { darkMode, toggleDarkMode } = useGenerateStore();

  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-800 px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
          <span className="text-sm font-bold text-white">S</span>
        </div>
        <span className="text-sm font-semibold text-zinc-200">Synth UI</span>
        <span className="rounded-full bg-brand-600/10 px-2 py-0.5 text-[10px] font-medium text-brand-400">
          BETA
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button onClick={toggleDarkMode} className="btn-ghost" title="Toggle theme">
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <a
          href="https://github.com/shivamongit/synth-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          <Github className="h-4 w-4" />
        </a>
        <button onClick={onSettingsClick} className="btn-ghost" title="Settings">
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
