import React from 'react'
import Marathon from '../assets/Run.jpeg'
import Football from '../assets/football.webp'
import Badminton from '../assets/badminton.jpg'
import Cricket from '../assets/cricket.webp'
import Table from '../assets/Tabletennis.avif'
import Yoga from '../assets/yoga.jpg'
import Volleyball from '../assets/Volleyball.jpg'
import Olympic from '../assets/Olympics.png'
import Chess from '../assets/Chess.avif'
import Bootcamp from '../assets/bootcamp.jpg'
import Relay from '../assets/relayrun.jpg'
import Stars from '../assets/allstar.avif'

const plans = [
  { id: 1, month: "January", title: "5K Corporate Marathon", image: Marathon },
  { id: 2, month: "February", title: "Football League", image: Football },
  { id: 3, month: "March", title: "Badminton Doubles", image: Badminton },
  { id: 4, month: "April", title: "Cricket", image: Cricket },
  { id: 5, month: "May", title: "Table Tennis Tournament", image: Table },
  { id: 6, month: "June", title: "Yoga & Wellness Day", image: Yoga },
  { id: 7, month: "July", title: "Volleyball / Throwball", image: Volleyball },
  { id: 8, month: "August", title: "Mini Olympics", image: Olympic },
  { id: 9, month: "September", title: "Indoor Games (Chess, Carrom)", image: Chess },
  { id: 10, month: "October", title: "Fitness Bootcamp / Zumba", image: Bootcamp },
  { id: 11, month: "November", title: "Relay Run", image: Relay },
  { id: 12, month: "December", title: "All-Stars Finale", image: Stars },
]

const details = [
  {
    id: 1,
    title: "Benefits",
    des1: "Consistent engagement all year long",
    des2: "Team bonding through diverse activities",
    des3: "Professional event setup & photography",
    des4: "Company leaderboard & digital highlights",
    des5: "Stress-free HR coordination",
  },
  {
    id: 2,
    title: "Pricing",
    des1: "Silver: ₹3.5 lakh/year (up to 30 employees)",
    des2: "Gold: ₹5 lakh/year (up to 50 employees)",
    des3: "Platinum: ₹6.5–₹7 lakh/year (50+ employees + year-end finale)",
  },
]

const Annualplan = () => {
  return (
    <div className="py-24 bg-gray-50 relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ff000010,_transparent_90%)] pointer-events-none" />

      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto px-4 relative z-10">
        <h1 className="text-4xl font-extrabold leading-tight text-gray-800">
          Monthly Sports <span className="text-red-600">&</span> Fitness Engagements
        </h1>
        <h1 className="text-4xl font-extrabold text-gray-800">for Teams That Never Stop Growing</h1>
        <p className="text-gray-600 text-lg mt-5">
          Give your employees something new every month — from marathons and football to yoga and indoor tournaments.
        </p>
      </div>

      {/* Schedule Section */}
      <div className="px-10 sm:px-20 mt-16 relative z-10">
        <h2 className="text-2xl font-bold text-red-600 mb-8">Sample Monthly Schedule:</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {plans.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-center object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Text appears on hover */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-lg font-semibold">{item.month}</h3>
                <p className="text-sm mt-2">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits & Pricing Section */}
      <div className="px-10 sm:px-20 mt-20 relative z-10">
        <h2 className="text-2xl font-bold text-red-600 mb-8">Benefits & Pricing:</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {details.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">{item.title}</h3>
              <ul className="space-y-2 text-gray-600 list-disc list-inside">
                {item.des1 && <li>{item.des1}</li>}
                {item.des2 && <li>{item.des2}</li>}
                {item.des3 && <li>{item.des3}</li>}
                {item.des4 && <li>{item.des4}</li>}
                {item.des5 && <li>{item.des5}</li>}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Annualplan
