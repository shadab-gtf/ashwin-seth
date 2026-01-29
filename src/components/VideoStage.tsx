'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoStage({ src, className }: { src: string, className?: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        ScrollTrigger.create({
            trigger: video,
            start: 'top bottom',
            end: 'bottom top',
            onEnter: () => void video.play(),
            onLeave: () => void video.pause(),
            onEnterBack: () => void video.play(),
            onLeaveBack: () => void video.pause(),
        });
    }, []);

    return (
        <video
            ref={videoRef}
            src={src}
            className={className}
            muted
            loop
            playsInline
            preload="auto"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            onError={(e) => console.error('Video Load Error', src, e)}
        />
    );
}
