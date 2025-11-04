import React from 'react'
import Yoga from '../assets/yoga.jpg'

const league = [
  { id: 1, header: "Q1", title: "Cricket Tournament (Hakirush Cup)", image: Yoga },
  { id: 2, header: "Q2", title: "Badminton League (SmashFest)", image: Yoga },
  { id: 3, header: "Q3", title: "Football League (GoalRush)", image: Yoga },
  { id: 4, header: "Q4", title: "Corporate Sports Fest (Battle of Corporates)", image: Yoga },
]

const details = [
  {
    id: 1,
    title: "Revenue & Sponsorship Opportunities:",
    des1: "Entry Fee: ₹20,000–₹50,000 per company",
    des2: "Title Sponsors: ₹2–₹5 lakh",
    des3: "Co-Sponsors: ₹50,000–₹1 lakh",
    des4: "Stall Spaces: ₹10,000–₹25,000 per brand",
    des5: "Branded merchandise and co-branded jerseys",
  },
  {
    id: 2,
    title: "Benefits:",
    des1: "Build corporate brand visibility",
    des2: "Network with other companies",
    des3: "Employee morale & excitement",
    des4: "Professional sports execution",
    button: "Register Your Company"
  },
]

const Qleague = () => {
  return (
    <div className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_#ff000010,_transparent_90%)] pointer-events-none"></div>

      {/* Section Heading */}
      <div className="text-center max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
          Compete. Connect. Conquer — <span className="text-red-600">Every Quarter</span>
        </h1>
        <p className="py-5 text-base md:text-lg text-gray-600">
          The <span className="font-semibold">HAKIRUSH Q-League</span> brings companies together every 3 months for 
          high-intensity, inter-company tournaments across multiple sports.
        </p>
      </div>

      {/* League Grid */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8 md:px-20">
        {league.map((item) => (
          <div
            key={item.id}
            className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center text-white p-4">
              <h3 className="text-2xl font-bold">{item.header}</h3>
              <p className="text-sm mt-2">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Details Section */}
      <div className="px-8 md:px-20 mt-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-10">
          {details.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-red-600 mb-5">{item.title}</h3>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                {item.des1 && <li>{item.des1}</li>}
                {item.des2 && <li>{item.des2}</li>}
                {item.des3 && <li>{item.des3}</li>}
                {item.des4 && <li>{item.des4}</li>}
                {item.des5 && <li>{item.des5}</li>}
              </ul>

              {item.button && (
                <div className="mt-6">
                  <a
                    href="/contact"
                    className="inline-block bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300"
                  >
                    {item.button}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Qleague
