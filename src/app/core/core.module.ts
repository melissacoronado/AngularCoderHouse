import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      // Cuando los componentes de ANG Material necesiten cargar la config por defecto
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      // Utiliza este valor, o esta config por defecto:
      useValue: {
        appearance: 'outline',
      },
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
  ],
})
export class CoreModule { }
