'use client';

import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

interface VideoStageProps {
    src: string;
    className?: string;
    isActive?: boolean;
}

const VideoStage = forwardRef<HTMLVideoElement, VideoStageProps>(
    ({ src, className, isActive = false }, ref) => {
        const videoRef = useRef<HTMLVideoElement>(null);

        useImperativeHandle(ref, () => videoRef.current!);

        useEffect(() => {
            const video = videoRef.current;
            if (!video) return;

            if (isActive) {
                video.play().catch(err => console.error('Video play error:', err));
            } else {
                video.pause();
            }
        }, [isActive]);

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
);

VideoStage.displayName = 'VideoStage';

export default VideoStage;