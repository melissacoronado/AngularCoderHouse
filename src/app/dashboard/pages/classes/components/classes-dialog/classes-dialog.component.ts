import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { classesService } from '../../classes.service';
import { ICourse } from '../../../courses/models/courses';

@Component({
  selector: 'app-classes-dialog',
  templateUrl: './classes-dialog.component.html',
  styleUrls: ['./classes-dialog.component.scss']
})
export class ClassesDialogComponent {
  classesForm: FormGroup;

  daysOfWeek: FormGroup;

  //reemplazar por llamada al servicio de cursos
  cursosList: ICourse[] = [{id: 1, nombre: 'Angular', capacidad: 100, activo: false}, {id: 2, nombre: 'React', capacidad: 100, activo: false}];

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<ClassesDialogComponent>,
    private classService: classesService,

    // RECIBO LA DATA
    @Inject(MAT_DIALOG_DATA) public classId?: number
  )
  {
    this.classesForm = this.formBuilder.group(
      {
        diasClases: ['', Validators.required],
        fechaInicio: ['', Validators.required],
        fechaFin: ['', Validators.required],
        courseId: ['', Validators.required],        
      }
    );
    

    if (classId) {
      this.classService.getClassById$(classId).subscribe({
        next: (c) => {
          if (c) {
            //para cargar los datos en el dialog/modal
            this.classesForm.patchValue(c);
          }
        },
      });
    }


    this.daysOfWeek = this.formBuilder.group({
      lunes: [false],
      martes: [false],
      miercoles: [false],
      jueves: [false],
      viernes: [false],
      sabado: [false]
    });

    //this.daysOfWeek.setValidators(this.alMenosUnoSeleccionado);
    
  }

  alMenosUnoSeleccionado(form: FormGroup) {
    const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

    const alMenosUnoSeleccionado = diasSemana.some(dia => form.get(dia)?.value);

    return alMenosUnoSeleccionado ? null : { ningunDiaSeleccionado: true };
  }

  

  onSubmit(): void { 
    if (this.classesForm.invalid) {
      this.classesForm.markAllAsTouched();
    } else { 
      this.matDialogRef.close(this.classesForm.value);
    }
  }


}
