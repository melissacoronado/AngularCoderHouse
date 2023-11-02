import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullnamePipe } from './pipes/fullname.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { FormErrorsPipe } from './pipes/form-errors.pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TitlesDirective } from './directives/titles.directive';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [FullnamePipe, FormErrorsPipe, TitlesDirective],
  imports: [
    CommonModule
  ],
  exports: [
    FullnamePipe,
    FormErrorsPipe,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatListModule,
    MatCheckboxModule,
    TitlesDirective,    
    MatCardModule,
    
  ]
})
export class SharedModule { }
