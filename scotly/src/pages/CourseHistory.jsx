import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseIntro from "../features/courses/components/CourseIntro";
import { introHistory } from "../features/courses/data/scotland/intro-data";

export default function CourseHistory() {
  return (
    <>
      <Navbar />
      <CourseIntro course={introHistory} />
      <Footer />
    </>
  );
}
