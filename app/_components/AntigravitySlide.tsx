'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars, Sparkles, Line } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Check, X } from 'lucide-react';

// --- 3D Scene Components ---

function SwarmParticle({ initialPosition }: { initialPosition: [number, number, number] }) {
    const mesh = useRef<THREE.Mesh>(null);
    const offset = useMemo(() => Math.random() * Math.PI * 2, []);
    const speed = useMemo(() => 0.5 + Math.random() * 0.5, []);

    useFrame((state) => {
        if (mesh.current) {
            const t = state.clock.getElapsedTime();
            // Chaotic but bounded movement
            mesh.current.position.x = initialPosition[0] + Math.sin(t * speed + offset) * 0.3;
            mesh.current.position.y = initialPosition[1] + Math.cos(t * speed * 1.2 + offset) * 0.3;
            mesh.current.position.z = initialPosition[2] + Math.sin(t * speed * 0.8 + offset) * 0.3;
        }
    });

    return (
        <mesh ref={mesh} position={initialPosition}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#10b981" />
        </mesh>
    );
}

function LivingSwarm() {
    const groupRef = useRef<THREE.Group>(null);

    // Generate particle positions in a spherical distribution
    const particlePositions = useMemo(() => {
        const positions: [number, number, number][] = [];
        const count = 150;
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 1.5 + Math.random() * 0.8;
            positions.push([
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            ]);
        }
        return positions;
    }, []);

    // Generate connection lines between nearby particles
    const connections = useMemo(() => {
        const lines: [number, number, number][][] = [];
        const threshold = 1.2;
        for (let i = 0; i < particlePositions.length; i++) {
            for (let j = i + 1; j < particlePositions.length; j++) {
                const dx = particlePositions[i][0] - particlePositions[j][0];
                const dy = particlePositions[i][1] - particlePositions[j][1];
                const dz = particlePositions[i][2] - particlePositions[j][2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist < threshold && lines.length < 100) { // Limit connections
                    lines.push([particlePositions[i], particlePositions[j]]);
                }
            }
        }
        return lines;
    }, [particlePositions]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* The Core: Glowing Agent Anchor */}
            <Sphere args={[0.5, 32, 32]}>
                <meshStandardMaterial
                    color="#10b981"
                    emissive="#10b981"
                    emissiveIntensity={3}
                    toneMapped={false}
                />
            </Sphere>

            {/* Core Halo */}
            <Sphere args={[0.7, 16, 16]}>
                <meshBasicMaterial color="#10b981" transparent opacity={0.1} wireframe />
            </Sphere>

            {/* Swarm Particles */}
            {particlePositions.map((pos, i) => (
                <SwarmParticle key={i} initialPosition={pos} />
            ))}

            {/* Network Connections */}
            {connections.map((points, i) => (
                <Line
                    key={i}
                    points={points}
                    color="#10b981"
                    lineWidth={0.5}
                    transparent
                    opacity={0.2}
                />
            ))}

            {/* Ambient Sparkles */}
            <Sparkles count={200} scale={4} size={2} speed={0.3} opacity={0.6} color="#34d399" />
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
                    <strong className="block text-white text-2xl mb-1">Full Loop Agency</strong>
                    <span className="text-zinc-400 text-lg">Doesn't just write code; runs it. Fixes its own mistakes.</span>
                </li>
                <li>
                    <strong className="block text-white text-2xl mb-1">Infrastructure Aware</strong>
                    <span className="text-zinc-400 text-lg">Integrates with Cloud/Deployments. Manages the environment.</span>
                </li>
                <li>
                    <strong className="block text-white text-2xl mb-1">Async Work</strong>
                    <span className="text-zinc-400 text-lg">Give it a 20-min task and get coffee. Works while you are away.</span>
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
                    <strong className="block text-white text-2xl mb-1">"Black Box" Anxiety</strong>
                    <span className="text-zinc-400 text-lg">Loss of control when files change in background.</span>
                </li>
                <li>
                    <strong className="block text-white text-2xl mb-1">Latency</strong>
                    <span className="text-zinc-400 text-lg">Not as "snappy" as Cursor. Takes time to "plan."</span>
                </li>
                <li>
                    <strong className="block text-white text-2xl mb-1">Cost/Lock-in</strong>
                    <span className="text-zinc-400 text-lg">Safer to stay in Google ecosystem. Hard for teams invested elsewhere.</span>
                </li>
            </ul>
        </div>
    );
}

export default function AntigravitySlide() {
    return (
        <div className="w-full h-full relative bg-[#050505] overflow-hidden">
            {/* 3D Moving Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                    <color attach="background" args={['#050505']} />
                    <fog attach="fog" args={['#050505', 4, 15]} />

                    <ambientLight intensity={0.3} />
                    <pointLight position={[5, 5, 5]} intensity={0.5} color="#10b981" />
                    <LivingSwarm />

                    <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                    <EffectComposer>
                        <Bloom luminanceThreshold={0.8} mipmapBlur intensity={2} radius={0.8} />
                        <Noise opacity={0.04} />
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
                        <h2 className="text-6xl font-bold bg-gradient-to-b from-emerald-300 to-emerald-600 bg-clip-text text-transparent mb-2 tracking-tighter">Google Antigravity</h2>
                        <h3 className="text-2xl text-emerald-200/50 uppercase tracking-widest font-light">The Digital Employee</h3>
                    </div>

                    <p className="text-emerald-100/60 italic text-xl text-center max-w-md font-light">
                        "I am the Architect. I define the What, you handle the How."
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
