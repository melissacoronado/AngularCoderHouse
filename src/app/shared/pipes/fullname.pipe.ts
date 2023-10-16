import { Pipe, PipeTransform } from '@angular/core';
import { IStudent } from 'src/app/dashboard/pages/students/models/students';

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(value: IStudent, ...args: unknown[]): unknown {
    const nombreApellido = `${value.nombre} ${value.apellido}`;
    return nombreApellido;
  }

}
