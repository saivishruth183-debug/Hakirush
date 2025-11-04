import { div } from 'framer-motion/client'
import React from 'react'

const sponser = [
    {id: 1, title: "Opportunities", des1: "Title Sponsor", des2: "Co-Sponsor", des3: "Partner Sponsor", des4: "Stall Branding"},
    {id: 2, title: "Benefits", des1: "Visibility across events and social media", des2: "Access to 500+ professionals per event", des3: "Brand mentions in videos and highlight reels"}
]

const Sponsorship = () => {
  return (
    <div className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_#ff000010,_transparent_90%)] pointer-events-none"></div>
      <div className='text-center max-w-3xl mx-auto px-4'>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">Partner With <span className='text-red-600'>HAKIRUSH</span> — Where Brands, Sports & Corporates Meet</h1>
        <p className="py-5 text-base md:text-lg text-gray-600">Sponsors and partners gain 360° exposure through on-ground branding, digital presence, and event activations.</p>
      </div>
      <div className="px-15 grid md:grid-cols-2 gap-10">
        {sponser.map((item)=>
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-red-600 mb-5">{item.title}</h3>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                {item.des1 && <li>{item.des1}</li>}
                {item.des2 && <li>{item.des2}</li>}
                {item.des3 && <li>{item.des3}</li>}
                {item.des4 && <li>{item.des4}</li>}
                {item.des5 && <li>{item.des5}</li>}
              </ul>
        </div>
        )}
      </div>
      <div className='mt-20 text-center'>
        <a href="/contact" className='px-10 py-5 bg-red-600 rounded-xl text-white font-bold'>Enquire About Sponsorships</a>
      </div>
    </div>
  )
}

export default Sponsorship
