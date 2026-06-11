import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseIntro from "../features/courses/components/CourseIntro";
import { introArte } from "../features/courses/data/scotland/intro-data";

export default function CourseArte() {
  return (
    <>
      <Navbar />
      <CourseIntro course={introArte} />
      <Footer />
    </>
  );
}
