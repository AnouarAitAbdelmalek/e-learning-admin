import { Formation } from './../model/formation';
import { FormationService } from './../service/formation.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EtudiantService } from './../../etudiant/service/etudiant.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Etudiant } from 'src/app/etudiant/model/etudiant';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-formation-etudiants',
  templateUrl: './formation-etudiants.component.html',
  styleUrls: ['./formation-etudiants.component.css']
})
export class FormationEtudiantsComponent implements OnInit {

  ETUDIANTS: Etudiant[] = [];
  idFormation=this.activatedRoute.snapshot.params['id'];
  formation: Formation = new Formation();

 /*  ajouterEtudiant(id: number): void {
    this.formationService.findEtudiants(this.idFormation).subscribe(
      (data) => {
        this.formation = data;
        this.etudiantService.find(id).subscribe(
          (data) => {
            this.formation.etudiants.push(data);
            this.formationService.update(this.idFormation, this.formation);
            this.route.navigate(['/formation/'+this.idFormation]);
          }
        )
      }
    )
  } */
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource: MatTableDataSource<Etudiant> = new MatTableDataSource<Etudiant>(this.ETUDIANTS);
  constructor
  (private etudiantService: EtudiantService,
    private formationService: FormationService, 
    private changeDetectorRef: ChangeDetectorRef, 
    public dialog: MatDialog,
    private route: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    let id=this.activatedRoute.snapshot.params['id'];
    this.formationService.findEtudiants(id).subscribe(
      (data) => {
        this.ETUDIANTS = data;
        // this.formationService.find(this.idFormation).subscribe(
        //   (data) => {
            
        //     data.etudiants.forEach(element => {
        //       let index: number = this.ETUDIANTS.indexOf(element);
        //       console.log(index);
        //       if (index !== -1) {
        //       this.ETUDIANTS.splice(index,1);
        //       }
        //     });
        //   }
        // )
        this.dataSource.data= this.ETUDIANTS;
      },
      (error) => console.log(error)
    );
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();

  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }




}
