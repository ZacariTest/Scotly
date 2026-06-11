import CoursePlayer from "../features/courses/components/CoursePlayer";
import { course } from "../features/courses/data/scotland/history";

console.log("COURSE:", course);

export default function CourseHistory() {
  return <CoursePlayer course={course} />;
}