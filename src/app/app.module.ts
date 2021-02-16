import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { EtudiantModule } from './etudiant/etudiant.module';
import { IntervenantModule } from './intervenant/intervenant.module';
import { FormationModule } from './formation/formation.module';
import { CategorieModule } from './categorie/categorie.module';
import { SeanceModule } from './seance/seance.module';
import { AuthentificationModule } from './authentification/authentification.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthHttpInterceptorService } from './authentification/service/basic-auth-http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AdminModule,
    EtudiantModule,
    IntervenantModule,
    FormationModule,
    CategorieModule,
    SeanceModule,
    AuthentificationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
