import Slide from '../_components/Slide';
import { AlertTriangle } from 'lucide-react';

export default function Slide6() {
  return (
    <Slide>
      <div className="relative z-10 flex flex-col h-full justify-center">
        <div className="mb-12">
          <h2 className="text-6xl font-bold text-red-500 mb-4 flex items-center gap-4">
            <AlertTriangle size={64} />
            The Auto-Pilot Paradox
          </h2>
          <h3 className="text-4xl text-zinc-400">The Risks of Total Agency</h3>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="p-8 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-red-900/50">
            <h4 className="text-2xl font-bold text-red-400 mb-4">Skill Atrophy</h4>
            <p className="text-xl text-zinc-300">
              Over-reliance leads to loss of deep understanding. If the Agent writes the SQL, can you still debug a deadlock at 3 AM?
            </p>
            <div className="mt-4 text-sm text-zinc-500 uppercase tracking-widest">Use It or Lose It</div>
          </div>

          <div className="p-8 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-red-900/50">
            <h4 className="text-2xl font-bold text-red-400 mb-4">The "Spinning" Cost</h4>
            <p className="text-xl text-zinc-300">
              Agents can get stuck in "Fix -&gt; Fail -&gt; Retry" loops. Can burn API credits or infinite-loop CI/CD without guardrails.
            </p>
          </div>

          <div className="p-8 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-red-900/50">
            <h4 className="text-2xl font-bold text-red-400 mb-4">Review Fatigue</h4>
            <p className="text-xl text-zinc-300">
              Harder to review 500 generated lines than write 50. "LGTM" syndrome creates subtle architectural bugs.
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
}
