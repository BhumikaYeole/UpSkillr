import { useParams } from "react-router-dom";
import Quiz from '../Components/Quiz';

export default function CourseAssessment() {
  const { courseId } = useParams();
  
  return <Quiz courseId={courseId} />;
}