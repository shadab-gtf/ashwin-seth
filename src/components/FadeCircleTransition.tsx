'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import VideoStage from './VideoStage';

export default function FadeCircleTransition({ src, text }: { src: string, text: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=150%',
                    pin: true,
                    scrub: true,
                }
            });

            tl.fromTo(maskRef.current,
                { clipPath: 'circle(0% at 50% 110%)' }, // Starts hidden at bottom
                { clipPath: 'circle(150% at 50% 50%)', duration: 1, ease: 'none' }
            );

            tl.fromTo(contentRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                '>-0.3'
            );

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden">
            <div ref={maskRef} className="absolute inset-0 w-full h-full z-10 bg-black" style={{ willChange: 'clip-path' }}>
                <div className="absolute inset-0 w-full h-full">
                    <VideoStage src={src} />
                    <div className="absolute inset-0 bg-black/30" />
                </div>
            </div>

            <div ref={contentRef} className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <h2 className="text-4xl md:text-6xl text-white font-light tracking-widest uppercase text-center px-4">
                    {text}
                </h2>
            </div>
        </section>
    );
}
