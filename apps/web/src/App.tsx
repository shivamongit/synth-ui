import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { PromptInput } from './components/PromptInput';
import { CodeEditor } from './components/CodeEditor';
import { Preview } from './components/Preview';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SettingsPanel } from './components/SettingsPanel';
import { useGenerateStore } from './store/generateStore';

export default function App() {
  const [showSettings, setShowSettings] = useState(false);
  const { generatedCode, isGenerating } = useGenerateStore();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-zinc-950">
      <Header onSettingsClick={() => setShowSettings(!showSettings)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex flex-1 flex-col overflow-hidden">
          <PromptInput />

          {generatedCode ? (
            <div className="flex flex-1 overflow-hidden">
              <div className="flex-1 overflow-hidden border-r border-zinc-800">
                <CodeEditor />
              </div>
              <div className="flex-1 overflow-hidden">
                <Preview />
              </div>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600/10">
                    <Sparkles className="h-8 w-8 text-brand-500" />
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-zinc-200">
                    Describe your component
                  </h2>
                  <p className="max-w-md text-sm text-zinc-500">
                    Type a description above and Synth UI will generate production-ready React +
                    TypeScript code with a live preview.
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </main>

        <AnimatePresence>
          {showSettings && (
            <SettingsPanel onClose={() => setShowSettings(false)} />
          )}
        </AnimatePresence>
      </div>

      {isGenerating && (
        <div className="absolute inset-x-0 top-0 h-0.5">
          <div className="h-full animate-pulse bg-gradient-to-r from-brand-600 via-brand-400 to-brand-600" />
        </div>
      )}
    </div>
  );
}
