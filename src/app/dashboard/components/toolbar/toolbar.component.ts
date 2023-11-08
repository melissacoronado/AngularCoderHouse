import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output()
  toggleSidebar = new EventEmitter();

  constructor(private router: Router, private _cookie: CookieService) {}

  logout () {
    this._cookie.delete('token');
    this.router.navigate(['/','auth']);
  }
}
