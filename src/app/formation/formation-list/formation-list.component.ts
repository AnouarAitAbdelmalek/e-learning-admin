import { EtudiantService } from './../../etudiant/service/etudiant.service';
import { IntervenantService } from './../../intervenant/service/intervenant.service';
import { CategorieService } from './../../categorie/service/categorie.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { Formation } from '../model/formation';
import { FormationService } from '../service/formation.service';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.css']
})
export class FormationListComponent implements OnInit {

  FORMATIONS: Formation[] = [];
  id: number = 0;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource: MatTableDataSource<Formation> = new MatTableDataSource<Formation>(this.FORMATIONS);
  constructor
  (private formationService: FormationService,
    private catService: CategorieService, 
    private intervenantService: IntervenantService,
    private etudiantService: EtudiantService, 
    private changeDetectorRef: ChangeDetectorRef, 
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private route: Router) {
      
    }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['idCat'])
    {
      this.id = this.activatedRoute.snapshot.params['idCat'];
      this.catService.find(this.id).subscribe(
        (data) => {
          this.FORMATIONS = data.formations;
          this.dataSource.data= this.FORMATIONS;
        },
        (error) => console.log(error)
      );
    }
    else if(this.activatedRoute.snapshot.params['idInter'])
    {
      this.id = this.activatedRoute.snapshot.params['idInter'];
      this.intervenantService.find(this.id).subscribe(
        (data) => {
          this.FORMATIONS = data.formations;
          this.dataSource.data= this.FORMATIONS;
        },
        (error) => console.log(error)
      );
    }
    else if(this.activatedRoute.snapshot.params['idEtud'])
    {
      this.id = this.activatedRoute.snapshot.params['idEtud'];
      this.etudiantService.find(this.id).subscribe(
        (data) => {
          this.FORMATIONS = data.formations;
          this.dataSource.data= this.FORMATIONS;
        },
        (error) => console.log(error)
      );
    }
    else
    {
      this.formationService.findAll().subscribe(
        (data) => {
          this.FORMATIONS = data;
          this.FORMATIONS.forEach(frmtn => {
            frmtn.etudiants = [];
          });
          this.dataSource.data= this.FORMATIONS;
        },
        (error) => console.log(error)
      );
    }
    
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteFormation(id: number) {
    this.formationService.delete(id).subscribe(
      (data) => {
      this.formationService.findAll().subscribe(
        (data) => {
          this.FORMATIONS = data;
          this.FORMATIONS.forEach(frmtn => {
            frmtn.etudiants = [];
          });
          this.dataSource.data= this.FORMATIONS;
        },
        (error) => console.log(error)
      );
      },
      (error) => console.log(error)
    );
  }

  openDialog(formation: Formation): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: "Voulez vous supprimer la formation " + formation.titre + '?',
        idSupp: formation.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteFormation(result.data.idSupp);
      }
    });
  }

  goToFormation(id: number){
    this.route.navigate(['/formation/'+id]);
  }

  

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

}
