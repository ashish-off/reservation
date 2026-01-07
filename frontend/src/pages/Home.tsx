import HeroSection from '../components/HeroSection'
import AboutUs from '../components/AboutUs'
import Qualities from '../components/Qualities'
import PopularDishes from '../components/PopularDishes'
import Team from '@/components/Team'
import Footer from '@/components/Footer'
import ReservationDetails from '@/components/ReservationDetails'

const Home = () => {
  return (
    <>
    <HeroSection/>
    <AboutUs/>
    <Qualities/>
    <PopularDishes/>
    <Team />
    <ReservationDetails/>
    <Footer/>
    </>
  )
}

export default Home