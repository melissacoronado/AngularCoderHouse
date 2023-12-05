import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './users.component';
import { MatDialog } from '@angular/material/dialog';


@NgModule({
  declarations: [
    UsersComponent,
    UserDetailComponent,
    UsersDialogComponent,
    UsersTableComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule {
  constructor(public dialog: MatDialog) {}
 }
