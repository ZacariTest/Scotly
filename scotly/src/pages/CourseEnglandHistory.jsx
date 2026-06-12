import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseIntro from "../features/courses/components/CourseIntro";
import { introHistoryEngland } from "../features/courses/data/england/intro-data";

export default function CourseEnglandHistory() {
  return (
    <>
      <Navbar />
      <CourseIntro course={introHistoryEngland} />
      <Footer />
    </>
  );
}
