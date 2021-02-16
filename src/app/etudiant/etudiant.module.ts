import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';
import { EtudiantListComponent } from './etudiant-list/etudiant-list.component';
import { SharedModule } from '../shared/shared.module';
import { EtudiantFormComponent } from './etudiant-form/etudiant-form.component';
import { EtudiantItemComponent } from './etudiant-item/etudiant-item.component';


@NgModule({
  declarations: [EtudiantListComponent, EtudiantFormComponent, EtudiantItemComponent],
  imports: [
    CommonModule,
    EtudiantRoutingModule,
    SharedModule
  ]
})
export class EtudiantModule { }
