'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import VideoStage from './VideoStage';
import CenterLogo from './CenterLogo';

gsap.registerPlugin(ScrollTrigger);

export default function CircleRevealSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=200%',
                    pin: true,
                    scrub: true,
                }
            });

            // Circle expands from 0% to 100% radius (covering full screen)
            // Using logic to expanding to 150% to ensure corners covered
            tl.fromTo(maskRef.current,
                { clipPath: 'circle(0% at 50% 50%)' },
                { clipPath: 'circle(150% at 50% 50%)', duration: 1, ease: 'none' }
            );

            // Delay for logo
            tl.to({}, { duration: 0.1 });

            // Logo reveal
            tl.fromTo(logoRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.2, ease: 'power3.out' }
            );

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden">
            <div ref={maskRef} className="absolute inset-0 w-full h-full z-10">
                {/* Placeholder video source */}
                <VideoStage src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" />
            </div>
            <CenterLogo ref={logoRef} />
        </section>
    );
}
