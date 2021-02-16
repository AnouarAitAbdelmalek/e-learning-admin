import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { Intervenant } from '../model/intervenant';
import { IntervenantService } from '../service/intervenant.service';

@Component({
  selector: 'app-intervenant-list',
  templateUrl: './intervenant-list.component.html',
  styleUrls: ['./intervenant-list.component.css']
})
export class IntervenantListComponent implements OnInit {

  INTERVENANTS: Intervenant[] = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource: MatTableDataSource<Intervenant> = new MatTableDataSource<Intervenant>(this.INTERVENANTS);
  constructor
  (private intervenantService: IntervenantService, 
    private changeDetectorRef: ChangeDetectorRef, 
    public dialog: MatDialog,
    private route: Router) {}

  ngOnInit(): void {
    this.intervenantService.findAll().subscribe(
      (data) => {
        this.INTERVENANTS = data
        this.dataSource.data= this.INTERVENANTS;
      },
      (error) => console.log(error)
    );
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();

  }

  goToIntervenant(id: number) {
    this.route.navigate(['/intervenant/' + id]);
  }

  goToFormations(idInter: number) {
    this.route.navigate(['/intervenant/'+ idInter +'/formations']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteIntervenant(id: number) {
    this.intervenantService.delete(id).subscribe(
      (data) => {

        this.intervenantService.findAll().subscribe(
          (data) => {
            this.INTERVENANTS = data;
            this.dataSource.data = this.INTERVENANTS;
          },
          (error) => {
            this.dataSource = new MatTableDataSource<Intervenant>();
          }
        );
      },
      (error) => console.log(error)
    );
  }

  openDialog(intervenant: Intervenant): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: "Voulez vous supprimer l'intervenant " + intervenant.username + '?',
        idSupp: intervenant.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteIntervenant(result.data.idSupp);
      }
    });
  }

  

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

}
