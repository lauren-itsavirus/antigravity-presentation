'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';

interface ControlsProps {
    onPrev: () => void;
    onNext: () => void;
    canPrev: boolean;
    canNext: boolean;
}

export default function Controls({ onPrev, onNext, canPrev, canNext }: ControlsProps) {
    const [isFullscreen, setIsFullscreen] = React.useState(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    return (
        <div className="absolute bottom-4 left-4 z-50 flex gap-2">
            <button
                onClick={onPrev}
                disabled={!canPrev}
                className="p-2 bg-zinc-800/50 hover:bg-zinc-700 text-white rounded-full disabled:opacity-30 transition-colors backdrop-blur-sm"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={onNext}
                disabled={!canNext}
                className="p-2 bg-zinc-800/50 hover:bg-zinc-700 text-white rounded-full disabled:opacity-30 transition-colors backdrop-blur-sm"
            >
                <ChevronRight size={20} />
            </button>
            <button
                onClick={toggleFullscreen}
                className="p-2 bg-zinc-800/50 hover:bg-zinc-700 text-white rounded-full transition-colors backdrop-blur-sm ml-2"
            >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
        </div>
    );
}
