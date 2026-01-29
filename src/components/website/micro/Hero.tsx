'use client';

// import { fadeUp } from '@/lib/animations';
// import { useEffect, useRef } from 'react';

const Hero = () => {
    //   const infoBarRef = useRef(null);

    // useEffect(() => {
    //     if (infoBarRef.current) fadeUp(infoBarRef.current, 0.5);
    // }, []);

  return (
    <section className='relative bg-white h-screen'>
          <div className="h-[80vh] w-full relative bg-black">
              <video
                  src="/videos/micro/hero.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover object-bottom"
              />
          </div>

            {/* Info Bar Overlay (Image 2 content) */}
            <div className=" bg-[#FEF7F0] relative z-20 w-full  dark:bg-zinc-950 border-b border-black dark:border-zinc-800">
                <div className="container mx-auto px-[50px] py-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">

                        {/* Left: Project Details */}
                      <div className="space-y-1 max-w-2xl">
                          <div className="flex items-center gap-4">
                              <h2 className="text-[40px] font-normal tracking-[1px] capitalize text-black font-montserrat">
                                  Ashwin Sheth
                              </h2>

                              <button className="px-3 py-1 bg-[#E37D24] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-orange-600 transition-colors">
                                  View RERA
                              </button>
                          </div>
                          <p className="font-montserrat text-[14px] font-normal tracking-[1px] uppercase text-black">
                              By Ashwin Sheth Group
                          </p>

                          <p className="font-montserrat text-[18px] font-normal tracking-[1px] capitalize text-black">
                              Edmont - Kandivali West Mumbai
                          </p>

                      </div>

                        {/* Right: Price & CTA */}
                        <div className="flex flex-col items-start lg:items-end gap-6 min-w-max text-black">
                            <div className="text-left lg:text-right">
                                <p className="text-2xl font-bold text-black">
                                    ₹ 1.61 Cr - 1.89 Cr <span className="font-light text-lg">| ₹ 1.99 Lacs/Sq.Yd</span>
                                </p>
                                <p className="text-xs text-black text-right">Onwards*</p>
                            </div>
                            <button className="px-8 py-2 bg-[#1B4485] tracking-[2px] text-white font-semibold rounded-md shadow-lg hover:bg-blue-800 transition-all w-full lg:w-auto">
                                Contact Developer
                            </button>
                        </div>

                    </div>
                </div>
                {/* Extended intro text from Image 3 could go here in a new section, keeping Hero clean */}
            </div>
      
    </section>
  )
}

export default Hero
