import { Component } from '@angular/core';
import { IUser } from './models/user';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { UsersService } from './user.service';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users$: Observable<IUser[]>;
  token: string = "";
 
  constructor(private matDialog: MatDialog, private userService: UsersService){
    this.users$ = userService.getUsers$();
  }

  generateToken(): string{
    for (let i = 0; i < 30; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      this.token += caracteres.charAt(indice);
    }
    return this.token;
  }

 
  
  onAddUser():void{
    this.matDialog.open(UsersDialogComponent)
    .afterClosed()
    .subscribe({
      next: (result) => {
        if(result){
          this.users$ = this.userService.addUser$({
            id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
            nombre: result.nombre,
            apellido: result.apellido,
            email: result.email,
            token: this.generateToken(),
            password: result.password,
            role: result.role
          });
        }
      }
    })
  }
  
  onDeleteUser(studentId: number): void {

    Swal.fire({
      title: `Confirma eliminar Usuario Id ${studentId}?`,
      text: '¡No podrás deshacer esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para eliminar el elemento
        this.users$ = this.userService.deleteUser$(studentId);
      }
    });
  }

  onEditUser(studentId: number): void {
    this.matDialog
      .open(UsersDialogComponent, {
        data: studentId,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {  
            this.users$ = this.userService.editUser$(studentId, v);          
          }
        },
      });
  }
}
