'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Sphere, Float, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Check, X } from 'lucide-react';

// --- 3D Scene Components ---

function AmbientScene() {
    const icoRef = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (icoRef.current) {
            // Slow rotation
            icoRef.current.rotation.y += 0.002;
            icoRef.current.rotation.x += 0.001;

            // "Breathing" scale sine wave
            const scale = 2.5 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
            icoRef.current.scale.set(scale, scale, scale);
        }

        if (coreRef.current) {
            // Pulse core
            const scale = 0.8 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
            coreRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group position={[0, 0, 0]}>
            {/* The Suit: Wireframe Icosahedron */}
            <Icosahedron ref={icoRef} args={[1, 2]}>
                <meshBasicMaterial
                    color="#06b6d4" // Cyan-500
                    wireframe
                    transparent
                    opacity={0.15}
                />
            </Icosahedron>

            {/* The Core: Glowing Sphere */}
            <Sphere ref={coreRef} args={[1, 32, 32]}>
                <meshStandardMaterial
                    color="#22d3ee" // Cyan-400
                    emissive="#22d3ee"
                    emissiveIntensity={2}
                    toneMapped={false}
                />
            </Sphere>
        </group>
    );
}

// --- UI Components ---

function ProsColumn() {
    return (
        <div className="flex flex-col justify-center h-full p-8 border-r border-white/5 bg-zinc-900/20 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-green-400 mb-8 uppercase tracking-widest flex items-center gap-2">
                <Check size={20} /> The Positive
            </h3>
            <ul className="space-y-8">
                <li>
                    <strong className="block text-white text-2xl mb-1">Flow State</strong>
                    <span className="text-zinc-400 text-lg">Never breaks rhythm. "Tab" is addictive.</span>
                </li>
                <li>
                    <strong className="block text-white text-2xl mb-1">Granular Control</strong>
                    <span className="text-zinc-400 text-lg">You see every line. Great for complex logic.</span>
                </li>
                <li>
                    <strong className="block text-white text-2xl mb-1">UX Superiority</strong>
                    <span className="text-zinc-400 text-lg">Best-in-class diffs.</span>
                </li>
            </ul>
        </div>
    );
}

function ConsColumn() {
    return (
        <div className="flex flex-col justify-center h-full p-8 border-l border-white/5 bg-zinc-900/20 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-amber-500 mb-8 uppercase tracking-widest flex items-center gap-2">
                <X size={20} /> The Negative
            </h3>
            <ul className="space-y-8">
                <li>
                    <strong className="block text-white text-2xl mb-1">The Context Trap</strong>
                    <span className="text-zinc-400 text-lg">Only knows open files. Struggles with massive refactors.</span>
                </li>
                <li>
                    <strong className="block text-white text-2xl mb-1">Tethered</strong>
                    <span className="text-zinc-400 text-lg">If you stop typing, it stops working.</span>
                </li>
            </ul>
        </div>
    );
}

export default function CursorSlide() {
    return (
        <div className="w-full h-full relative bg-[#050505] overflow-hidden">
            {/* 3D Moving Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <color attach="background" args={['#050505']} />
                    <fog attach="fog" args={['#050505', 5, 20]} />

                    <AmbientScene />

                    <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

                    <EffectComposer>
                        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.2} radius={0.5} />
                        <Noise opacity={0.03} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                </Canvas>
            </div>

            {/* UI Overlay Grid */}
            <div className="absolute inset-0 z-10 grid grid-cols-3">
                {/* Left Column: Pros */}
                <div className="col-span-1 h-full">
                    <ProsColumn />
                </div>

                {/* Center Column: Empty for 3D Main focus + Quote */}
                <div className="col-span-1 h-full relative flex flex-col justify-between items-center py-12 pointer-events-none">
                    <div className="text-center">
                        <h2 className="text-6xl font-bold bg-gradient-to-br from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2">Cursor</h2>
                        <h3 className="text-2xl text-cyan-200/50 uppercase tracking-widest font-light">The Bionic Suit</h3>
                    </div>

                    <p className="text-white/60 italic text-xl text-center max-w-md font-light">
                        "I am still writing the code, but I have a jetpack."
                    </p>
                </div>

                {/* Right Column: Cons */}
                <div className="col-span-1 h-full">
                    <ConsColumn />
                </div>
            </div>
        </div>
    );
}
