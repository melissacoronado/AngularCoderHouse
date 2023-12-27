import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { enrollmentsService } from '../../enrollments.service';
import { courseService } from '../../../courses/courses.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICourse } from '../../../courses/models/courses';
import { Observable, debounceTime, filter, map, mergeMap, of, startWith, switchMap, take } from 'rxjs';
import { IClasses } from '../../../classes/Models/classes';
import { classesService } from '../../../classes/classes.service';
import { MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { EnrollmentActions } from '../../store/enrollment.actions';
import { selectCourseOptions } from '../../store/enrollment.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { StudentsService } from '../../../students/students.service';
import { IStudent } from '../../../students/models/students';

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styleUrls: ['./enrollment-dialog.component.scss']
})
export class EnrollmentDialogComponent {

  enrollmentsForm: FormGroup;
  cursosList$: Observable<ICourse[]>;
  classesList$: Observable<IClasses[] | undefined>;
  isLoading$: Observable<boolean>;
  selectedValue: number = 0; // Inicializa con el valor que desees


  searchControl = new FormControl();
  items: any[] = [];
  filteredItems: any[] = [];
  
  

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<EnrollmentDialogComponent>,
    private enrollmentService: enrollmentsService,
    private classesService: classesService,
    private studentService: StudentsService,
    private store: Store,
    private action$: Actions,

    // RECIBO LA DATA
    @Inject(MAT_DIALOG_DATA) public enrollmentId?: number
  )
  {
    this.store.dispatch(EnrollmentActions.loadEnrollmentsDialogOptions());
    this.isLoading$ = this.store.select(selectIsLoadingDialogOptions);
    this.cursosList$ = this.store.select(selectCourseOptions);

    this.enrollmentsForm = this.formBuilder.group(
      {
        courseId: ['', Validators.required],
        classId: ['', Validators.required],
        studentId: ['', Validators.required],       
      }
    );
    
    this.action$
      .pipe(ofType(EnrollmentActions.loadEnrollmentsDialogOptions), take(1))
      .subscribe({
        next: () => this.matDialogRef.close(),
      });
    //this.cursosList$ = coursesService.getCourses$();
    //este deberia cargarse cuando seleccionen un curso
    this.classesList$ = classesService.getClassesByCursoId$(1)|| of('');

   
    
    

    if (enrollmentId) {
      this.enrollmentService.gettEnrollmentsById$(enrollmentId).subscribe({
        next: (c) => {
          if (c) {
            //para cargar los datos en el dialog/modal
            this.enrollmentsForm.patchValue(c);
          }
        },
      });
    }
    
    
  }

  ngOnInit() {

    this.studentService.getStudents$().subscribe((result: IStudent[]) => {
      this.items = result;
      this.filteredItems = result;
    });


    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
      )        
      .subscribe((term: string) => {
        this.filteredItems = this.filterItems(term);
      });

      
  }

  private filterItems(term: string): any[] {
    term = term.toLowerCase();
    return this.items.filter(item => item.nombre.toLowerCase().includes(term));
  }

  onSelectionChange(event: any) {
    this.selectedValue = event.value;
    this.classesList$ = this.classesService.getClassesByCursoId$(this.selectedValue)|| of('');
  }

 
  onSubmit(): void {
    if (this.enrollmentsForm.invalid) {
      this.enrollmentsForm.markAllAsTouched();
    }else{
      this.store.dispatch(
        EnrollmentActions.createEnrollment({
          payload: this.enrollmentsForm.getRawValue(),
        })
      );
      this.matDialogRef.close();
    }
  }


}


function selectIsLoadingDialogOptions(state: object): boolean {
  throw new Error('Function not implemented.');
}

