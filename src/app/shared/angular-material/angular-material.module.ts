import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table'
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule} from '@angular/material/button'
import {MatBadgeModule} from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [],
  imports: [
    MatNativeDateModule
  ],
  exports:[
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    MatBadgeModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDialogModule,
    MatDatepickerModule,
    MatCardModule
  ]
})
export class AngularMaterialModule { }
