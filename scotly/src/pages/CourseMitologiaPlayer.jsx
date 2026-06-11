import CoursePlayer from "../features/courses/components/CoursePlayer";
import { course } from "../features/courses/data/scotland/mitologia";

export default function CourseMitologiaPlayer() {
  return <CoursePlayer course={course} />;
}
