import { IClasses } from "../../classes/Models/classes";
import { ICourse } from "../../courses/models/courses";
import { IStudent } from "../../students/models/students";

export interface IEnrollments {
    id: number;
    studentId: number; 
    courseId: number;
    classId: number;
    class?: IClasses;
    student?: IStudent;
    course?: ICourse;
  }