import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntervenantRoutingModule } from './intervenant-routing.module';
import { IntervenantListComponent } from './intervenant-list/intervenant-list.component';
import { IntervenantItemComponent } from './intervenant-item/intervenant-item.component';
import { IntervenantFormComponent } from './intervenant-form/intervenant-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [IntervenantListComponent, IntervenantItemComponent, IntervenantFormComponent],
  imports: [
    CommonModule,
    IntervenantRoutingModule, SharedModule
  ]
})
export class IntervenantModule { }
