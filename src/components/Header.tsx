'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        if (!headerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.to(headerRef.current, {
                opacity: 1,
                y: 0,
                delay: 9,
                duration: 1,
                ease: 'power3.out',
                pointerEvents: 'auto',
                clearProps: 'transform',
            });
        });

        return () => ctx.revert();
    }, []);

    const NAV_CLASSES =
        "text-[11px] md:text-xs font-bold uppercase tracking-[0.15em] hover:text-white/80 transition-colors cursor-pointer invert mix-blend-multiply isolate hidden md:block";

    return (
        <header
            ref={headerRef}
            className="
        fixed top-0 left-0 w-full px-8 py-6
        flex justify-between items-center
        z-[9999] text-white
        opacity-0 -translate-y-5 pointer-events-none
      "
        >
            {/* Logo */}
            <div className="flex items-center invert mix-blend-multiply
">
                <img
                    src="/headerlogo.png"
                    alt="Ashwin Sheth Group"
                    className="h-10 md:h-12 w-auto object-contain"
                />
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-8 md:gap-12">
                <a href="#" className={NAV_CLASSES}>Residential</a>
                <a href="#" className={NAV_CLASSES}>Commercial</a>
                <a href="#" className={NAV_CLASSES}>Land</a>
                <a href="#" className={NAV_CLASSES}>The Orange Circle</a>

                {/* Hamburger */}
                <button className="flex items-center justify-center w-8 h-8 md:ml-4 group invert mix-blend-multiply
">
                    <div className="space-y-1.5">
                        <span className="block w-6 h-[1.5px] bg-white group-hover:w-4 transition-all duration-300 ml-auto"></span>
                        <span className="block w-6 h-[1.5px] bg-white"></span>
                        <span className="block w-6 h-[1.5px] bg-white group-hover:w-4 transition-all duration-300 ml-auto"></span>
                    </div>
                </button>
            </nav>
        </header>
    );
}
