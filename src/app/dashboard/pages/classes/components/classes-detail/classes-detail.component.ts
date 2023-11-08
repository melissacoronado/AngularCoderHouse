import { Component } from '@angular/core';
import { IClasses } from '../../Models/classes';
import { ActivatedRoute, Router } from '@angular/router';
import { classesService } from '../../classes.service';

@Component({
  selector: 'app-classes-detail',
  templateUrl: './classes-detail.component.html',
  styleUrls: ['./classes-detail.component.scss']
})
export class ClassesDetailComponent {
  classId = 0;
  classDetail: IClasses | undefined;

  constructor(private activatedRoute: ActivatedRoute, private classService: classesService, private router: Router){
    this.classId = parseInt(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit() {
    this.classService.getClassById$(this.classId).subscribe({
      next: (c) => {
        if (c) {
          this.classDetail =  c;
        }
      },
    });
  }

  redireccionar() {
    this.router.navigateByUrl('dashboard/classes');
  }

}
