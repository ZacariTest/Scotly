import CoursePlayer from "../features/courses/components/CoursePlayer";
import { course } from "../features/courses/data/scotland/history";

export default function CourseHistoryPlayer() {
  return <CoursePlayer course={course} />;
}
