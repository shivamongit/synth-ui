import { Clock, Star, Trash2, ChevronRight } from 'lucide-react';
import { useGenerateStore } from '../store/generateStore';

export function Sidebar() {
  const { history, toggleFavorite, removeFromHistory, setPrompt, setGeneratedCode } =
    useGenerateStore();

  const favorites = history.filter((h) => h.isFavorite);
  const recent = history.filter((h) => !h.isFavorite).slice(0, 10);

  return (
    <aside className="flex w-64 flex-col border-r border-zinc-800 bg-zinc-900/30">
      <div className="flex-1 overflow-y-auto p-3">
        {favorites.length > 0 && (
          <section className="mb-4">
            <h3 className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              <Star className="h-3 w-3" /> Favorites
            </h3>
            {favorites.map((item) => (
              <HistoryCard
                key={item.id}
                item={item}
                onSelect={() => {
                  setPrompt(item.prompt);
                  setGeneratedCode(item.code);
                }}
                onToggleFavorite={() => toggleFavorite(item.id)}
                onDelete={() => removeFromHistory(item.id)}
              />
            ))}
          </section>
        )}

        <section>
          <h3 className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            <Clock className="h-3 w-3" /> Recent
          </h3>
          {recent.length === 0 ? (
            <p className="px-2 text-xs text-zinc-600">No history yet. Generate your first component!</p>
          ) : (
            recent.map((item) => (
              <HistoryCard
                key={item.id}
                item={item}
                onSelect={() => {
                  setPrompt(item.prompt);
                  setGeneratedCode(item.code);
                }}
                onToggleFavorite={() => toggleFavorite(item.id)}
                onDelete={() => removeFromHistory(item.id)}
              />
            ))
          )}
        </section>
      </div>
    </aside>
  );
}

interface HistoryCardProps {
  item: { id: string; prompt: string; framework: string; createdAt: string; isFavorite: boolean };
  onSelect: () => void;
  onToggleFavorite: () => void;
  onDelete: () => void;
}

function HistoryCard({ item, onSelect, onToggleFavorite, onDelete }: HistoryCardProps) {
  return (
    <div className="group mb-1 rounded-lg p-2 transition-colors hover:bg-zinc-800/50">
      <button onClick={onSelect} className="w-full text-left">
        <p className="line-clamp-2 text-xs text-zinc-300">{item.prompt}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[10px] text-zinc-600">{item.framework}</span>
          <span className="text-[10px] text-zinc-700">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </div>
      </button>
      <div className="mt-1 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button onClick={onToggleFavorite} className="rounded p-0.5 hover:bg-zinc-700" title="Toggle favorite">
          <Star className={`h-3 w-3 ${item.isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-zinc-500'}`} />
        </button>
        <button onClick={onDelete} className="rounded p-0.5 hover:bg-zinc-700" title="Delete">
          <Trash2 className="h-3 w-3 text-zinc-500" />
        </button>
      </div>
    </div>
  );
}
