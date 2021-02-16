import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormationRoutingModule } from './formation-routing.module';
import { FormationListComponent } from './formation-list/formation-list.component';
import { FormationFormComponent } from './formation-form/formation-form.component';
import { FormationItemComponent } from './formation-item/formation-item.component';
import { SharedModule } from '../shared/shared.module';
import { FormationEtudiantsComponent } from './formation-etudiants/formation-etudiants.component';


@NgModule({
  declarations: [FormationListComponent, FormationFormComponent, FormationItemComponent, FormationEtudiantsComponent],
  imports: [
    CommonModule,
    FormationRoutingModule,
    SharedModule
  ]
})
export class FormationModule { }
