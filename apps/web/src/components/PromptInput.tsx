import { useState, useCallback, KeyboardEvent } from 'react';
import { Send, Loader2, Wand2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useGenerateStore } from '../store/generateStore';
import { generateComponent } from '../lib/api';

const EXAMPLE_PROMPTS = [
  'A pricing card with three tiers, highlighted popular plan, and toggle for monthly/yearly',
  'A dashboard sidebar with nav links, icons, user avatar, and collapsible sections',
  'A file upload zone with drag-and-drop, progress bar, and file type validation',
  'A kanban board with draggable cards, columns for todo/in-progress/done, and add card button',
];

export function PromptInput() {
  const {
    prompt,
    setPrompt,
    setGeneratedCode,
    setIsGenerating,
    isGenerating,
    framework,
    styling,
    provider,
    temperature,
    addToHistory,
    setError,
  } = useGenerateStore();

  const [showExamples, setShowExamples] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateComponent({
        prompt: prompt.trim(),
        framework,
        styling,
        provider,
        temperature,
        max_tokens: 4096,
      });

      setGeneratedCode(result.code);
      addToHistory({
        id: result.id,
        prompt: prompt.trim(),
        code: result.code,
        framework,
        createdAt: result.created_at,
        isFavorite: false,
      });

      toast.success('Component generated!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Generation failed';
      setError(message);
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, isGenerating, framework, styling, provider, temperature]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="border-b border-zinc-800 p-4">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe a UI component... (Ctrl+Enter to generate)"
          rows={2}
          className="input-field min-h-[60px] resize-none pr-24"
          disabled={isGenerating}
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-1">
          <button
            onClick={() => setShowExamples(!showExamples)}
            className="btn-ghost text-xs"
            title="Show examples"
          >
            <Wand2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="btn-primary py-1.5 text-xs"
          >
            {isGenerating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
            Generate
          </button>
        </div>
      </div>

      {showExamples && (
        <div className="mt-2 flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((example) => (
            <button
              key={example}
              onClick={() => {
                setPrompt(example);
                setShowExamples(false);
              }}
              className="rounded-lg bg-zinc-800/50 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
            >
              {example.length > 60 ? example.slice(0, 60) + '...' : example}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
