import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorieRoutingModule } from './categorie-routing.module';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CategorieListComponent],
  imports: [
    CommonModule,
    CategorieRoutingModule, 
    SharedModule
  ]
})
export class CategorieModule { }
