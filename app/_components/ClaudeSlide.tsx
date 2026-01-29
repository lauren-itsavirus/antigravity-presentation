'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Float, Stars, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Check, X } from 'lucide-react';

// --- 3D Scene Components ---

function BrainInABox() {
    const boxRef = useRef<THREE.Mesh>(null);
    const brainRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (brainRef.current) {
            // Complex rotation for the "brain"
            brainRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
            brainRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
        }

        if (boxRef.current) {
            // Very subtle float/tilt for the container
            boxRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.02;
            boxRef.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.1) * 0.02;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            {/* Outer Object: The Glass Cube (Container) */}
            <Box ref={boxRef} args={[2.5, 2.5, 2.5]}>
                <MeshTransmissionMaterial
                    backside={false}
                    samples={16}
                    resolution={1024}
                    transmission={1}
                    roughness={0.05}
                    thickness={0.5}
                    ior={1.5}
                    chromaticAberration={0.03}
                    anisotropy={0.1}
                    distortion={0.1}
                    distortionScale={0.1}
                    temporalDistortion={0.1}
                    clearcoat={1}
                    attenuationDistance={0.5}
                    attenuationColor="#ffffff"
                    color="#ffffff"
                    background={new THREE.Color('#000000')}
                />
            </Box>

            {/* Inner Object: Glowing Neural Cloud (Brain) */}
            <group ref={brainRef}>
                {/* Internal Point Lights to catch glass edges */}
                <pointLight position={[0.5, 0.5, 0.5]} intensity={2} color="#f59e0b" distance={3} decay={2} />
                <pointLight position={[-0.5, -0.5, -0.5]} intensity={2} color="#fbbf24" distance={3} decay={2} />

                {/* Core Structure */}
                <Sphere args={[0.8, 32, 32]}>
                    <meshStandardMaterial
                        color="#f59e0b"
                        emissive="#f59e0b"
                        emissiveIntensity={4}
                        wireframe
                        transparent
                        opacity={0.3}
                    />
                </Sphere>

                {/* Dense Cloud of Particles - The Content */}
                <Sparkles
                    count={300}
                    scale={1.8}
                    size={4}
                    speed={0.2}
                    opacity={0.8}
                    color="#fbbf24"
                />

                {/* Inner Synapses - High density, small, fast */}
                <Sparkles
                    count={500}
                    scale={1.0}
                    size={1.5}
                    speed={0.5}
                    opacity={1}
                    color="#ffffff"
                />

                {/* Secondary jagged structure */}
                <Sphere args={[1.0, 4, 4]}>
                    <meshBasicMaterial color="#b45309" wireframe transparent opacity={0.2} />
                </Sphere>
            </group>
        </group>
    );
}

// --- UI Components ---

function ProsColumn() {
    return (
        <div className="flex flex-col justify-center h-full p-8 border-r border-white/5 bg-zinc-900/20 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-green-500 mb-8 uppercase tracking-widest flex items-center gap-2">
                <Check size={20} /> The Positive
            </h3>
            <ul className="space-y-8">
                <li>
                    <strong className="block text-white text-2xl mb-1">Reasoning Depth</strong>
                    <span className="text-zinc-400 text-lg">Unmatched logic. Great for architectural debates.</span>
                </li>
                <li>
                    <strong className="block text-white text-2xl mb-1">Terminal Native</strong>
                    <span className="text-zinc-400 text-lg">Great for "headless" tasks or quick scripts.</span>
                </li>
            </ul>
        </div>
    );
}

function ConsColumn() {
    return (
        <div className="flex flex-col justify-center h-full p-8 border-l border-white/5 bg-zinc-900/20 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-red-500 mb-8 uppercase tracking-widest flex items-center gap-2">
                <X size={20} /> The Negative
            </h3>
            <ul className="space-y-8">
                <li>
                    <strong className="block text-white text-2xl mb-1">The "Blindfold"</strong>
                    <span className="text-zinc-400 text-lg">Cannot see localhost. "Looks correct, renders broken."</span>
                </li>
                <li>
                    <strong className="block text-white text-2xl mb-1">Friction</strong>
                    <span className="text-zinc-400 text-lg">The Context Switching tax. It feels like a separate tool.</span>
                </li>
            </ul>
        </div>
    );
}

export default function ClaudeSlide() {
    return (
        <div className="w-full h-full relative bg-[#050505] overflow-hidden">
            {/* 3D Moving Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <color attach="background" args={['#050505']} />
                    <fog attach="fog" args={['#050505', 5, 20]} />

                    <ambientLight intensity={0.2} />
                    <BrainInABox />

                    <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

                    <EffectComposer>
                        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.6} />
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

                {/* Center Column: Title + 3D Focus + Quote */}
                <div className="col-span-1 h-full relative flex flex-col justify-between items-center py-12 pointer-events-none">
                    <div className="text-center">
                        {/* Font mono for CLI feel */}
                        <h2 className="text-6xl font-bold bg-gradient-to-b from-amber-300 to-amber-600 bg-clip-text text-transparent mb-2 tracking-tighter" style={{ fontFamily: 'monospace' }}>Claude CLI</h2>
                        <h3 className="text-2xl text-amber-200/50 uppercase tracking-widest font-light">The Brain in a Box</h3>
                    </div>

                    <p className="text-amber-100/60 italic text-xl text-center max-w-md font-light">
                        "I need a genius to think through this problem, but I have to copy-paste the result."
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
