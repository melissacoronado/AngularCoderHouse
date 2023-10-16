import { ICourse } from "../../courses/models/courses";

export interface IStudent {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    cursando: boolean;
    cursos: ICourse[];
  }