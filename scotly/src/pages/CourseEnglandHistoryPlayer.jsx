import CoursePlayer from "../features/courses/components/CoursePlayer";
import { course } from "../features/courses/data/england/history-england";

export default function CourseEnglandHistoryPlayer() {
  return <CoursePlayer course={course} />;
}
