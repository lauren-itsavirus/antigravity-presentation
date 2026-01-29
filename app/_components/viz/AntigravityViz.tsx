'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import SceneWrapper from './SceneWrapper';

function Network() {
    const count = 15;
    const connections = useMemo(() => {
        const points: [number, number, number][] = [];
        const lines: [number, number, number][] = [];

        for (let i = 0; i < count; i++) {
            points.push([
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 5
            ]);
        }

        // Connect some points
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                if (Math.random() > 0.7) {
                    lines.push(points[i]);
                    lines.push(points[j]);
                }
            }
        }
        return { points, lines };
    }, []);

    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group ref={group}>
            {connections.points.map((p, i) => (
                <Sphere key={i} position={new THREE.Vector3(...p)} args={[0.15, 16, 16]}>
                    <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={1} />
                </Sphere>
            ))}
            {/* Render lines segments is tricky with Line component for multiple segments disconnected. 
            We will just draw a few lines for simplicity or use specific looping.
        */}
            {/* Simplifying to a single connected chaotic line for effect */}
            <Line points={connections.points} color="#22c55e" opacity={0.3} transparent lineWidth={1} />
        </group>
    );
}

export default function AntigravityViz() {
    return (
        <SceneWrapper>
            <Network />
        </SceneWrapper>
    );
}
