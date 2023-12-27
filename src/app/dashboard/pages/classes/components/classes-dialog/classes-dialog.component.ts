import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { classesService } from '../../classes.service';
import { ICourse } from '../../../courses/models/courses';
import { courseService } from '../../../courses/courses.service';
import { Observable } from 'rxjs';
import { ISemana } from '../../Models/ISemana';

@Component({
  selector: 'app-classes-dialog',
  templateUrl: './classes-dialog.component.html',
  styleUrls: ['./classes-dialog.component.scss']
})
export class ClassesDialogComponent {
  classesForm: FormGroup;
  cursosList$: Observable<ICourse[]>;
  formTouched = false;


  diasSemana = ['lunes','martes','miercoles', 'jueves', 'viernes'];
  
  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<ClassesDialogComponent>,
    private classService: classesService,
    private coursesService: courseService,

    // RECIBO LA DATA
    @Inject(MAT_DIALOG_DATA) public classId?: number
  )
  {
    this.classesForm = this.formBuilder.group(
      {
        //diasClases: [],
        lunes: [''],
        martes: [''],
        miercoles: [''],
        jueves: [''],
        viernes: [''],
        fechaInicio: ['', Validators.required],
        fechaFin: ['', Validators.required],
        courseId: ['', Validators.required],        
      }
    );
    
    this.cursosList$ = coursesService.getCourses$();


    if (classId) {
      this.classService.getClassById$(classId).subscribe({
        next: (c) => {
          if (c) {

            this.classesForm.setValue({
              lunes: c.diasClases.includes('lunes') ? true : false,
              martes: c.diasClases.includes('martes') ? true : false,
              miercoles: c.diasClases.includes('miercoles') ? true : false,
              jueves: c.diasClases.includes('jueves') ? true : false,
              viernes: c.diasClases.includes('viernes') ? true : false,
              fechaInicio: c.fechaInicio,
              fechaFin: c.fechaFin,
              courseId: c.courseId,
            });

            this.formTouched = false;

            //para cargar los datos en el dialog/modal
            this.classesForm.patchValue(c);
          }
        },
      });
    }
    
    
  }

  getSelectedDays(): string[] {
    let diasSelecc: string[] = [];

    for (const day in this.classesForm.controls) {
      if (this.classesForm.controls.hasOwnProperty(day) && this.classesForm.controls[day].value === true) {
        diasSelecc.push(day);
      }  
    }
    return diasSelecc;

    /*return Object.keys(this.classesForm.controls).filter(
      (control) =>{ //console.log(control); 
        console.log(this.classesForm.controls[control])
        this.diasSemana.includes(control) ? this.classesForm.controls[control] : ''
      }
    ); */
  }

  get noDaysSelected(): boolean {
    const selectedDays = this.getSelectedDays();
    return selectedDays.length == 0 ? true : false;
  }


 onSubmit(): void { 
  //console.log(this.getSelectedDays())
//console.log(this.getSelectedDays().length)
 /* const controlsWithErrors = Object.keys(this.classesForm.controls).filter(
    (control) => this.classesForm.controls[control].invalid );
  console.log('Controles con errores:', controlsWithErrors);*/

    if (this.classesForm.invalid || this.getSelectedDays().length == 0) {
      this.classesForm.markAllAsTouched();
    } else { 
      this.matDialogRef.close(this.classesForm.value);
    }
  }


}
