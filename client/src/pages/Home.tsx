/**
 * Home Page — CP-GPE Net
 * Single-page scroll layout. Fresh Forest theme — light, clean, nature-inspired.
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import NetworkSection from "@/components/NetworkSection";
import ResearchSection from "@/components/ResearchSection";
import DataSection from "@/components/DataSection";
import NewsSection from "@/components/NewsSection";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-50 text-forest-900">
      <Navbar />
      <main>
        <HeroSection />
        <div className="section-divider" />
        <AboutSection />
        <div className="section-divider" />
        <NetworkSection />
        <div className="section-divider" />
        <ResearchSection />
        <div className="section-divider" />
        <DataSection />
        <div className="section-divider" />
        <NewsSection />
        <div className="section-divider" />
        <JoinSection />
      </main>
      <Footer />
    </div>
  );
}
