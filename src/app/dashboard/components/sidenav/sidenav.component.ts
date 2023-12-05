import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IUser } from '../../pages/users/models/user';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  showFiller = false;

  public authUser$: Observable<IUser | null>;

  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }

  get fullName$(): Observable<string> {
    return this.authUser$.pipe(
      map((user) => `${user?.nombre} ${user?.apellido}`)
    );
  }

  get email$(): Observable<string | undefined> {
    return this.authUser$.pipe(map((user) => user?.email));
  }

  logout(): void {
    this.authService.logout();
  }

}
