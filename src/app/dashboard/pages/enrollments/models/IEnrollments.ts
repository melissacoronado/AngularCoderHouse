import { ICourse } from "../../courses/models/courses";
import { IStudent } from "../../students/models/students";

export interface IEnrollments {
    id: number;
    studentId: number; 
    courseId: number;
    classId: number;
    student?: IStudent;
    course?: ICourse;
  }