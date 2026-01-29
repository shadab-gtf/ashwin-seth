'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import VideoStage from './VideoStage';
import Image from 'next/image';
import { createCircleReveal } from '@/app/utils/Circlereveal';

gsap.registerPlugin(ScrollTrigger);

const VIDEOS = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
];

const TEXTS = [
    "Live surrounded by nature's beauty, where every space is infused with green serenity.",
    "A palette of warmth that welcomes you in, creating a space full of light and love.",
    "Serenity in every shade of blue, where water and design harmonize effortlessly."
];

export default function MasterSequence() {
    // State to track which video should be playing
    const [activeVideo, setActiveVideo] = useState<number>(0);

    // Container & Video Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const video1Ref = useRef<HTMLDivElement>(null);
    const video2Ref = useRef<HTMLDivElement>(null);
    const video3Ref = useRef<HTMLDivElement>(null);

    // UI Element Refs
    const logoRef = useRef<HTMLDivElement>(null);
    const earthRef = useRef<HTMLDivElement>(null);
    const gridContentRef = useRef<HTMLDivElement>(null);

    // Dynamic Content Refs
    const text1Ref = useRef<HTMLHeadingElement>(null);
    const text2Ref = useRef<HTMLHeadingElement>(null);
    const text3Ref = useRef<HTMLHeadingElement>(null);
    const scrollDownRef = useRef<HTMLDivElement>(null);
    const earthScrollDownRef = useRef<HTMLDivElement>(null);

    // Circle Reveal Refs
    const circleGreenRef = useRef<HTMLDivElement>(null);
    const circleOrangeRef = useRef<HTMLDivElement>(null);
    const circleWhite1Ref = useRef<HTMLDivElement>(null);
    const circleWhite2Ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // ==========================================
            // INITIAL STATES
            // ==========================================
            gsap.set('.header', { opacity: 0, pointerEvents: 'none' });
            gsap.set(logoRef.current, { opacity: 0 });
            gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], { opacity: 0 });
            gsap.set([scrollDownRef.current, earthScrollDownRef.current], { opacity: 0 });
            gsap.set(earthRef.current, { opacity: 0, y: '75vh', scale: 0.8 });
            gsap.set(gridContentRef.current, { x: '-50px', opacity: 0, pointerEvents: 'none' });

            // Video initial states
            gsap.set(video2Ref.current, { opacity: 0 });
            gsap.set(video3Ref.current, { opacity: 0 });

            // ==========================================
            // INTRO TIMELINE (TIME-BASED, NO SCROLL)
            // ==========================================
            const introTimeline = gsap.timeline({
                paused: true,
                onComplete: () => {
                    // Unlock scroll after intro completes
                    document.body.style.overflow = '';
                    // Initialize scroll timeline
                    initScrollTimeline();
                }
            });

            // 1. Circle Auto Reveal (500ms)
            introTimeline.to(video1Ref.current, {
                clipPath: 'circle(150% at 50% 50%)',
                duration: 3,
                ease: 'power2.inOut'
            }, 0);

            // 2. Logo Flash (delay 600ms, visible 600ms)
            introTimeline.to(logoRef.current, {
                opacity: 1,
                duration: 1
            }, 1.1);

            introTimeline.to({}, { duration: 1 }); // Hold logo

            introTimeline.to(logoRef.current, {
                opacity: 0,
                duration: 1
            }, 'logo_hide');

            // 3. Header + Content Reveal (RIGHT AFTER logo hides)
            introTimeline.to('.header', {
                opacity: 1,
                pointerEvents: 'all',
                duration: 1.3,
                ease: 'power2.out'
            }, 'logo_hide'); // Start at same time logo hides

            introTimeline.to([text1Ref.current, scrollDownRef.current], {
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: 'power2.out'
            }, 'logo_hide+=0.3'); // Slight delay after header starts

            // ==========================================
            // SCROLL TIMELINE (SCROLL-BASED)
            // ==========================================
            const initScrollTimeline = () => {
                const scrollTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: '+=800%',
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            const progress = self.progress;

                            // Determine active video based on scroll progress
                            if (progress < 0.25) {
                                setActiveVideo(0);
                            } else if (progress < 0.5) {
                                setActiveVideo(1);
                            } else if (progress < 0.75) {
                                setActiveVideo(2);
                            } else {
                                setActiveVideo(-1); // No video in final section
                            }
                        }
                    }
                });

                // ==========================================
                // SECTION 1 → 2: VIDEO 1 → VIDEO 2
                // ==========================================
                scrollTL.to({}, { duration: 2 }); // Reading time for text 1

                scrollTL.to(text1Ref.current, {
                    opacity: 0,
                    duration: 1
                }, 'v1_to_v2');

                scrollTL.to(scrollDownRef.current, {
                    opacity: 0,
                    duration: 1
                }, 'v1_to_v2');

                // Green circle reveal
                createCircleReveal(
                    scrollTL,
                    circleGreenRef.current!,
                    '#86efad56', // green-200
                    'v1_to_v2',
                    () => {
                        gsap.set(video2Ref.current, { opacity: 1 });
                        gsap.set(video1Ref.current, { opacity: 0 });
                    }
                );

                scrollTL.to(text2Ref.current, {
                    opacity: 1,
                    duration: 1
                });

                // ==========================================
                // SECTION 2 → 3: VIDEO 2 → VIDEO 3
                // ==========================================
                scrollTL.to({}, { duration: 2 }); // Reading time for text 2

                scrollTL.to(text2Ref.current, {
                    opacity: 0,
                    duration: 1
                }, 'v2_to_v3');

                // Orange circle reveal
                createCircleReveal(
                    scrollTL,
                    circleOrangeRef.current!,
                    '#fed7aa5a', // orange-200
                    'v2_to_v3',
                    () => {
                        gsap.set(video3Ref.current, { opacity: 1 });
                        gsap.set(video2Ref.current, { opacity: 0 });
                    }
                );

                scrollTL.to(text3Ref.current, {
                    opacity: 1,
                    duration: 1
                });

                // ==========================================
                // EARTH INTRO (BOTTOM CENTER)
                // ==========================================
                scrollTL.to({}, { duration: 1.5 });

                // EARTH APPEAR — FIXED
                scrollTL.fromTo(
                    earthRef.current,
                    {
                        opacity: 0

                    },
                    {
                        opacity: 1,
                        duration: 1,
                        ease: 'power2.out'
                    },
                    'earth_intro'
                );

                scrollTL.to(
                    text3Ref.current,
                    {
                        opacity: 0,
                        duration: 1
                    },
                    'earth_intro+=0.3'
                );

                // ==========================================
                // EARTH CENTER TRANSFORMATION
                // ==========================================
                scrollTL.to({}, { duration: 1 }); // Pause

                // White circle reveal 1
                createCircleReveal(
                    scrollTL,
                    circleWhite1Ref.current!,
                    '#90deef78',
                    'earth_center',
                    () => {
                        gsap.set(video3Ref.current, { opacity: 0 });
                    }
                );

                // Move Earth to center
                scrollTL.to(earthRef.current, {
                    y: '20vh',
                    scale: 1.1,
                    duration: 1.5,
                    ease: 'power2.inOut'
                }, 'earth_center+=0.8');

                // Show scroll down indicator
                scrollTL.to(earthScrollDownRef.current, {
                    opacity: 1,
                    duration: 0.5
                }, 'earth_center+=1.5');

                // ==========================================
                // EARTH + CONTENT SPLIT SECTION
                // ==========================================
                scrollTL.to({}, { duration: 1.5 }); // Hold

                scrollTL.to(earthScrollDownRef.current, {
                    opacity: 0,
                    duration: 0.3
                }, 'earth_split');

                // White circle reveal 2
                createCircleReveal(
                    scrollTL,
                    circleWhite2Ref.current!,
                    '#ffffff53',
                    'earth_split'
                );

                // Move Earth to right, scale up
                scrollTL.to(earthRef.current, {
                    x: '25vw',
                    scale: 1.5,
                    duration: 1.5,
                    ease: 'power2.inOut'
                }, 'earth_split+=0.8');

                // Reveal left content
                scrollTL.fromTo(gridContentRef.current,
                    { x: '-50px', opacity: 0 },
                    {
                        x: '0',
                        opacity: 1,
                        duration: 1.5,
                        ease: 'power2.out',
                        pointerEvents: 'all'
                    },
                    'earth_split+=0.8'
                );

                scrollTL.to({}, { duration: 2 }); // Final hold
            };

            // ==========================================
            // LISTEN FOR LOADER COMPLETE
            // ==========================================
            const handleLoaderComplete = () => {
                // Lock scroll during intro
                document.body.style.overflow = 'hidden';
                // Start video 1 playing
                setActiveVideo(0);
                introTimeline.play();
            };

            // Check if loader already completed
            if (document.body.getAttribute('data-loaded') === 'true') {
                handleLoaderComplete();
            } else {
                window.addEventListener('loader-complete', handleLoaderComplete);
            }

            return () => {
                window.removeEventListener('loader-complete', handleLoaderComplete);
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen bg-[#FFF8F0] overflow-hidden"
        >
            {/* ========================================== */}
            {/* BACKGROUND VIDEOS */}
            {/* ========================================== */}
            <div className="absolute inset-0 w-full h-full isolate">
                <div
                    ref={video1Ref}
                    className="absolute inset-0 z-10"
                    style={{ clipPath: 'circle(12% at 50% 50%)' }}
                >
                    <VideoStage src={VIDEOS[0]} isActive={activeVideo === 0} />
                </div>
                <div
                    ref={video2Ref}
                    className="absolute inset-0 z-20 opacity-0"
                >
                    <VideoStage src={VIDEOS[1]} isActive={activeVideo === 1} />
                </div>
                <div
                    ref={video3Ref}
                    className="absolute inset-0 z-30 opacity-0"
                >
                    <VideoStage src={VIDEOS[2]} isActive={activeVideo === 2} />
                </div>
            </div>

            {/* ========================================== */}
            {/* LOGO (FLASH) */}
            {/* ========================================== */}
            <div
                ref={logoRef}
                className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none"
            >
                <Image
                    src="/centerlogo.png"
                    alt="Ashwin Sheth Group Logo"
                    width={500}
                    height={200}
                    className="w-64 md:w-96 h-auto drop-shadow-2xl"
                    priority
                />
            </div>

            {/* ========================================== */}
            {/* CENTER TEXTS */}
            {/* ========================================== */}
            <div className="absolute inset-0 z-40 flex items-center justify-center p-8 pointer-events-none">
                <h2
                    ref={text1Ref}
                    className="text-white text-3xl font-medium uppercase tracking-[5px] text-center max-w-4xl leading-[1.2] opacity-0 drop-shadow-lg"
                >
                    {TEXTS[0]}
                </h2>
                <h2
                    ref={text2Ref}
                    className="absolute text-white text-3xl font-medium uppercase tracking-[5px] text-center max-w-4xl leading-[1.2] opacity-0 drop-shadow-lg"
                >
                    {TEXTS[1]}
                </h2>
                <h2
                    ref={text3Ref}
                    className="absolute text-white text-3xl font-medium uppercase tracking-[5px] text-center max-w-4xl leading-[1.2] opacity-0 drop-shadow-lg"
                >
                    {TEXTS[2]}
                </h2>
            </div>

            {/* ========================================== */}
            {/* SCROLL DOWN INDICATORS */}
            {/* ========================================== */}
            <div
                ref={scrollDownRef}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col-reverse items-center gap-3 opacity-0 pointer-events-none"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"></div>
                <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">
                    Scroll Down
                </span>
            </div>

            <div
                ref={earthScrollDownRef}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-60 flex flex-col-reverse items-center gap-3 opacity-0 pointer-events-none"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-[#F07D00] animate-bounce"></div>
                <span className="text-[#F07D00] text-[10px] font-bold tracking-[0.2em] uppercase">
                    Scroll Down
                </span>
            </div>

            {/* ========================================== */}
            {/* CIRCLE REVEAL OVERLAYS */}
            {/* ========================================== */}
            <div
                ref={circleGreenRef}
                className="absolute inset-0 z-50 pointer-events-none opacity-0"
                style={{ clipPath: 'circle(0% at 50% 50%)' }}
            />
            <div
                ref={circleOrangeRef}
                className="absolute inset-0 z-50 pointer-events-none opacity-0"
                style={{ clipPath: 'circle(0% at 50% 50%)' }}
            />
            <div
                ref={circleWhite1Ref}
                className="absolute inset-0 z-50 pointer-events-none opacity-0"
                style={{ clipPath: 'circle(0% at 50% 50%)' }}
            />
            <div
                ref={circleWhite2Ref}
                className="absolute inset-0 z-50 pointer-events-none opacity-0"
                style={{ clipPath: 'circle(0% at 50% 50%)' }}
            />

            {/* ========================================== */}
            {/* EARTH */}
            {/* ========================================== */}
            <div className="absolute inset-0 z-55 pointer-events-none">
                <div
                    ref={earthRef}
                    className="absolute left-1/2 w-[80vw] md:w-[60vh] aspect-square opacity-0"
                    style={{ transform: 'translateX(-50%)' }}
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/22/Earth_Western_Hemisphere_transparent_background.png"
                        alt="Earth"
                        className="w-full h-full object-contain drop-shadow-2xl"
                    />
                </div>
            </div>

            {/* ========================================== */}
            {/* LEFT CONTENT (EARTH SPLIT SECTION) */}
            {/* ========================================== */}
            <div
                ref={gridContentRef}
                className="absolute top-0 left-0 w-1/2 pl-16 max-w-[540px] h-full z-60 
                           flex flex-col justify-center items-start text-left
                           opacity-0 pointer-events-none"
            >
                <h2 className="text-[22px] leading-[1.4] font-light text-[#F07D00] mb-6">
                    Designing The Present With A Vision
                    <br />
                    Of Tomorrow.
                </h2>

                <p className="text-xl leading-[1.8] font-normal text-black mb-10">
                    Our impact is driven by our belief: Great designs solve real problems!
                    For nearly 4 decades, Ashwin Sheth has built a legacy with 80+
                    exceptional real estate projects in Mumbai and abroad.
                </p>

                <button
                    className="relative w-fit text-[13px] font-bold uppercase tracking-[0.2em] 
                               text-[#0E4194] pb-1 cursor-pointer hover:opacity-80 transition-opacity"
                >
                    Read More
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#0E4194]" />
                </button>
            </div>
        </section>
    );
}