import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Presentation from "../components/Presentation";
import CoursesSection from "../components/CoursesSection";
import FinalMessage from "../components/FinalMessage";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <Navbar />

      <main className="w-full">
        <Hero />
        <Presentation />
        <CoursesSection />
        <FinalMessage onAuth={() => setAuthOpen(true)} />
        <Footer />
      </main>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}