import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { courseService } from '../../courses.service';


@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss']
})
export class CoursesDialogComponent {
  coursesForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<CoursesDialogComponent>,
    private courseService: courseService,

    // RECIBO LA DATA
    @Inject(MAT_DIALOG_DATA) public courseId?: number
  )
  {
    this.coursesForm = this.formBuilder.group(
      {
        nombre: ['', Validators.required],
        capacidad: ['', Validators.required],
        activo: ['', ],
      }
    );

    if (courseId) {
      this.courseService.getCourseById$(courseId).subscribe({
        next: (c) => {
          if (c) {
            //para cargar los datos en el dialog/modal
            this.coursesForm.patchValue(c);
          }
        },
      });
    }
  }

  onSubmit(): void { 
    if (this.coursesForm.invalid) { 
      this.coursesForm.markAllAsTouched();
    } else { 
      this.matDialogRef.close(this.coursesForm.value);
    }
  }
}
