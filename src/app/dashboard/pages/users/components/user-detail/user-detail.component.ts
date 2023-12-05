import { Component } from '@angular/core';
import { IUser } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  userId = 0;
  usersDetail: IUser | undefined;

  constructor(private activatedRoute: ActivatedRoute, private userService: UsersService, private router: Router){
    this.userId = parseInt(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit() {
    this.userService.getUserById$(this.userId).subscribe({
      next: (c) => {
        if (c) {
          this.usersDetail =  c;
        }
      },
    });
  }

  redireccionar() {
    this.router.navigateByUrl('dashboard/users');
  }
}
