import Header from "@/components/Header"
import Hero from "@/components/Hero"
import OurStory from "@/components/OurStory"
import VideoBand from "@/components/VideoBand"
import PremiumPackages from "@/components/PremiumPackages"
import StoryDetail from "@/components/StoryDetail"
import RitualReviews from "@/components/RitualReviews"
import FAQ from "@/components/FAQ"
import Instagram from "@/components/Instagram"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <StoryDetail />
      <VideoBand />
      <PremiumPackages />
      <OurStory />
      <RitualReviews />
      <FAQ />
      {/* <Instagram /> */}
      <Footer />
    </>
  )
}
