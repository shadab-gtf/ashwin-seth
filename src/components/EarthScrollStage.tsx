'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import EarthScene from './EarthScene';
import type { Group } from 'three';

export default function EarthScrollStage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const earthGroupRef = useRef<Group>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const splitContentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=300%', // Long scroll duration
                    pin: true,
                    scrub: 1, // Smooth scrub
                    onLeaveBack: () => {
                        // If going back to video sections, FadeCircleTransition manages header state mostly.
                        // But if it was faded out there, it might stay out.
                        // But FadeCircleTransition has onLeaveBack: opacity 1.
                        // So if we scroll UP from Earth to Video 3, we enter Video 3 bottom?
                        // Video 3 is "Fade Circle -> Video 3".
                        // FadeCircleTransition manages its own header state.
                    }
                }
            });

            // Initial State handled by CSS/Layout: Earth at bottom.
            // But we can force it here.
            // 7) Scroll Down Text -> GLB Earth. 
            // The Container starts. Earth is visible at bottom.

            // Phase 1: Earth Zoom to Center
            // Matches requirement: "8) EARTH ZOOM -> CENTER"

            const earth = earthGroupRef.current;
            if (earth) {
                tl.fromTo(earth.position,
                    { y: -3, z: 0 },
                    { y: 0, z: 0, duration: 2, ease: 'power2.inOut' }
                );
                tl.fromTo(earth.scale,
                    { x: 0.5, y: 0.5, z: 0.5 },
                    { x: 1.2, y: 1.2, z: 1.2, duration: 2, ease: 'power2.inOut' },
                    '<'
                );

                // Phase 2: Shift Right, Content Slide In
                // Matches requirement: "9) EARTH SHIFTS RIGHT -> CONTENT LEFT"
                tl.to(earth.position, {
                    x: 2, // Shift right
                    duration: 2,
                    ease: 'power2.inOut'
                }, '+=0.5'); // Small pause
            }

            tl.to(splitContentRef.current, {
                opacity: 1,
                x: 0,
                duration: 2,
                ease: 'power2.out'
            }, '<+0.5');

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
            {/* 3D Scene Layer */}
            <EarthScene earthRef={earthGroupRef as any} />

            {/* Content Layer */}
            <div className="absolute inset-0 pointer-events-none z-10 flex">
                {/* Left Content (Initially hidden) */}
                <div
                    ref={splitContentRef}
                    className="w-1/2 h-full flex flex-col justify-center px-12"
                    style={{ opacity: 0, transform: 'translateX(-50px)' }}
                >
                    <h3 className="text-4xl font-bold text-white mb-6">Global Rach</h3>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                        Connecting points across the digital atmosphere. experience the seamlessly integrated future of web interaction.
                    </p>
                </div>
            </div>

            {/* Overlay for "Scroll Down" text replacement if needed, 
                 but requirement 7 says "Bottom area no longer shows Scroll Down text... Instead: 3D Earth". 
                 So simpler is just Earth.
             */}
        </section>
    );
}
