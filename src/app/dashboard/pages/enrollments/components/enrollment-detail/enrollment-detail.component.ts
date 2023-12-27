import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEnrollments } from '../../models/IEnrollments';
import { enrollmentsService } from '../../enrollments.service';


@Component({
  selector: 'app-enrollment-detail',
  templateUrl: './enrollment-detail.component.html',
  styleUrls: ['./enrollment-detail.component.scss']
})
export class EnrollemntDetailComponent {
  classId = 0;
  enrollmentDetail: IEnrollments[] | undefined;
  displayedColumns: string[] = ['alumno', 'diasClases', 'fechaInicio', 'fechaFin'];
  

  constructor(private activatedRoute: ActivatedRoute, private enrollmentService: enrollmentsService, private router: Router){
    this.classId = parseInt(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit() {
    this.enrollmentService.gettEnrollmentsByComisionId$(this.classId).subscribe({
      next: (c) => {
        if (c) {
          this.enrollmentDetail =  c;
        }
      },
    });
  }

  redireccionar() {
    this.router.navigateByUrl('dashboard/enrollments');
  }

}
