'use client';

import { useRef, useEffect } from 'react';
import { staggerFadeUp } from '@/lib/animations';
import { Library, Waves, PartyPopper, Dumbbell, Flower2, Utensils, Music, Baby } from 'lucide-react';

const amenities = [
    {
        icon: <PartyPopper className="w-8 h-8" />,
        title: 'Multipurpose Hall',
    },
    {
        icon: <Library className="w-8 h-8" />,
        title: 'Library',
    },
    {
        icon: <Waves className="w-8 h-8" />,
        title: 'Swimming Pool',
    },
    {
        icon: <Flower2 className="w-8 h-8" />,
        title: 'Party Lawn',
    },
    {
        icon: <Dumbbell className="w-8 h-8" />,
        title: 'Walking Track',
    },
    {
        icon: <Baby className="w-8 h-8" />,
        title: 'Kids\' Play Area',
    },
    {
        icon: <Music className="w-8 h-8" />,
        title: 'Private Theatre',
    },
    {
        icon: <Utensils className="w-8 h-8" />,
        title: 'Yoga Zone',
    },
];

export default function Amenities() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const items = containerRef.current.querySelectorAll('.amenity-item');
            staggerFadeUp(Array.from(items), 0, 0.05);
        }
    }, []);

    return (
        <section id="amenities" className="pb-[100px] bg-[#FEF7F0] text-center">
            <div className="container mx-auto px-6">
                <div className="mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl leading-[60px] font-normal text-[#E37D24] mb-4">
                        Stunning Luxury Prime Residences, <br /> Designed For Life
                    </h2>
                </div>

                <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 max-w-5xl mx-auto">
                    {amenities.map((item, idx) => (
                        <div
                            key={idx}
                            className="amenity-item flex flex-col items-center gap-4 group cursor-default"
                        >
                            <div className="p-4 rounded-full  text-gray-700  transition-colors duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-sm md:text-base font-medium text-gray-800">{item.title}</h3>
                        </div>
                    ))}
                </div>

                <div className="mt-16">
                    <button className="text-[#1B4485] font-bold tracking-widest uppercase text-sm border-b pb-1 border-[#1B4485] hover:opacity-80 transition-opacity">
                        Explore More Amenities
                    </button>
                </div>
            </div>
        </section>
    );
}
