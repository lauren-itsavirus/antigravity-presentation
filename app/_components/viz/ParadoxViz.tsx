'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import * as THREE from 'three';
import SceneWrapper from './SceneWrapper';

function InfiniteLoop() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.02;
        }
    });

    return (
        <group>
            <Torus ref={meshRef} args={[3, 0.5, 16, 100]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#ef4444" wireframe />
            </Torus>
        </group>
    );
}

export default function ParadoxViz() {
    return (
        <SceneWrapper>
            <InfiniteLoop />
        </SceneWrapper>
    );
}
