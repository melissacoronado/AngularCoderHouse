import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICurso } from '../models/cursos';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss']
})
export class PageWrapperComponent {
  cursos: ICurso[] = [
    {
      nombre: 'Angular',
      id: 30,
      activo: true
    },
    {
      nombre: 'React',
      id: 31,
      activo: true
    },
    {
      nombre: 'Vue',
      id: 32,
      activo: true
    }
  ];

  alumnForm: FormGroup;
 

  constructor(private formBuilder: FormBuilder
    ){
        this.alumnForm = this.formBuilder.group(
          {
            nombre: ['', Validators.required],
            apellido: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            curso: ['', Validators.required],
            beca: [''],
          }
        );
    }
    
    get nombreControl() {
      return this.alumnForm.controls['nombre'];
    }
    get nombreControlIsInvalid() {
      return this.nombreControl.invalid && this.nombreControl.touched;
    }

    get apellidoControl() {
      return this.alumnForm.controls['apellido'];
    }
    get apellidoControlIsInvalid() {
      return this.apellidoControl.invalid && this.apellidoControl.touched;
    }

    get emailControl() {
      return this.alumnForm.controls['email'];
    }
    get emailControlIsInvalid() {
      return this.emailControl.invalid && this.emailControl.touched;
    }
    get emailControlFormatIsInvalid() {
      return this.emailControl.errors?.['email'];
    }

    get cursoControl() {
      return this.alumnForm.controls['curso'];
    }
    get cursoControlIsInvalid() {
      return this.cursoControl.invalid && this.cursoControl.touched;
    }
    

    onSubmit(): void {
      console.log(this.alumnForm.controls);
      console.log(this.cursoControl.touched);
      //if(this.alumnForm.invalid)
    }
}
