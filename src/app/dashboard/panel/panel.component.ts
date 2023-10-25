import { Component } from '@angular/core';
import { IStudent, PanelService } from '../panel.service';
import { Observable,  filter, map, of, take,} from 'rxjs';

interface Student {
  nombre: string;
  apellido: string;
  cursando: boolean;
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  studentsCursando$: Observable<IStudent[]>;
 
  //prueba: Observable<number>;
  counter = 0;

  constructor(private panelService: PanelService)
  {

    this.panelService.getCounter()
    .pipe(
      take(10),
      filter(n => n > 5)
    ).subscribe({
      next: (v) => {
        this.counter = v;
      },
    });

    this.studentsCursando$ = this.panelService.getStudents();

    //AQUI YO QUERIA FILTRAR DEL ARREGLO DE IStudent LOS QUE TIENEN cursando === true Y LUEGO EN EL
    //MAP SOLO MOSTRAR EL NOMBRE Y CORREO PERO ME DA ERRORES, NO ME RECONOCE EL TIPO DEL ARRAY
    //ESTAS SON MIS PRUEBAS
    
    /*
    this.studentsCursando$
    .pipe(   
      filter(arr => arr.cursando == true)),                      
      map(arr => 
      {  
        return [arr.nombre + '' + arr.apellido, arr.email]
      })
    );*/

    //tamb intente declarando el tipo del parametro en el map por ejemplo pero me muestra todas las propiedades
    this.studentsCursando$
    .pipe(      
      map((arr: IStudent[]) => { 
        return arr.map(student =>{ return [student.nombre + '' + student.apellido, student.email] })
      })
    );

  }
}