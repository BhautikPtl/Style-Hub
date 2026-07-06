import React from 'react'
import Navbar from '../Componet/Navbar'
import Herobg from '../assets/heroImg.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faShield, faRotate, faHeadset } from '@fortawesome/free-solid-svg-icons'

function Dashboard() {
  return (
    <div className="h-screen flex flex-col gap-5 px-6 py-6">

      <Navbar />

      <div className="flex flex-col-reverse md:flex-row lg:flex-row items-center justify-between w-full min-h-[80vh] lg:min-h-[65vh] md:min-h-[60vh] rounded-3xl bg-white overflow-hidden shadow-[0_1px_7px_rgba(15,23,42,0.40)]">

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

      <div className="w-full h-[20vh] rounded-3xl p-6 shadow-[0_1px_7px_rgba(15,23,42,0.40)]">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

          {/* Free Shipping */}
          <div className="flex items-center justify-center gap-3 py-4 lg:border-r lg:border-black/20">
            <FontAwesomeIcon
              icon={faTruck}
              className="text-black text-3xl lg:text-4xl"
            />

            <div>
              <h2 className="text-black text-lg lg:text-xl font-medium">
                Free Shipping
              </h2>

              <p className="text-black/70 text-sm lg:text-base">
                On order over 1000
              </p>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="flex items-center justify-center gap-3 py-4 lg:border-r lg:border-black/20">
            <FontAwesomeIcon
              icon={faShield}
              className="text-black text-3xl lg:text-4xl"
            />

            <div>
              <h2 className="text-black text-lg lg:text-xl font-medium">
                Secure Payment
              </h2>

              <p className="text-black/70 text-sm lg:text-base">
                100% secure payments
              </p>
            </div>
          </div>

          {/* Easy Returns */}
          <div className="flex items-center justify-center gap-3 py-4 lg:border-r lg:border-black/20">
            <FontAwesomeIcon
              icon={faRotate}
              className="text-black text-3xl lg:text-4xl"
            />

            <div>
              <h2 className="text-black text-lg lg:text-xl font-medium">
                Easy Returns
              </h2>

              <p className="text-black/70 text-sm lg:text-base">
                30-day return policy
              </p>
            </div>
          </div>

          {/* Support */}
          <div className="flex items-center justify-center gap-3 py-4">
            <FontAwesomeIcon
              icon={faHeadset}
              className="text-black text-3xl lg:text-4xl"
            />

            <div>
              <h2 className="text-black text-lg lg:text-xl font-medium">
                24/7 Support
              </h2>

              <p className="text-black/70 text-sm lg:text-base">
                We're here to help
              </p>
            </div>
          </div>

        </div>

      </div>
      
    </div>

  )
}

export default Dashboard