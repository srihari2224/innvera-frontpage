import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import BlurSentence from "@/components/sections/BlurSentence";
import AboutNarrative from "@/components/sections/AboutNarrative";
import OrangeStatement from "@/components/sections/OrangeStatement";
import ImpactProjects from "@/components/sections/ImpactProjects";
import PodcastSection from "@/components/sections/PodcastSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BlurSentence />
        <AboutNarrative />
        <OrangeStatement />
        <ImpactProjects />
        <PodcastSection />
      </main>
      <Footer />
      <div className="noise-overlay" />
    </>
  );
}
