import React from 'react'
import Hero from '../compound/Hero'
import Latestcollaction from '../compound/Latestcollaction'
import Bestprodects from '../compound/Bestprodects'
import OurPolices from '../compound/OurPolices'
import Newsletter from '../compound/Newsletter'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Latestcollaction/>
      <Bestprodects/>
      <OurPolices/>
      <Newsletter/>
    </div>
  )
}

export default Home
