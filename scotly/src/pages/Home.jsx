import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Presentation from "../components/Presentation";
import CoursesSection from "../components/CoursesSection";
import FinalMessage from "../components/FinalMessage";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="w-full">
        <Hero />
        <Presentation />
        <CoursesSection />
        <FinalMessage />
        <Footer />
      </main>
    </>
  );
}
