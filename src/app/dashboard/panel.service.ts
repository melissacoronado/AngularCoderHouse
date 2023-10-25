import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';


export interface IStudent {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  cursando: boolean;
}

const StudentsData: IStudent[] = [
  {id: 1, nombre: 'Maria', apellido: 'Perez', email: 'correo@gmail.com', cursando: true,},  
  {id: 2, nombre: 'Luis', apellido: 'Gómez', email: 'correo1@gmail.com', cursando: true,},
  {id: 3, nombre: 'Laura', apellido: 'Pinho', email: 'correo2@gmail.com', cursando: false,},
  {id: 4, nombre: 'Ricardo', apellido: 'Valenzuela', email: 'correo3@gmail.com', cursando: false,},
];

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  constructor() { }

  getStudents(): Observable<IStudent[]>
  {
    return new Observable((suscriber) =>{
      suscriber.next(
        StudentsData
      );
      suscriber.complete();
    });
  }

  getCounter(): Observable<number> {
    return interval(1000);
  }

}
