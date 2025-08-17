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
      <div className="w-[110vw] lg:h-[50vh] md:h-[50vh] sm:h-[30vh] bg-gradient-to-l from-[burlwood] to-[burlywood]">
        <Backgound heroCount={heroCount} />
      </div>
      <Product />
      <OurPolicy />
      <Footer />
    </div>
  )
}

export default Home
