import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseIntro from "../features/courses/components/CourseIntro";
import { introCocinaEngland } from "../features/courses/data/england/intro-data";

export default function CourseEnglandCocina() {
  return (
    <>
      <Navbar />
      <CourseIntro course={introCocinaEngland} />
      <Footer />
    </>
  );
}
