import { AcceuilComponent } from './shared/acceuil/acceuil.component';
import { EtudiantItemComponent } from './etudiant/etudiant-item/etudiant-item.component';
import { EtudiantFormComponent } from './etudiant/etudiant-form/etudiant-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminFormComponent } from './admin/admin-form/admin-form.component';
import { AdminItemComponent } from './admin/admin-item/admin-item.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { CategorieListComponent } from './categorie/categorie-list/categorie-list.component';
import { EtudiantListComponent } from './etudiant/etudiant-list/etudiant-list.component';
import { FormationFormComponent } from './formation/formation-form/formation-form.component';
import { FormationItemComponent } from './formation/formation-item/formation-item.component';
import { FormationListComponent } from './formation/formation-list/formation-list.component';
import { IntervenantFormComponent } from './intervenant/intervenant-form/intervenant-form.component';
import { IntervenantItemComponent } from './intervenant/intervenant-item/intervenant-item.component';
import { IntervenantListComponent } from './intervenant/intervenant-list/intervenant-list.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FormationEtudiantsComponent } from './formation/formation-etudiants/formation-etudiants.component';
import { LoginComponent } from './authentification/login/login.component';
import { AuthGuardService } from './authentification/service/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: SidebarComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'formationList',
        pathMatch: 'full',
      },
      {
        path: 'acceuil',
        component: AcceuilComponent,
      },
      {
        path: 'adminList',
        component: AdminListComponent,
      },
      {
        path: 'adminForm',
        component: AdminFormComponent,
      },
      {
        path: 'admin/:id',
        component: AdminItemComponent,
      },
      {
        path: 'intervenantList',
        component: IntervenantListComponent,
      },
      {
        path: 'intervenantForm',
        component: IntervenantFormComponent,
      },
      {
        path: 'intervenant/:id',
        component: IntervenantItemComponent,
      },
      {
        path: 'categorieList',
        component: CategorieListComponent,
      },
      {
        path: 'categorie/:idCat/formations',
        component: FormationListComponent,
      },
      {
        path: 'intervenant/:idInter/formations',
        component: FormationListComponent,
      },
      {
        path: 'formationList',
        component: FormationListComponent,
      },
      {
        path: 'formationForm',
        component: FormationFormComponent,
      },
      {
        path: 'formation/:id',
        component: FormationItemComponent,
      },
      {
        path: 'etudiantList',
        component: EtudiantListComponent,
      },
      {
        path: 'etudiantForm',
        component: EtudiantFormComponent,
      },
      {
        path: 'etudiant/:id',
        component: EtudiantItemComponent,
      },
      {
        path: 'etudiant/:idEtud/formations',
        component: FormationListComponent,
      },
      {
        path: 'formation/:id/etudiants',
        component: FormationEtudiantsComponent,
      },     
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
