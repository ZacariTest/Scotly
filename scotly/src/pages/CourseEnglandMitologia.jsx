import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseIntro from "../features/courses/components/CourseIntro";
import { introMitologiaEngland } from "../features/courses/data/england/intro-data";

export default function CourseEnglandMitologia() {
  return (
    <>
      <Navbar />
      <CourseIntro course={introMitologiaEngland} />
      <Footer />
    </>
  );
}
