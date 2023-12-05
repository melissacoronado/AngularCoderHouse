import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from '../../pages/users/models/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output()
  toggleSidebar = new EventEmitter();

  public authUser$: Observable<IUser | null>;

  constructor(private router: Router, private _cookie: CookieService, private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }
  
  get fullName$(): Observable<string> {
    return this.authUser$.pipe(
      map((user) => `${user?.nombre} ${user?.apellido}`)
    );
  }

  logout () {
    this._cookie.delete('token');
    this.router.navigate(['/','auth']);
  }
}
