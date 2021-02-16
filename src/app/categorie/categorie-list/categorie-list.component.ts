import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategorieService } from './../service/categorie.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Categorie } from '../model/categorie';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit {

  CATEGORIES: Categorie[] = [];
  nouvelle: Categorie = new Categorie();
  length: number =0;
  catForm = new FormGroup({
    designation : new FormControl('')
  })
  get designation() {
    return this.catForm.get('designation');
  }


  dataSource: MatTableDataSource<Categorie> = new MatTableDataSource<Categorie>(this.CATEGORIES);
  obs!: Observable<any>;
  constructor
  (private categorieService: CategorieService, 
    private changeDetectorRef: ChangeDetectorRef, 
    public dialog: MatDialog,
    private route: Router) {}

  ngOnInit(): void {
    this.categorieService.findAll().subscribe(
      (data) => {
        this.CATEGORIES = data
        this.dataSource.data= this.CATEGORIES;
      },
      (error) => console.log(error)
    );
    this.changeDetectorRef.detectChanges();
    this.obs = this.dataSource.connect();
  }

  goToFormations(idCat: number) {
    this.route.navigate(['/categorie/'+ idCat +'/formations']);
  }

  goToAllFormations() {
    this.route.navigate(['/formationList']);
  }

  

  onChange(event: Event) {
    this.nouvelle.designation=this.designation?.value;
    this.length= this.nouvelle.designation.length;
  }

  ajouterCategorie(){
    this.categorieService.save(this.nouvelle).subscribe(
      (data) => {
        this.nouvelle= new Categorie;
        this.length=0;
        this.categorieService.findAll().subscribe(
          (data) => {
            this.CATEGORIES = data;
            this.dataSource.data = this.CATEGORIES;
          },
          (error) => {
            this.dataSource = new MatTableDataSource<Categorie>();
          }
        );
      }
    )
    
    
  }


  deleteCategorie(id: number) {
    this.categorieService.delete(id).subscribe(
      (data) => {

        this.categorieService.findAll().subscribe(
          (data) => {
            this.CATEGORIES = data;
            this.dataSource.data = this.CATEGORIES;
          },
          (error) => {
            this.dataSource = new MatTableDataSource<Categorie>();
          }
        );
      },
      (error) => console.log(error)
    );
  }

  openDialog(categorie: Categorie): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: "Voulez vous supprimer l'categorie " + categorie.designation + '?',
        idSupp: categorie.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCategorie(result.data.idSupp);
      }
    });
  }

  

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
}
