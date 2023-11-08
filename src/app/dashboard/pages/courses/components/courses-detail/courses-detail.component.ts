import { Component } from '@angular/core';
import { ICourse } from '../../models/courses';
import { ActivatedRoute, Router } from '@angular/router';
import { courseService } from '../../courses.service';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.scss']
})
export class CoursesDetailComponent {
  courseId = 0;
  courseDetail: ICourse | undefined;

  constructor(private activatedRoute: ActivatedRoute, private courseService: courseService, private router: Router){
    this.courseId = parseInt(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit() {
    this.courseService.getCourseById$(this.courseId).subscribe({
      next: (c) => {
        if (c) {
          this.courseDetail =  c;
        }
      },
    });
  }

  redireccionar() {
    this.router.navigateByUrl('dashboard/courses');
  }

}
