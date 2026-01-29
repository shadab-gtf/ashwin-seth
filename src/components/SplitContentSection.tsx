'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function SplitContentSection({ children }: { children?: React.ReactNode }) {
    // Placeholder for "Earth Shifts Right -> Content Left" logic
    // This will be used in the EarthScrollStage or composed.
    // For now, simple structure.
    return (
        <section className="relative h-screen w-full bg-black">
            {children}
        </section>
    )
}
