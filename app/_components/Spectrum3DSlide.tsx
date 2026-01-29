'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    CameraControls,
    Text,
    Float,
    Icosahedron,
    Box,
    Cone,
    MeshTransmissionMaterial,
    Sparkles,
    Stars,
    Environment,
    Grid
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { useDeck } from './Deck';

// --- Visual Components ---

function Timeline() {
    return (
        <group position={[0, -2, 0]}>
            {/* Glowing Core */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.02, 0.02, 50, 32]} />
                <meshBasicMaterial color="#00ff88" toneMapped={false} />
            </mesh>
            {/* Outer Halo */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.1, 0.1, 50, 32]} />
                <meshBasicMaterial color="#00ff88" transparent opacity={0.1} />
            </mesh>
        </group>
    );
}

function LeftNode({ active }: { active: boolean }) {
    const mesh = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (mesh.current) {
            // Pulse the scale slightly
            const t = state.clock.getElapsedTime();
            const scale = 1 + Math.sin(t * 2) * 0.02;
            mesh.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group position={[-6, 0, 0]}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Box ref={mesh} args={[1.5, 1.5, 1.5]}>
                    {/* "Holographic Blueprint" - Wireframe with emission */}
                    <meshStandardMaterial
                        color={active ? "#38bdf8" : "#0e7490"}
                        emissive={active ? "#38bdf8" : "#000000"}
                        emissiveIntensity={active ? 2 : 0}
                        wireframe
                        transparent
                        opacity={0.8}
                    />
                </Box>
                {/* Inner solid ghost for depth */}
                <Box args={[1.4, 1.4, 1.4]}>
                    <meshBasicMaterial color="#38bdf8" transparent opacity={0.05} />
                </Box>
            </Float>
            <Text position={[0, -2.5, 0]} fontSize={0.5} anchorX="center" anchorY="middle">
                Cursor
                <meshBasicMaterial color={active ? "#38bdf8" : "#94a3b8"} />
            </Text>
        </group>
    );
}

function CenterNode({ active }: { active: boolean }) {
    const mesh = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y += 0.005;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
                <Cone ref={mesh} args={[1.2, 2.5, 4]} rotation={[0, Math.PI / 4, 0]}>
                    {/* Dark Obsidian Glass */}
                    <MeshTransmissionMaterial
                        backside={false}
                        samples={16}
                        resolution={1024}
                        transmission={1}
                        roughness={0.1}
                        thickness={2.0} // Thick glass
                        ior={1.5}
                        chromaticAberration={0.06}
                        anisotropy={0.1}
                        distortion={0.5} // Distorts background
                        distortionScale={0.3}
                        temporalDistortion={0.5}
                        color={active ? "#fbbf24" : "#1e1b4b"} // Amber when active, dark blue/black when inactive
                        attenuationColor="#000000"
                        attenuationDistance={0.5}
                    />
                </Cone>
            </Float>
            <Text position={[0, -2.5, 0]} fontSize={0.5} anchorX="center" anchorY="middle">
                Claude
                <meshBasicMaterial color={active ? "#fbbf24" : "#94a3b8"} />
            </Text>
        </group>
    );
}

function RightNode({ active }: { active: boolean }) {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <group position={[6, 0, 0]}>
            <group ref={group}>
                {/* Living Core */}
                <Icosahedron args={[0.8, 0]}>
                    <meshStandardMaterial
                        color={active ? "#4ade80" : "#14532d"}
                        emissive="#22c55e"
                        emissiveIntensity={active ? 3 : 0.5}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </Icosahedron>

                {/* Inner Glow */}
                <Icosahedron args={[1.0, 0]}>
                    <meshBasicMaterial color="#22c55e" transparent opacity={0.1} wireframe />
                </Icosahedron>

                {/* Swirling Particles */}
                <Sparkles
                    count={100}
                    scale={4}
                    size={2}
                    speed={0.4}
                    opacity={active ? 1 : 0.5}
                    color="#4ade80"
                />
            </group>

            <Text position={[0, -2.5, 0]} fontSize={0.5} anchorX="center" anchorY="middle">
                Antigravity
                <meshBasicMaterial color={active ? "#4ade80" : "#94a3b8"} />
            </Text>
        </group>
    );
}

