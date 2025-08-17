import React, { useState, useEffect } from 'react'
import Backgound from '../component/Backgound'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import Footer from '../component/Footer'

function Home() {
  let [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-x-hidden relative top-[70px]">
      <div className="w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] bg-gradient-to-l from-[#141414] to-[#0c2025]">
        <Backgound heroCount={heroCount} />
      </div>
      <Product />
      <OurPolicy />
      <Footer />
    </div>
  )
}

export default Home
