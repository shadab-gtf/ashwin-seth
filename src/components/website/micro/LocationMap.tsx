'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Swiper as SwiperType } from 'swiper';
import { GoArrowLeft,GoArrowRight  } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";

const features = [
  { image: "/images/micro/location/restaurants.png", name: "Restaurants"},
  { image: "/images/micro/location/cafe.png", name: "Cafes & Bars", },
  { image: "/images/micro/location/stores.png", name: "Grocery Stores", },
  { image: "/images/micro/location/cafe.png", name: "Cafes & Bars", },
  { image: "/images/micro/location/stores.png", name: "Grocery Stores", },
];

const data = [
    {title:"Achija Veg Restaurant",distance:"1.5 km"},
    {title:"East Asia",distance:"1.8 km"},
    {title:"Mugshot Kitchen & Bar",distance:"2.5 km"}
]


const LocationMap = () => {
  const [activeTab, setActiveTab] = useState<'eat-drink' | 'transportation' | 'attractions'>('eat-drink');
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);
  return (
    <section className="py-[50px] md:py-[100px] bg-[#FEF7F0] border-t border-black">
        <div className=''>

               <h2 className="text-[38px] text-center leading-[60px] tracking-[1px] font-normal text-[#E37D24] mb-12">
          Step Into Your Exclusive Haven
        </h2>

         <div className="flex justify-center gap-6 mb-16">
          <button
            onClick={() => setActiveTab('eat-drink')}
            className={`px-8 py-3 rounded-md font-bold tracking-widest text-sm border
              ${activeTab === 'eat-drink'
                ? 'bg-[#1B4485] text-white'
                : 'text-[#1B4485] border-[#1B4485]'}`}
          >
           Eat and drink
          </button>

          <button
            onClick={() => setActiveTab('transportation')}
            className={`px-8 py-3 rounded-md font-bold tracking-widest text-sm border
              ${activeTab === 'transportation'
                ? 'bg-[#1B4485] text-white'
                : 'text-[#1B4485] border-[#1B4485]'}`}
          >
           Transportation
          </button>

          <button
            onClick={() => setActiveTab('attractions')}
            className={`px-8 py-3 rounded-md font-bold tracking-widest text-sm border
              ${activeTab === 'attractions'
                ? 'bg-[#1B4485] text-white'
                : 'text-[#1B4485] border-[#1B4485]'}`}
          >
           Attractions
          </button>
        </div>
         <div className="relative max-w-[800px] mx-auto mb-[50px]">

            {/* CENTER ARROWS (FIXED, NOT PER SLIDE) */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-[-10%] top-[45%] -translate-y-1/2 z-20 w-12 h-12 rounded-full text-[#0E4194] flex items-center justify-center"
            >
              <GoArrowLeft size={24} />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-[-10%] top-[45%] -translate-y-1/2 z-20 w-12 h-12 rounded-full text-[#0E4194] flex items-center justify-center"
            >
              <GoArrowRight  size={24} />
            </button>

            <Swiper
              modules={[Navigation]}
              loop
              centeredSlides
              spaceBetween={50}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 3 },
              }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {features.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex items-center justify-center gap-[10px] px-6">
                    <div className='image'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="mx-auto h-[30px] object-contain"
                    />
                    </div>
                    
                        <p className='text-[#0E4194]'>{item.name}</p>
                        <IoIosArrowDown className='text-[#0E4194]'/>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        <div className='w-full relative'>
            <div className='bg-white p-[20px] w-[300px] flex flex-col items-center gap-[20px] absolute top-0 left-[20%]'>
                {data.map((item,index) =>(
                    <div key={index} className='w-full flex justify-between items-center text-black'><span>{item.title}</span> <span>{item.distance}</span></div>
                ))}
            </div>
            <img src="/images/micro/location/map.png" alt="map"  className='h-[500px] w-full object-cover'/>
        </div>

        </div>
      
    </section>
  )
}

export default LocationMap
