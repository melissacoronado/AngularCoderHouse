import { Component } from '@angular/core';
import { IAlumno } from '../models/IAlumnos';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss']
})
export class PageWrapperComponent {
  alumnos: IAlumno[] = [
    {
      nombre: 'Lucy Salazar',
      edad: 30,
      comision: 47845,
      becaCoder: true,
      alumnoDesde: new Date(2021, 4, 14)
    },
    {
      nombre: 'Juan Gómez',
      edad: 42,
      comision: 47845,
      becaCoder: false,
      alumnoDesde: new Date(2022, 6, 22)
    },
    {
      nombre: 'Laura Fiorito',
      edad: 27,
      comision: 47900,
      becaCoder: true,
      alumnoDesde: new Date(2020, 8, 24)
    },
    {
      nombre: 'Maria Perez',
      edad: 30,
      comision: 47900,
      becaCoder: true,
      alumnoDesde: new Date(2023, 2, 2)
    },
  ];
}
