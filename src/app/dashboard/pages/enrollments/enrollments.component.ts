import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EnrollmentActions } from './store/enrollment.actions';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';
import { IEnrollments } from './models/IEnrollments';
import { Observable } from 'rxjs';
import { enrollmentsService } from './enrollments.service';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent {
  enrollment$: Observable<IEnrollments[]>;

  constructor(private store: Store, private matDialog: MatDialog, private enrollmentService: enrollmentsService) {
    this.store.dispatch(EnrollmentActions.loadEnrollments());    
    this.enrollment$ = this.enrollmentService.getEnrollments$();   
    
  }
  
  onAddEnrollment():void{
    this.matDialog.open(EnrollmentDialogComponent)
    .afterClosed()
    .subscribe({
      next: (result) => {
        if(result){
          this.enrollment$ = this.enrollmentService.addtEnrollments$({
            id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
            courseId: result.courseId,
            classId: result.classesId,
            studentId: result.studentId
          });
        }
      }
    })
  }
}
