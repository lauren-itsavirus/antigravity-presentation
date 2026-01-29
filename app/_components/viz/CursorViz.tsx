'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';
import SceneWrapper from './SceneWrapper';

function CursorTrail() {
    const ref = useRef<THREE.Mesh>(null);

    useFrame(({ mouse, viewport }) => {
        if (ref.current) {
            // Move automatically in a figure 8 pattern if mouse is idle, or follow mouse?
            // Let's do automatic for presentation mode
            const t = Date.now() / 1000;
            const x = Math.cos(t) * 4;
            const y = Math.sin(t * 2) * 2;
            ref.current.position.set(x, y, 0);
        }
    });

    return (
        // @ts-ignore - Types for Trail might be tricky, suppressing to ensure build
        <Trail width={2} length={10} color={'#38bdf8'} attenuation={(t) => t * t}>
            <mesh ref={ref}>
                <sphereGeometry args={[0.2]} />
                <meshBasicMaterial color="#38bdf8" />
            </mesh>
        </Trail>
    );
}

export default function CursorViz() {
    return (
        <SceneWrapper>
            <CursorTrail />
        </SceneWrapper>
    );
}
