import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { SharedModule } from '../shared/shared.module';
import { AdminItemComponent } from './admin-item/admin-item.component';


@NgModule({
  declarations: [AdminFormComponent, AdminListComponent, AdminItemComponent],
  imports: [
    CommonModule,
    AdminRoutingModule, SharedModule
  ]
})
export class AdminModule { }
