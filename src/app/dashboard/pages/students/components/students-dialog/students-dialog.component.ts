import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentsService } from '../../students.service';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
})
export class StudentsDialogComponent {
  studentsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<StudentsDialogComponent>,
    private studentService: StudentsService,

    // RECIBO LA DATA
    @Inject(MAT_DIALOG_DATA) public studentId?: number
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

    if (studentId) {
      this.studentService.getStudentById$(studentId).subscribe({
        next: (c) => {
          if (c) {
            //para cargar los datos en el dialog/modal
            this.studentsForm.patchValue(c);
          }
        },
      });
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
