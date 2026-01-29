'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Box } from '@react-three/drei';
import * as THREE from 'three';
import SceneWrapper from './SceneWrapper';

function FloatingCubes() {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <group ref={group}>
            {Array.from({ length: 20 }).map((_, i) => (
                <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2}>
                    <Box position={[
                        (Math.random() - 0.5) * 15,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10
                    ]} args={[0.5, 0.5, 0.5]}>
                        <meshStandardMaterial color={i % 2 === 0 ? "#60a5fa" : "#a855f7"} />
                    </Box>
                </Float>
            ))}
        </group>
    );
}

export default function IntroViz() {
    return (
        <SceneWrapper>
            <FloatingCubes />
        </SceneWrapper>
    );
}
