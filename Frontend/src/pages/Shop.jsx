import React from 'react'
import Navbar from '../Componet/Navbar'
import Herobg from '../assets/heroImg.png'

function Shop() {
  return (
    <div className="min-h-screen px-6 py-6">
      <Navbar />

      <div className="relative overflow-hidden rounded-3xl mt-5 bg-white shadow-[0_1px_10px_rgba(0,0,0,0.08)]">

        <div className="flex items-center gap-5 justify-between min-h-[180px] md:min-h-[240px] lg:min-h-[280px] px-5 md:px-10 lg:px-14">

          {/* Content */}
          <div className="z-10 max-w-[55%] md:max-w-[40%]">
            <h1 className="text-3xl md:text-5xl font-bold text-black mb-3">
              Shop
            </h1>

            <p className="text-gray-500 text-sm md:text-base lg:text-lg leading-relaxed">
              Discover the latest trends in fashion and accessories.
            </p>
          </div>

          {/* Image */}
          <div className="absolute right-[0px] bottom-0 md:right-0 md:bottom-0 lg:right-0 lg:bottom-[-130px] h-full flex items-end">
            <img
              src={Herobg}
              alt="Fashion Hero"
              className="
          w-[250px]
          sm:w-[260px]
          md:w-[370px]
          lg:w-[600px]
          xl:w-[640px]
          object-contain
        "
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Shop