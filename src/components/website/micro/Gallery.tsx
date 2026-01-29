"use client"
import React from 'react'
import CommonSlider from './CommonSlider'
import Image from 'next/image'

const data =[
    {image:"/images/micro/gallery/1.jpg",alt:"image 1"},
    {image:"/images/micro/gallery/2.jpg",alt:"image 1"},
    {image:"/images/micro/gallery/3.jpg",alt:"image 1"},
    {image:"/images/micro/gallery/1.jpg",alt:"image 1"},
    {image:"/images/micro/gallery/2.jpg",alt:"image 1"},
    {image:"/images/micro/gallery/3.jpg",alt:"image 1"},
]

const Gallery = () => {
  return (
    <section className='bg-[#FEF7F0] pb-[50px] md:pb-[100px]'>
          <h2 className="font-montserrat text-[32px] leading-[60px] font-normal tracking-[1px] capitalize text-[#F0801B] text-center">
photos gallery
</h2>
           <div className="mt-[50px]">
          <CommonSlider
            data={data}
            slidesPerView={2.5}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2.5 },
            }}
            spaceBetween={0}
            renderItem={(item, index) => (
              <div  className="relative cursor-pointer group h-[350px]">
                <Image src={item.image} alt={item.alt} fill className="object-cover" />
              </div>
            )}
          />
        </div>

      
    </section>
  )
}

export default Gallery
