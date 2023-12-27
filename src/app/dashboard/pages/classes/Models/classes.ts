import { ICourse } from "../../courses/models/courses";

export interface IClasses {
    id: number;
    diasClases: string[]; 
    fechaInicio: string;   
    fechaFin: string;
    courseId: number;
    course?: ICourse;
  }