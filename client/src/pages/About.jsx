
import React from 'react'
import { useAppContext } from '../context/AppContext'
import CountUp from "react-countup";

const About = () => {
    const {navigate} = useAppContext();
  return (
    <div className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[60vh] flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb')" }}
      >
        <div className="bg-black/50 absolute inset-0"></div>
        <div className="relative text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold">About Us</h1>
          <p className="mt-4 text-lg md:text-xl">
            Luxury stays. Unforgettable experiences.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80"
          className="rounded-2xl shadow-lg"
          alt="hotel"
        />

        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            We started with a simple mission — to provide guests with luxury,
            comfort, and unforgettable hospitality experiences. From boutique
            rooms to luxury suites, we ensure every stay feels special.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Our hotels are located in some of the most beautiful destinations
            around the world, offering world-class service and modern comfort.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">

          <div>
            <h3 className="text-3xl font-bold text-blue-600"><CountUp end={10} duration={2} separator="," suffix="+" /></h3>
            <p className="text-gray-600">Years Experience</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-blue-600"><CountUp end={50} duration={2} separator="," suffix="+" /></h3>
            <p className="text-gray-600">Hotels</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-blue-600"><CountUp end={100000} duration={2} separator="," suffix="+" /></h3>
            <p className="text-gray-600">Happy Guests</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-blue-600">24/7</h3>
            <p className="text-gray-600">Support</p>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Luxury Rooms</h3>
            <p className="text-gray-600">
              Spacious, modern, and fully equipped rooms designed for comfort.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Best Locations</h3>
            <p className="text-gray-600">
              Hotels located in prime destinations around the world.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">24/7 Service</h3>
            <p className="text-gray-600">
              Always available support to make your stay perfect.
            </p>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold">Ready to Experience Luxury?</h2>
        <p className="mt-2 text-white/80">
          Book your stay today and enjoy unforgettable comfort.
        </p>

        <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            onClick={()=>navigate('/rooms')}>
          Book Now
        </button>
      </section>

    </div>

  )
}

export default About
