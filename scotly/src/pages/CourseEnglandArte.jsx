import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseIntro from "../features/courses/components/CourseIntro";
import { introArteEngland } from "../features/courses/data/england/intro-data";

export default function CourseEnglandArte() {
  return (
    <>
      <Navbar />
      <CourseIntro course={introArteEngland} />
      <Footer />
    </>
  );
}