function SceneInputHandler({ step }: { step: number }) {
    const controls = useRef<CameraControls>(null);

    useEffect(() => {
        if (!controls.current) return;

        const transition = true;

        switch (step) {
            case 0:
                controls.current.setLookAt(0, 1, 14, 0, 0, 0, transition);
                break;
            case 1:
                controls.current.setLookAt(-6, 0.5, 5, -6, 0, 0, transition);
                break;
            case 2:
                controls.current.setLookAt(0, 0.5, 6, 0, 0, 0, transition);
                break;
            case 3:
                controls.current.setLookAt(6, 0.5, 5, 6, 0, 0, transition);
                break;
            default:
                break;
        }
    }, [step]);

    return <CameraControls ref={controls} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />;
}


// --- Main Slide Component ---

export default function Spectrum3DSlide() {
    const { setNavigationLocked, goToNext } = useDeck();
    const [step, setStep] = useState(0);

    useEffect(() => {
        setNavigationLocked(true);
        return () => setNavigationLocked(false);
    }, [setNavigationLocked]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();

                if (step < 3) {
                    setStep(s => s + 1);
                } else {
                    setNavigationLocked(false);
                    goToNext();
                }
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                e.stopPropagation();
                if (step > 0) {
                    setStep(s => s - 1);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [step, setNavigationLocked, goToNext]);


    return (
        <div className="w-full h-full relative bg-[#050505]">
            {/* 3D Scene */}
            <div className="absolute inset-0 z-0">
                <Canvas shadows camera={{ position: [0, 0, 14], fov: 45 }} gl={{ antialias: false }}> {/* Antialias off for postprocessing */}
                    <color attach="background" args={['#050505']} />

                    {/* Environment */}
                    <fog attach="fog" args={['#050505', 10, 40]} />
                    <ambientLight intensity={0.2} />
                    <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} castShadow />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <Grid
                        renderOrder={-1}
                        position={[0, -2.5, 0]}
                        infiniteGrid
                        cellSize={1}
                        sectionSize={5}
                        fadeDistance={30}
                        sectionColor="#202020"
                        cellColor="#101010"
                    />
                    {/* Reflections for Glass */}
                    <Environment preset="city" />

                    {/* Objects */}
                    <Timeline />
                    <LeftNode active={step === 1} />
                    <CenterNode active={step === 2} />
                    <RightNode active={step === 3} />

                    <SceneInputHandler step={step} />

                    {/* Post Processing */}
                    <EffectComposer>
                        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
                        <Noise opacity={0.05} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                </Canvas>
            </div>

            {/* Text Overlays - Frosted Glass */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-end pb-24">
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-center"
                        >
                            <h2 className="text-7xl font-bold bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent mb-4 tracking-tighter drop-shadow-lg">
                                The Spectrum of Agency
                            </h2>
                            <p className="text-2xl text-zinc-400 font-light tracking-wide uppercase">A journey from tools to teammates</p>
                        </motion.div>
                    )}

                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 max-w-2xl shadow-2xl"
                        >
                            <div className="flex items-center gap-4 mb-4" style={{ borderColor: '#38bdf8' }}>
                                <div className="w-3 h-12 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
                                <div>
                                    <h3 className="text-4xl font-bold text-white tracking-tight">Assisted Coding</h3>
                                    <p className="text-lg text-blue-400 font-mono">"You drive, AI navigates."</p>
                                </div>
                            </div>
                            <div className="text-zinc-300 text-lg leading-relaxed">
                                Cursor is a <strong className="text-white font-semibold">Bionic Suit</strong>. It makes you faster, but you must still understand exactly how to move.
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 max-w-2xl shadow-2xl"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-3 h-12 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                                <div>
                                    <h3 className="text-4xl font-bold text-white tracking-tight">Agentic Coding</h3>
                                    <p className="text-lg text-amber-400 font-mono">"Co-pilot."</p>
                                </div>
                            </div>
                            <div className="text-zinc-300 text-lg leading-relaxed">
                                Claude is a <strong className="text-white font-semibold">Remote Consultant</strong>. Smart reasoning, logical, but disconnected from your runtime.
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 max-w-2xl shadow-2xl"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-3 h-12 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                                <div>
                                    <h3 className="text-4xl font-bold text-white tracking-tight">Digital Employee</h3>
                                    <p className="text-lg text-green-400 font-mono">"You direct, AI drives."</p>
                                </div>
                            </div>
                            <div className="text-zinc-300 text-lg leading-relaxed">
                                Antigravity is a <strong className="text-white font-semibold">Living Entity</strong>. It has hands (tools), eyes (vision), and access to your infrastructure.
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
