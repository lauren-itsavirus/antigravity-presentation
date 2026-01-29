import Slide from '../_components/Slide';
import IntroViz from '../_components/viz/IntroViz';

export default function Slide1() {
  return (
    <Slide>
      <IntroViz />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-8xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8 drop-shadow-2xl">
          From Bricklayer to Architect
        </h1>
        <h2 className="text-5xl text-zinc-300 font-light tracking-wide">
          The Era of Agentic Coding
        </h2>
        <div className="mt-12 text-2xl text-zinc-500 uppercase tracking-widest border-t border-zinc-700 pt-8 w-1/2">
          Comparing Cursor, Claude, and Google Antigravity
        </div>
      </div>
    </Slide>
  );
}
