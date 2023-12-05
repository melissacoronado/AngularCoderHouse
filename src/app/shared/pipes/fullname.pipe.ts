import { Pipe, PipeTransform } from '@angular/core';
import { IStudent } from 'src/app/dashboard/pages/students/models/students';
import { IUser } from 'src/app/dashboard/pages/users/models/user';

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(value: IStudent | IUser, ...args: unknown[]): unknown {
    const nombreApellido = `${value.nombre} ${value.apellido}`;
    return nombreApellido;
  }

}
