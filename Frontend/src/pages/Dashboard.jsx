import React from 'react'
import Navbar from '../Componet/Navbar'
import Herobg from '../assets/heroImg.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faShield, faRotate, faHeadset } from '@fortawesome/free-solid-svg-icons'

function Dashboard() {
  return (
    <div className="h-screen flex flex-col gap-5 px-6 py-6">

      <Navbar />

      <div className="flex flex-col-reverse md:flex-row lg:flex-row items-center justify-between w-full min-h-[80vh] lg:min-h-[65vh] md:min-h-[40vh] rounded-3xl bg-white overflow-hidden shadow-[0_1px_7px_rgba(15,23,42,0.40)]">

        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start px-6 py-10 lg:px-20">

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-gray-400">
              Elevate Your
            </span>

            <span className="block text-black">
              Everyday Style
            </span>
          </h1>

          <p className="mt-5 text-gray-500 text-base lg:text-lg max-w-xl">
            Discover the latest trends in fashion and accessories.
            Shop now to elevate your everyday style.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">

            <button className="bg-black text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all">
              Shop Now
            </button>

            <button className="border-2 border-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all">
              Explore
            </button>

          </div>

        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center">
          <img
            src={Herobg}
            alt="Fashion Hero"
            className="
      w-[110%]
      max-w-[820px]
      sm:max-w-[520px]
      md:max-w-[500px]
      lg:w-[110%]
      lg:max-w-none
      object-contain
    "
          />
        </div>

      </div>

      <div className="w-full rounded-3xl p-4 shadow-[0_1px_7px_rgba(15,23,42,0.40)] lg:p-8">

        <div className="grid grid-cols-4 gap-2 md:gap-4 lg:gap-6">

          {/* Free Shipping */}
          <div className="flex flex-col lg:flex-row items-center text-center lg:text-left gap-2 lg:gap-3">
            <div className=" rounded-full p-2 md:p-3 lg:p-4 shadow-[0_1px_7px_rgba(15,23,42,0.40)]">
              <FontAwesomeIcon
                icon={faTruck}
                className="text-lg  md:text-2xl lg:text-2xl"
              />
            </div>

            <div>
              <h2 className="text-[10px] md:text-sm lg:text-lg font-medium">
                Free Shipping
              </h2>

              <p className="text-[8px] md:text-xs lg:text-sm text-gray-600">
                On orders over 999
              </p>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="flex flex-col lg:flex-row items-center text-center lg:text-left gap-2 lg:gap-3">
            <div className="bg-white rounded-full p-2 md:p-3 lg:p-4 shadow-[0_1px_7px_rgba(15,23,42,0.40)]">
              <FontAwesomeIcon
                icon={faShield}
                className="text-lg md:text-2xl lg:text-2xl"
              />
            </div>

            <div>
              <h2 className="text-[10px] md:text-sm lg:text-lg font-medium">
                Secure Payment
              </h2>

              <p className="text-[8px] md:text-xs lg:text-sm text-gray-600">
                100% Secure
              </p>
            </div>
          </div>

          {/* Easy Returns */}
          <div className="flex flex-col lg:flex-row items-center text-center lg:text-left gap-2 lg:gap-3">
            <div className="bg-white rounded-full p-2 md:p-3 lg:p-4 shadow-[0_1px_7px_rgba(15,23,42,0.40)]">
              <FontAwesomeIcon
                icon={faRotate}
                className="text-lg md:text-2xl lg:text-2xl"
              />
            </div>

            <div>
              <h2 className="text-[10px] md:text-sm lg:text-lg font-medium">
                Easy Returns
              </h2>

              <p className="text-[8px] md:text-xs lg:text-sm text-gray-600">
                30 Days Return
              </p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="flex flex-col lg:flex-row items-center text-center lg:text-left gap-2 lg:gap-3">
            <div className="bg-white rounded-full p-2 md:p-3 lg:p-4 shadow-[0_1px_7px_rgba(15,23,42,0.40)]">
              <FontAwesomeIcon
                icon={faHeadset}
                className="text-lg md:text-2xl lg:text-2xl"
              />
            </div>

            <div>
              <h2 className="text-[10px] md:text-sm lg:text-lg font-medium">
                24/7 Support
              </h2>

              <p className="text-[8px] md:text-xs lg:text-sm text-gray-600">
                We're Here
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>

  )
}

export default Dashboard