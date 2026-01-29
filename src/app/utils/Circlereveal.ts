import gsap from 'gsap';

/**
 * Creates a reusable circle reveal transition
 * OPTIMIZED FOR SMOOTH SCROLL SCRUBBING
 * 
 * @param timeline - GSAP timeline to add the reveal to
 * @param element - DOM element to apply circle reveal on
 * @param color - Background color of the circle
 * @param position - Timeline position label (optional)
 * @param onMidpoint - Callback fired at reveal midpoint (for swapping content)
 * @param duration - Total duration of reveal (default: 1.5s)
 */
export function createCircleReveal(
    timeline: gsap.core.Timeline,
    element: HTMLElement,
    color: string,
    position?: string | number,
    onMidpoint?: () => void,
    duration: number = 1.5  // Optimal for smooth scrubbing
) {
    const midpoint = duration / 2;

    // Set background color
    gsap.set(element, { backgroundColor: color });

    // Expand circle from BOTTOM CENTER
    // Using 'none' easing for buttery smooth scrub behavior
    timeline.fromTo(
        element,
        { 
            clipPath: 'circle(0% at 50% 100%)',  // Start from bottom center
            opacity: 1 
        },
        { 
            clipPath: 'circle(150% at 50% 100%)',  // Expand from bottom center
            duration,
            ease: 'none',  // ⚡ LINEAR - Essential for smooth scroll-scrubbing
            onUpdate: function() {
                // Fire callback at midpoint (50% expansion)
                if (onMidpoint && this.progress() >= 0.5 && this.progress() <= 0.55) {
                    onMidpoint();
                }
            }
        },
        position
    );

    // Fade out circle - also linear for consistency
    timeline.to(
        element,
        { 
            opacity: 0, 
            duration: 0.8,  // Slightly longer for smooth fade
            ease: 'none'    // ⚡ LINEAR for smooth scrubbing
        },
        `${position ? position : ''}+=${duration}`
    );

    return timeline;
}

/**
 * Alternative circle reveal with explicit midpoint callback timing
 * More precise control for complex transitions
 * OPTIMIZED FOR SMOOTH SCROLL
 */
export function createPreciseCircleReveal(
    timeline: gsap.core.Timeline,
    element: HTMLElement,
    color: string,
    options: {
        position?: string | number;
        expandDuration?: number;
        fadeDuration?: number;
        onStart?: () => void;
        onMidpoint?: () => void;
        onComplete?: () => void;
    } = {}
) {
    const {
        position,
        expandDuration = 1.5,  // Smooth scrubbing duration
        fadeDuration = 0.8,    // Smooth fade duration
        onStart,
        onMidpoint,
        onComplete
    } = options;

    gsap.set(element, { backgroundColor: color });

    // Expand phase from BOTTOM CENTER
    timeline.fromTo(
        element,
        { clipPath: 'circle(0% at 50% 100%)', opacity: 1 },  // Bottom center origin
        { 
            clipPath: 'circle(150% at 50% 100%)',  // Expand from bottom center
            duration: expandDuration,
            ease: 'none',  // ⚡ LINEAR for smooth scrubbing
            onStart,
            onUpdate: function() {
                // Trigger at 50% progress
                if (onMidpoint && this.progress() >= 0.48 && this.progress() <= 0.52) {
                    onMidpoint();
                }
            }
        },
        position
    );

    // Fade phase
    timeline.to(
        element,
        { 
            opacity: 0, 
            duration: fadeDuration,
            ease: 'none',  // ⚡ LINEAR for smooth scrubbing
            onComplete
        },
        `${position ? position : ''}+=${expandDuration}`
    );

    return timeline;
}

/**
 * Batch create multiple circle reveals for future sections
 * Useful for adding 5+ more sections with consistent transitions
 */
export function createBatchCircleReveals(
    timeline: gsap.core.Timeline,
    reveals: Array<{
        element: HTMLElement;
        color: string;
        position?: string | number;
        onMidpoint?: () => void;
    }>
) {
    reveals.forEach(({ element, color, position, onMidpoint }) => {
        createCircleReveal(timeline, element, color, position, onMidpoint);
    });

    return timeline;
}