import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table'
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule} from '@angular/material/button'
import {MatBadgeModule} from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
 

@NgModule({
  declarations: [],
  imports: [
    
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
  ]
})
export class AngularMaterialModule { }
