import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IStudent } from '../../models/students';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
})
export class StudentsDialogComponent {
  studentsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<StudentsDialogComponent>,

    // RECIBO LA DATA
    @Inject(MAT_DIALOG_DATA) public student?: IStudent
  )
  {
    this.studentsForm = this.formBuilder.group(
      {
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        cursos: [''],
        cursando: [''],
      }
    );

    //para cargar los datos en el dialog/modal
    if (this.student) {
      this.studentsForm.patchValue(this.student);
    }

  }

  onSubmit(): void {
    if (this.studentsForm.invalid) {
      this.studentsForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.studentsForm.value);
    }
  }


}
