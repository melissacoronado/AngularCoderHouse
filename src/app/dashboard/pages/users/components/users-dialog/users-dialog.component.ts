import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../user.service';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: []
})
export class UsersDialogComponent {
  usersForm: FormGroup;

  rolesList = [{id: 1, nombre: 'Admin'}, {id: 1, nombre: 'User'}];

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<UsersDialogComponent>,
    private userService: UsersService,

    // RECIBO LA DATA
    @Inject(MAT_DIALOG_DATA) public userId?: number
  )
  {
    this.usersForm = this.formBuilder.group(
      {
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        role: ['', Validators.required],
      }
    );

    if (userId) {
      this.userService.getUserById$(userId).subscribe({
        next: (c) => {
          if (c) {
            //para cargar los datos en el dialog/modal
            this.usersForm.patchValue(c);
          }
        },
      });
    }

    
  }

  onSubmit(): void {
    if (this.usersForm.invalid) {
      this.usersForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.usersForm.value);
    }
  }
}
