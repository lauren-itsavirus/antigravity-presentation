'use client';

import React from 'react';
import { Text, Line, Sphere } from '@react-three/drei';
import SceneWrapper from './SceneWrapper';

function SpectrumLine() {
    return (
        <group position={[0, -2, 0]}>
            <Line
                points={[[-6, 0, 0], [6, 0, 0]]}
                color="white"
                lineWidth={2}
            />

            {/* Left Node */}
            <group position={[-6, 0, 0]}>
                <Sphere args={[0.2, 16, 16]}>
                    <meshStandardMaterial color="white" />
                </Sphere>
            </group>

            {/* Middle Node */}
            <group position={[0, 0, 0]}>
                <Sphere args={[0.2, 16, 16]}>
                    <meshStandardMaterial color="gray" />
                </Sphere>
            </group>

            {/* Right Node */}
            <group position={[6, 0, 0]}>
                <Sphere args={[0.2, 16, 16]}>
                    <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
                </Sphere>
            </group>
        </group>
    );
}

export default function SpectrumViz() {
    return (
        <SceneWrapper>
            <SpectrumLine />
        </SceneWrapper>
    );
}
