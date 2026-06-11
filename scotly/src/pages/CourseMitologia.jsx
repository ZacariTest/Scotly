import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseIntro from "../features/courses/components/CourseIntro";
import { introMitologia } from "../features/courses/data/scotland/intro-data";

export default function CourseMitologia() {
  return (
    <>
      <Navbar />
      <CourseIntro course={introMitologia} />
      <Footer />
    </>
  );
}
