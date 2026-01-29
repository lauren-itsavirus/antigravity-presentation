'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';

export default function SceneWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`w-full h-full absolute inset-0 z-0 pointer-events-none ${className}`}>
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                {children}
            </Canvas>
        </div>
    );
}
