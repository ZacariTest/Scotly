import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Presentation from "../components/Presentation";
import CoursesSection from "../components/CoursesSection";
import FinalMessage from "../components/FinalMessage";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import RegionsSection from "../components/RegionsSection";

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="region-accent-bar">
        <div className="region-accent-bar__sc" />
        <div className="region-accent-bar__en" />
        <div className="region-accent-bar__wa" />
        <div className="region-accent-bar__ir" />
      </div>

      <main className="w-full">
        <Hero />
        <RegionsSection />
        <Presentation />
        <CoursesSection />
        <FinalMessage onAuth={() => setAuthOpen(true)} />
        <Footer />
      </main>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}