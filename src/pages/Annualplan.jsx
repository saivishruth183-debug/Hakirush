import React from 'react'
import Marathon from '../assets/Run.jpeg'
import Football from '../assets/football.webp'
import Badminton from '../assets/badminton.jpg'
import Cricket from '../assets/cricket.webp'
import Table from '../assets/Tabletennis.avif'
import Yoga from '../assets/yoga.jpg'
import Volleyball from '../assets/Volleyball.jpg'
import Chess from '../assets/Chess.avif'
import Fitness from '../assets/bootcamp.jpg'
import Relay from '../assets/relayrun.jpg'
import Olympics from '../assets/Olympics.png'
import Finale from '../assets/trophy.jpeg'

const plans = [
  { month: "January", title: "Corporate Marathon", image: Marathon },
  { month: "February", title: "Football League", image: Football },
  { month: "March", title: "Badminton Doubles", image: Badminton },
  { month: "April", title: "Cricket 6s", image: Cricket },
  { month: "May", title: "Table Tennis Challenge", image: Table },
  { month: "June", title: "Yoga & Wellness Day", image: Yoga },
  { month: "July", title: "Volleyball / Throwball", image: Volleyball },
  { month: "August", title: "Mini Olympics", image: Olympics },
  { month: "September", title: "Indoor Games Challenge", image: Chess },
  { month: "October", title: "Fitness Bootcamp", image: Fitness },
  { month: "November", title: "Relay Run", image: Relay },
  { month: "December", title: "All-Star Grand Finale", image: Finale },
]

const details = [
  {
    id: 1,
    title: "Included in the Annual Package",
    des1: "Venue, sports kits & professional umpires",
    des2: "Drone videography & monthly highlight reels",
    des3: "Certificates, medals & recognition",
    des4: "Event coverage on HAKIRUSH social media",
    des5: "Leaderboard & engagement dashboard",
  },
  {
    id: 2,
    title: "Benefits",
    des1: "12 months of seamless employee engagement",
    des2: "Morale and fitness boost across teams",
    des3: "Stronger communication and team synergy",
    des4: "Zero headaches for HR — we manage everything",
    des5: "Brand exposure & positive workplace culture",
  },
]

const Annualplan = () => {
  return (
    <div className="py-24 bg-gray-50 relative">

      {/* Parallax celebration background */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed opacity-20"
        style={{ backgroundImage: "url('/yourCelebrationImage.jpg')" }} />

      <div className="absolute inset-0 bg-red-600/10 backdrop-blur-sm" />

      {/* Header */}
      <div className="text-center max-w-4xl mx-auto px-4 relative z-10">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Annual Package — <span className="text-red-600">12 Months. 12 Sports.</span> One Unstoppable Team.
        </h1>

        <p className="text-gray-600 text-lg mt-5">
          A year-long engagement program designed for organizations that believe in
          consistent team connection and active employee culture.
          Each month brings a new sport, a new challenge, and a stronger team.
        </p>
      </div>

      {/* Monthly Schedule */}
      <div className="px-10 sm:px-20 mt-16 relative z-10">
        <h2 className="text-2xl font-bold text-red-600 mb-8">Monthly Activity Calendar</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {plans.map((item, index) => (
            <div key={index} className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition hover:-translate-y-1">
              <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-bold text-gray-800">{item.month}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="px-10 sm:px-20 mt-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-10">
          {details.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{item.title}</h3>
              <ul className="space-y-2 text-gray-600 list-disc list-inside">
                {Object.values(item).slice(2).map((line, i) => <li key={i}>{line}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-16 relative z-10">
        <button className="px-8 py-3 text-white bg-red-600 hover:bg-red-700 transitions rounded-full text-lg font-semibold shadow-lg">
          Subscribe to Annual Package
        </button>
      </div>
    </div>
  )
}

export default Annualplan
