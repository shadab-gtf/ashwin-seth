'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float } from '@react-three/drei';
import { forwardRef, Suspense, useRef } from 'react';
import type { Group } from 'three';

// Placeholder Earth component using a Sphere if GLB is missing logic, 
// but fulfilling "GLB (placeholder)" requirement by using a generic structure for now.
// In a real scenario, we'd load '/earth.glb'.
// For this demo, to ensure it runs without 404s, I'll use a procedural mesh 
// but structure it as if it were the model group.

const EarthModel = forwardRef<Group>((props, ref) => {
    // const { scene } = useGLTF('/model_placeholder.glb'); 
    // return <primitive object={scene} ref={ref} {...props} />

    return (
        <group ref={ref} {...props}>
            <mesh>
                <sphereGeometry args={[1.5, 64, 64]} />
                <meshStandardMaterial
                    color="#444444"
                    roughness={0.4}
                    metalness={0.6}
                    wireframe={false}
                />
            </mesh>
            <mesh scale={[1.01, 1.01, 1.01]}>
                <sphereGeometry args={[1.5, 64, 64]} />
                <meshStandardMaterial
                    color="#ffffff"
                    wireframe
                    transparent
                    opacity={0.1}
                />
            </mesh>
        </group>
    );
});
EarthModel.displayName = 'EarthModel';

export default function EarthScene({ earthRef }: { earthRef: React.RefObject<Group> }) {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <Suspense fallback={null}>
                    <Environment preset="city" />
                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        {/* @ts-ignore */}
                        <EarthModel ref={earthRef} />
                    </Float>
                </Suspense>
            </Canvas>
        </div>
    );
}
