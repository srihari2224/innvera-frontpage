import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import AboutNarrative from "@/components/sections/AboutNarrative";
import OrangeStatement from "@/components/sections/OrangeStatement";
import LiveLocations from "@/components/sections/LiveLocations";
import VideoShowcase from "@/components/sections/VideoShowcase";
import PodcastSection from "@/components/sections/PodcastSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutNarrative />
        <OrangeStatement />
        <LiveLocations />
        <VideoShowcase />
        <PodcastSection />
      </main>
      <Footer />
      <div className="noise-overlay" />
    </>
  );
}
