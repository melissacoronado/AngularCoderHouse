import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  studentsFiltered: IStudent[] = [];

  constructor(private activatedRoute: ActivatedRoute, private studentService: StudentsService){
    this.StudentId = parseInt(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit() {
    this.studentService.getStudentById$(this.StudentId).subscribe({
      next: (c) => {
        if (c) {
          this.studentsDetail =  c;
          //.find((student: IStudent) => student.id === this.StudentId);
        }
      },
    });
  }



}
