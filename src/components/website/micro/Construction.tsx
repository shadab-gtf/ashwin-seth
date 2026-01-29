'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

const Construction = () => {
  const [open, setOpen] = useState(false)

  return (
    <section className="pb-[100px] bg-[#FEF7F0]">
      <h2 className="text-[38px] leading-[60px] tracking-[1px] md:text-4xl font-normal text-[#E37D24] mb-12 text-center">
        Construction Video
      </h2>

      {/* Thumbnail / Preview */}
      <div
        onClick={() => setOpen(true)}
        className="relative h-[400px] max-w-[700px] mx-auto cursor-pointer overflow-hidden rounded-lg shadow-xl group"
      >
        <video
          src="/videos/micro/construction.mp4"
          muted
          className="w-full h-full object-cover  transition-transform duration-700"
        />
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-red-500 transition"
          >
            <X size={40} />
          </button>

          <div className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden">
            <video
              src="/videos/micro/construction.mp4"
              autoPlay
              controls
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Construction
