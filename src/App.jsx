import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import StarConcept from './components/StarConcept'
import EventIntro from './components/EventIntro'
import EventTicker from './components/EventTicker'
import StatsStrip from './components/StatsStrip'
import HcmExportHighlights from './components/HcmExportHighlights'
import CoreGoals from './components/CoreGoals'
import IndustryFocus from './components/IndustryFocus'
import StrategicHighlights from './components/StrategicHighlights'
import DealBellPassport from './components/DealBellPassport'
import Exhibitors from './components/Exhibitors'
import Schedule from './components/Schedule'
import MemberJourney from './components/MemberJourney'
import Packages from './components/Packages'
import FloorPlan from './components/FloorPlan'
import FinalCTA from './components/FinalCTA'
import RegisterForm from './components/RegisterForm'
import PressCoverage from './components/PressCoverage'
import Footer from './components/Footer'
import MobileStickyCTA from './components/MobileStickyCTA'
import FlashSalePopup from './components/FlashSalePopup'

export default function App() {
  return (
    <LanguageProvider>
      <FlashSalePopup />
      <Header />
      <main>
        <Hero />
        <StarConcept />
        <EventIntro />
        <EventTicker />
        <StatsStrip />
        <HcmExportHighlights />
        <CoreGoals />
        <IndustryFocus />
        <Schedule />
        <StrategicHighlights />
        <DealBellPassport />
        <Exhibitors />
        <MemberJourney />
        <Packages />
        <FloorPlan />
        <FinalCTA />
        <RegisterForm />
        <PressCoverage />
      </main>
      <Footer />
      <MobileStickyCTA />
    </LanguageProvider>
  )
}
