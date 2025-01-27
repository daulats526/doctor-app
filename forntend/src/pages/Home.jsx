import React from 'react'
import Hearder from '../component/Hearder'
import SpecialityMenu from '../component/SpecialityMenu'
import Topdoctor from '../component/Topdoctor'
import Banner from '../component/Banner'

const Home = () => {
  return (
    <div>
      <Hearder/>
      <SpecialityMenu/>
      <Topdoctor/>
      <Banner/>
    </div>
  )
}

export default Home
