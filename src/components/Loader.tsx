'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }: { onComplete?: () => void }) {
    const loaderRef = useRef<HTMLDivElement>(null);
    // contentRef now wraps the Logo container for exit animation
    const contentRef = useRef<HTMLDivElement>(null);

    // Additional Refs for progress elements (to animate out)
    const progressContainerRef = useRef<HTMLDivElement>(null);
    const progressTextRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        // Lock scroll
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (loaderRef.current) {
                        loaderRef.current.style.display = 'none';
                    }
                    // Unlock scroll
                    document.body.style.overflow = '';
                    window.dispatchEvent(new Event('loader-complete'));
                    document.body.setAttribute('data-loaded', 'true');
                    if (onComplete) onComplete();
                }
            });

            // Timed to match the 2s progress animation in render
            tl.to({}, { duration: 2.2 }); // Wait for progress

            // Exit Animation
            // Animate Logo, Bar, and Text UP and OUT
            tl.to([contentRef.current, progressContainerRef.current, progressTextRef.current], {
                y: -50,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.in',
                stagger: 0.1
            })
                // Slide the whole loader screen up
                .to(loaderRef.current, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: 'expo.inOut'
                }, '-=0.2');

        }, loaderRef);

        return () => {
            ctx.revert();
            document.body.style.overflow = '';
        };
    }, [onComplete]);

    return (
        <div
            ref={loaderRef}
            className="fixed top-0 left-0 w-screen h-screen bg-[#FFF8F0] z-[99999] flex flex-col justify-center items-center overflow-hidden"
        >
            {/* Logo Container */}
            <div ref={contentRef} className="relative mb-8">
                <img
                    src="/loaderlogo.png"
                    alt="Logo"
                    className="w-32 h-auto relative z-10"
                />
            </div>

            {/* Progress Bar Container */}
            <div ref={progressContainerRef} className="w-48 h-0.5 bg-gray-200 relative overflow-hidden mb-4">
                <div
                    className="absolute top-0 left-0 h-full bg-[#FF6600]"
                    style={{ width: '0%' }}
                    ref={(el) => {
                        if (el) {
                            gsap.to(el, {
                                width: '100%',
                                duration: 2,
                                ease: 'power2.inOut'
                            });
                        }
                    }}
                />
            </div>

            {/* Percentage Text */}
            <div ref={progressTextRef} className="text-[#333] text-sm font-mono tracking-widest">
                <span ref={(el) => {
                    if (el) {
                        gsap.to(el, {
                            innerText: 100,
                            duration: 2,
                            snap: { innerText: 1 },
                            ease: 'linear',
                            onUpdate: function () {
                                el.innerText = Math.round(this.targets()[0].innerText) + '%';
                            }
                        });
                    }
                }}>0%</span>
            </div>
        </div>
    );
}
