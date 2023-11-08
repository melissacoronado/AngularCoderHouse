import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from '../../models/students';
import { StudentsService } from '../../students.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent 
{
  StudentId = 0;
  studentsDetail: IStudent | undefined;

  constructor(private activatedRoute: ActivatedRoute, private studentService: StudentsService, private router: Router){
    this.StudentId = parseInt(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit() {
    this.studentService.getStudentById$(this.StudentId).subscribe({
      next: (c) => {
        if (c) {
          this.studentsDetail =  c;
        }
      },
    });
  }

  redireccionar() {
    this.router.navigateByUrl('dashboard/students');
  }

}
