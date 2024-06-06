import React from 'react'
import Heromain from './heromain/Heromain';
import NavigationBar from '@/mycomponenrs/navbar/NavigationBar';
import CopyRight from '@/mycomponenrs/copyright/CopyRight';
import HeroAfter from './heroafter/HeroAfter';
import Faq from './faq/Faq';
import ContactBottom from './contactbottom/ContactBottom';
const LandingPage = () => {
  return (
    <>
        <NavigationBar/>
        <Heromain/>
        <HeroAfter />
        <Faq />
        <ContactBottom />
        <CopyRight />
    </>
  )
}

export default LandingPage