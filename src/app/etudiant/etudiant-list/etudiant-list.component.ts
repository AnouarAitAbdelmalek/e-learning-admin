import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Etudiant } from '../model/etudiant';
import { EtudiantService } from '../service/etudiant.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-etudiant-list',
  templateUrl: './etudiant-list.component.html',
  styleUrls: ['./etudiant-list.component.css']
})
export class EtudiantListComponent implements OnInit {

  ETUDIANTS: Etudiant[] = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource: MatTableDataSource<Etudiant> = new MatTableDataSource<Etudiant>(this.ETUDIANTS);
  constructor
  (private etudiantService: EtudiantService, 
    private changeDetectorRef: ChangeDetectorRef, 
    public dialog: MatDialog,
    private route: Router) {}

  ngOnInit(): void {
    this.etudiantService.findAll().subscribe(
      (data) => {
        this.ETUDIANTS = data
        this.dataSource.data= this.ETUDIANTS;
      },
      (error) => console.log(error)
    );
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();

  }

  goToFormations(idEtud: number) {
    this.route.navigate(['/etudiant/'+ idEtud +'/formations']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  

  deleteIntervenant(id: number) {
    this.etudiantService.delete(id).subscribe(
      (data) => {

        this.etudiantService.findAll().subscribe(
          (data) => {
            this.ETUDIANTS = data;
            this.dataSource.data = this.ETUDIANTS;
          },
          (error) => {
            this.dataSource = new MatTableDataSource<Etudiant>();
          }
        );
      },
      (error) => console.log(error)
    );
  }

  openDialog(etudiant: Etudiant): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: "Voulez vous supprimer l'étudiant " + etudiant.username + '?',
        idSupp: etudiant.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteIntervenant(result.data.idSupp);
      }
    });
  }

  goToEtudiant(id: number) {
    this.route.navigate(['/etudiant/' + id]);
  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

}
