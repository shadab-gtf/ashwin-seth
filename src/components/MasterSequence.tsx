'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import VideoStage from './VideoStage';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const VIDEOS = [
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
];

const TEXTS = [
    "Where nature's beauty enhances your luxury living experience.",
    "Feel the dynamic warmth of a home that inspires life and connection.",
    "A calm, serene haven, where every element exudes sophistication."
];

export default function MasterSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const video1Ref = useRef<HTMLDivElement>(null);
    const video2Ref = useRef<HTMLDivElement>(null);
    const video3Ref = useRef<HTMLDivElement>(null);

    const fadeCircleRef = useRef<HTMLDivElement>(null); // Fade Circle for Stage 2
    const logoRef = useRef<HTMLDivElement>(null); // Logo Stage 1
    const earthRef = useRef<HTMLDivElement>(null); // Earth Image Stage 3-6
    const gridContentRef = useRef<HTMLDivElement>(null); // Final Grid Content
    const startBtnRef = useRef<HTMLButtonElement>(null); // Interaction Stage 5

    // Dynamic Content Refs
    const text1Ref = useRef<HTMLHeadingElement>(null);
    const text2Ref = useRef<HTMLHeadingElement>(null);
    const text3Ref = useRef<HTMLHeadingElement>(null);
    const scrollDownRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let headerRevealed = false;
        const ctx = gsap.context(() => {
            gsap.set('.header', {
                opacity: 0,
                pointerEvents: 'none'
            });
            // Initial States
            // Header is handled separately to ensure it appears even without scrolling
            // gsap.set('.header', { opacity: 0, pointerEvents: 'none' });
            gsap.set(logoRef.current, { opacity: 0 });
            gsap.set([text1Ref.current, text2Ref.current, text3Ref.current, scrollDownRef.current], { opacity: 0 });

            // INDEPENDENT HEADER REVEAL (Not Scrubbed)
            // gsap.to('.header', {
            //     opacity: 1,
            //     pointerEvents: 'all',
            //     duration: 1,
            //     delay: 0.5, // Sync with Loader exit approx
            //     ease: 'power2.out'
            // });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=800%', // Increased for more reading time
                    pin: true,
                    scrub: 1,
                    // ✅ HEADER REVEAL — AFTER CIRCLE COMPLETES
                    onUpdate: (self) => {
                        const REVEAL_POINT = 0.18;
                        if (self.progress >= REVEAL_POINT) {
                            gsap.to('.header', {
                                opacity: 1,
                                pointerEvents: 'all',
                                duration: 0.6,
                                ease: 'power2.out'
                            });
                        } else {
                            gsap.to('.header', {
                                opacity: 0,
                                pointerEvents: 'none',
                                duration: 0.4,
                                ease: 'power2.in'
                            });
                        }
                    }

                }
            });

            // --- STAGE 1: EXPAND & FLASH LOGO ---
            // 1. Expand Circle
            tl.to(video1Ref.current, {
                clipPath: 'circle(150% at 50% 50%)',
                duration: 3,
                ease: 'power2.inOut'
            }, 0);


            // 2. Show Logo (Flash)
            tl.to(logoRef.current, { opacity: 1, duration: 0.2 }, "+=0.5");
            // Hold Logo briefly? "Show logo in just 200 ms". 
            // If scrub is on, "time" depends on scroll. 
            // User likely means "After reveal, show logo moment, then hide".
            // We'll add a small space for it.
            tl.to({}, { duration: 0.5 }); // Hold
            tl.to(logoRef.current, { opacity: 0, duration: 0.2 });

            // 3. Show Content 1 & Scroll Down (Header already shown)
            tl.to([text1Ref.current, scrollDownRef.current], {
                opacity: 1,
                pointerEvents: 'all',
                duration: 0.5,
                stagger: 0.1
            });

            // Reading time for Text 1
            tl.to({}, { duration: 2 });

            // --- STAGE 2: TRANSITION TO VIDEO 2 ---
            // Fade OUT Text 1
            tl.to(text1Ref.current, { opacity: 0, duration: 0.3 }, 'stage2_start');

            // Yellow Circle Expand
            tl.fromTo(fadeCircleRef.current,
                { clipPath: 'circle(0% at 50% 100%)', opacity: 1 },
                { clipPath: 'circle(150% at 50% 50%)', duration: 1.5, ease: 'none' },
                'stage2_start'
            );

            // Swap Video
            tl.to(video2Ref.current, { opacity: 1, duration: 0.01 });
            tl.to(video1Ref.current, { opacity: 0, duration: 0.01 });

            // Fade Circle Out
            tl.to(fadeCircleRef.current, { opacity: 0, duration: 0.5 });

            // Reveal Text 2
            tl.to(text2Ref.current, { opacity: 1, duration: 0.5 });

            // Reading time for Text 2
            tl.to({}, { duration: 2 });

            // --- STAGE 3: TRANSITION TO VIDEO 3 ---
            // Fade OUT Text 2 & Scroll Down
            tl.to([text2Ref.current, scrollDownRef.current], { opacity: 0, duration: 0.3 }, 'stage3_start');

            // Video Swap (Circle again)
            tl.fromTo(fadeCircleRef.current,
                { clipPath: 'circle(0% at 50% 100%)', opacity: 1 },
                { clipPath: 'circle(150% at 50% 50%)', duration: 1.5, ease: 'none' },
                'stage3_start'
            );

            tl.to(video3Ref.current, { opacity: 1, duration: 0.01 });
            tl.to(video2Ref.current, { opacity: 0, duration: 0.01 });

            tl.to(fadeCircleRef.current, { opacity: 0, duration: 0.5 });

            // Reveal Text 3
            tl.to(text3Ref.current, { opacity: 1, duration: 0.5 });

            // REVEAL EARTH (PEEKING BOTTOM)
            // Initial state of earth was y: 100 which is roughly bottom. 
            // Let's be precise. 50vh is center. 
            // y: '80vh' might be off screen. 
            // Let's set it to be partially visible at bottom center.
            // We need to ensure it's ON TOP of video? Yes, z-index is 50.

            tl.fromTo(earthRef.current,
                { opacity: 0, y: '80vh', scale: 0.8 }, // Start well below
                { opacity: 1, y: '38vh', scale: 1, duration: 1, ease: 'back.out(1.0)' } // Peek up. 38vh puts it near bottom.
            );

            // --- STAGE 4: EARTH ZOOM TO CENTER ---
            // Fade out Text 3
            tl.to(text3Ref.current, { opacity: 0, duration: 0.5 }, '+=1'); // Reading time

            // Zoom Earth to Center
            // Also maybe fade out Video 3 to Cream Background? 
            // Reference image 2 shows cream background.
            // We can use fadeCircleRef or just fade video3Ref opacity to 0 (revealing main bg which is cream).

            tl.to(earthRef.current, {
                y: '0vh', // Center
                scale: 2.5, // Big Zoom
                duration: 2.5,
                ease: 'power2.inOut'
            }, 'zoom_stage');

            tl.to(video3Ref.current, { opacity: 0, duration: 2 }, 'zoom_stage'); // Fade video to reveal Cream BG

            // --- STAGE 5: INTERACTION ---
            tl.fromTo(startBtnRef.current,
                { opacity: 0, y: 20, pointerEvents: 'none' },
                { opacity: 1, y: 0, pointerEvents: 'all', duration: 0.5 }
            );

            tl.to({}, { duration: 1 }); // Pause

            // --- STAGE 6: GRID ---
            tl.to(startBtnRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.3 });

            tl.to(earthRef.current, {
                x: '25vw',
                scale: 1.5,
                duration: 1.5,
                ease: 'power2.inOut'
            }, 'stage6');

            tl.fromTo(gridContentRef.current,
                { x: '-50px', opacity: 0 },
                { x: '0', opacity: 1, duration: 1.5, ease: 'power2.out', pointerEvents: 'all' },
                'stage6'
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-[#FFF8F0] overflow-hidden">

            {/* BACKGROUND VIDEOS */}
            <div className="absolute inset-0 w-full h-full isolate">
                <div ref={video1Ref} className="absolute inset-0 z-10" style={{ clipPath: 'circle(12% at 50% 50%)' }}><VideoStage src={VIDEOS[0]} /></div>
                <div ref={video2Ref} className="absolute inset-0 z-20 opacity-0"><VideoStage src={VIDEOS[1]} /></div>
                <div ref={video3Ref} className="absolute inset-0 z-30 opacity-0"><VideoStage src={VIDEOS[2]} /></div>
            </div>

            {/* GLOBAL LOGO (FLASH - Managed by Header now? No, Header has its own logo. 
          The Flash Logo was a separate overlay. 
          User said "make sure header should be exact like that".
          Header in user image IS visible.
          Wait, "after reveal look like this..." (Image 1). 
          MasterSequence managed the "Flash Logo". 
          If Header NOW has the logo, do we still need the "Center Flash Logo"?
          User said: "Implement Logo Flash (200ms) -> Hide -> Header/Content Reveal".
          So Flash Logo is distinct from Header Logo.
          I will keep Flash Logo.
      */}
            <div ref={logoRef} className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none">
                <Image
                    src="/centerlogo.png"
                    alt="Ashwin Sheth Group Logo"
                    width={500}
                    height={200}
                    className="w-64 md:w-96 h-auto drop-shadow-2xl"
                    priority
                />
            </div>

            {/* CENTER TEXTS */}
            <div className="absolute inset-0 z-40 flex items-center justify-center p-8 pointer-events-none">
                <h2 ref={text1Ref} className="text-white text-3xl md:text-5xl font-medium uppercase tracking-[0.15em] text-center max-w-5xl leading-relaxed opacity-0 drop-shadow-lg">
                    {TEXTS[0]}
                </h2>
                <h2 ref={text2Ref} className="absolute text-white text-3xl md:text-5xl font-medium uppercase tracking-[0.15em] text-center max-w-5xl leading-relaxed opacity-0 drop-shadow-lg">
                    {TEXTS[1]}
                </h2>
                <h2 ref={text3Ref} className="absolute text-white text-3xl md:text-5xl font-medium uppercase tracking-[0.15em] text-center max-w-5xl leading-relaxed opacity-0 drop-shadow-lg">
                    {TEXTS[2]}
                </h2>
            </div>

            {/* SCROLL DOWN INDICATOR */}
            <div ref={scrollDownRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col-reverse items-center gap-3 opacity-0 pointer-events-none">
                <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">Scroll Down</span>
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"></div>
            </div>

            {/* FADE CIRCLE */}
            <div ref={fadeCircleRef} className="absolute inset-0 z-50 bg-[#FFF8F0] pointer-events-none opacity-0"
                style={{ clipPath: 'circle(0% at 50% 100%)' }}>
            </div>

            {/* EARTH (Updated Props) */}
            <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
                <div ref={earthRef} className="relative w-[80vw] md:w-[60vh] aspect-square opacity-0 text-white">
                    {/* Using SVG globe if possible or placeholder. Image provided showed detailed Earth. */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Earth_Western_Hemisphere_transparent_background.png"
                        alt="Earth"
                        className="w-full h-full object-contain drop-shadow-2xl"
                    />
                </div>
            </div>

            {/* START BTN */}
            <div className="absolute inset-0 z-60 flex items-center justify-center pointer-events-none">
                <button ref={startBtnRef} className="mt-32 px-8 py-3 bg-[#FF6600] text-white font-bold uppercase tracking-widest hover:bg-[#CC5200] transition-colors pointer-events-auto opacity-0 shadow-lg">
                    Explore
                </button>
            </div>

            {/* GRID CONTENT (Updated colors for cream bg?) 
          If BG is cream, text should be dark.
          "Normal Scroll Content" was after.
          Grid enters on Cream BG? 
          "after scroll this glob show exact center... with zoomed effect".
          The grid layout usually follows. 
          Let's ensure Grid text handles cream bg contrast if needed.
          Wait, Stage 6 usually has content on left, earth on right.
          If BG is cream, text needs to be black.
      */}
            <div ref={gridContentRef} className="absolute top-0 left-0 w-1/2 h-full z-50 flex flex-col justify-center px-16 opacity-0 pointer-events-none">
                <h2 className="text-4xl text-black font-bold mb-4">Global Network</h2>
                <p className="text-gray-600">Connected across all horizons. Explore the future of seamless digital interaction.</p>
            </div>

        </section>
    );
}
