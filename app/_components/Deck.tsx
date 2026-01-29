'use client';

import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SlideLayout from './SlideLayout';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

interface DeckProps {
    children: React.ReactNode;
}

interface DeckContextType {
    goToNext: () => void;
    goToPrev: () => void;
    setNavigationLocked: (locked: boolean) => void;
    currentIndex: number;
}

export const DeckContext = createContext<DeckContextType | null>(null);

export function useDeck() {
    const context = useContext(DeckContext);
    if (!context) {
        throw new Error('useDeck must be used within a Deck');
    }
    return context;
}

export default function Deck({ children }: DeckProps) {
    const slides = React.Children.toArray(children);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isNavigationLocked, setNavigationLocked] = useState(false);

    const goToNext = useCallback(() => {
        if (currentIndex < slides.length - 1) {
            setDirection(1);
            setCurrentIndex((prev) => prev + 1);
        }
    }, [currentIndex, slides.length]);

    const goToPrev = useCallback(() => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex((prev) => prev - 1);
        }
    }, [currentIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isNavigationLocked) return;

            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                goToNext();
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goToPrev();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToNext, goToPrev, isNavigationLocked]);

    const currentSlide = slides[currentIndex];

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1920 : -1920,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1920 : -1920,
            opacity: 0
        })
    };

    return (
        <DeckContext.Provider value={{ goToNext, goToPrev, setNavigationLocked, currentIndex }}>
            <div className="w-screen h-screen overflow-hidden bg-black relative text-white">
                <SlideLayout>
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="w-full h-full absolute inset-0"
                        >
                            {currentSlide}
                        </motion.div>
                    </AnimatePresence>
                </SlideLayout>

                <Controls
                    onNext={goToNext}
                    onPrev={goToPrev}
                    canNext={currentIndex < slides.length - 1}
                    canPrev={currentIndex > 0}
                />

                <ProgressBar current={currentIndex} total={slides.length} />
            </div>
        </DeckContext.Provider>
    );
}
