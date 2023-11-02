import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { classesService } from '../../classes.service';

@Component({
  selector: 'app-classes-dialog',
  templateUrl: './classes-dialog.component.html',
  styleUrls: ['./classes-dialog.component.scss']
})
export class ClassesDialogComponent {
  classesForm: FormGroup;

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
  }

  onSubmit(): void { 
    if (this.classesForm.invalid) {
      this.classesForm.markAllAsTouched();
    } else { 
      this.matDialogRef.close(this.classesForm.value);
    }
  }

}
