import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseIntro from "../features/courses/components/CourseIntro";
import { introCocina } from "../features/courses/data/scotland/intro-data";

export default function CourseCocina() {
  return (
    <>
      <Navbar />
      <CourseIntro course={introCocina} />
      <Footer />
    </>
  );
}
