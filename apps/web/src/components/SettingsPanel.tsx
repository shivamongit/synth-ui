import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useGenerateStore } from '../store/generateStore';

interface SettingsPanelProps {
  onClose: () => void;
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { framework, setFramework, styling, setStyling, provider, setProvider, temperature, setTemperature } =
    useGenerateStore();

  return (
    <motion.aside
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="w-72 border-l border-zinc-800 bg-zinc-900/50 p-4"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-200">Settings</h3>
        <button onClick={onClose} className="btn-ghost">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        <SettingGroup label="Framework">
          {(['react', 'vue', 'svelte', 'html'] as const).map((fw) => (
            <OptionButton key={fw} active={framework === fw} onClick={() => setFramework(fw)}>
              {fw === 'react' ? 'React + TS' : fw === 'vue' ? 'Vue 3' : fw === 'svelte' ? 'Svelte' : 'HTML'}
            </OptionButton>
          ))}
        </SettingGroup>

        <SettingGroup label="Styling">
          {(['tailwind', 'css-modules', 'styled-components', 'vanilla'] as const).map((s) => (
            <OptionButton key={s} active={styling === s} onClick={() => setStyling(s)}>
              {s === 'tailwind' ? 'Tailwind' : s === 'css-modules' ? 'CSS Modules' : s === 'styled-components' ? 'Styled' : 'Vanilla'}
            </OptionButton>
          ))}
        </SettingGroup>

        <SettingGroup label="AI Provider">
          {(['openai', 'anthropic'] as const).map((p) => (
            <OptionButton key={p} active={provider === p} onClick={() => setProvider(p)}>
              {p === 'openai' ? 'GPT-4o' : 'Claude 3.5'}
            </OptionButton>
          ))}
        </SettingGroup>

        <div>
          <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Temperature: {temperature.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-brand-500"
          />
          <div className="flex justify-between text-[10px] text-zinc-600">
            <span>Precise</span>
            <span>Creative</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

function SettingGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </label>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function OptionButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-2.5 py-1.5 text-xs transition-colors ${
        active
          ? 'bg-brand-600/20 text-brand-400 ring-1 ring-brand-500/30'
          : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
      }`}
    >
      {children}
    </button>
  );
}
