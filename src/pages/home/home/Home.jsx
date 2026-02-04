import Banner from '../banner/Banner'
import LogoMarquee from '../clientLogoSlide/LogoMarquee'
import CustomerReview from '../customerReview/customerReview'
import Faq from '../FAQ/Faq'

import FeatureSection from '../FeatureSection/FeatureSection'
import HowItWork from '../howItWork/HowItWork'
import Merchant from '../merchant/Merchant'
import OurServices from '../services/OurServices'

export default function Home() {
  return (
    <div>
        <Banner></Banner>
        <HowItWork></HowItWork>
        <OurServices></OurServices>
        <LogoMarquee></LogoMarquee>
        <FeatureSection></FeatureSection>
        <Merchant></Merchant>
        <CustomerReview></CustomerReview>
        <Faq></Faq>
    </div>
  )
}
