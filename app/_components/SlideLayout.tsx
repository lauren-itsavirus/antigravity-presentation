'use client';

import React, { useEffect, useState, useRef } from 'react';

interface SlideLayoutProps {
    children: React.ReactNode;
}

export default function SlideLayout({ children }: SlideLayoutProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (!containerRef.current) return;

            const parent = containerRef.current.parentElement;
            if (!parent) return;

            const parentWidth = parent.clientWidth;
            const parentHeight = parent.clientHeight;

            const targetWidth = 1920;
            const targetHeight = 1080;

            const scaleX = parentWidth / targetWidth;
            const scaleY = parentHeight / targetHeight;

            // Fit within the viewport while maintaining aspect ratio
            const newScale = Math.min(scaleX, scaleY);
            setScale(newScale);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial calculation

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full flex items-center justify-center overflow-hidden bg-black text-white"
        >
            <div
                style={{
                    width: '1920px',
                    height: '1080px',
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                }}
                className="bg-zinc-900 shadow-2xl relative overflow-hidden"
            >
                {children}
            </div>
        </div>
    );
}
