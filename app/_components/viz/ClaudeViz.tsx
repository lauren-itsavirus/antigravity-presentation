'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Wireframe, Box } from '@react-three/drei';
import * as THREE from 'three';
import SceneWrapper from './SceneWrapper';

function ThinkingBox() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={[4, 0, 0]}>
            <boxGeometry args={[3, 3, 3]} />
            <meshStandardMaterial color="#d97706" transparent opacity={0.1} />
            <meshStandardMaterial color="#fbbf24" wireframe />
        </mesh>
    );
}

export default function ClaudeViz() {
    return (
        <SceneWrapper>
            <ThinkingBox />
        </SceneWrapper>
    );
}
