import { CategorieService } from './../../categorie/service/categorie.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/categorie/model/categorie';
import { Formation } from '../model/formation';
import { FormationService } from '../service/formation.service';
import { MatTableDataSource } from '@angular/material/table';
import { Intervenant } from 'src/app/intervenant/model/intervenant';
import { IntervenantService } from 'src/app/intervenant/service/intervenant.service';

@Component({
  selector: 'app-formation-form',
  templateUrl: './formation-form.component.html',
  styleUrls: ['./formation-form.component.css']
})
export class FormationFormComponent implements OnInit {

  formation: Formation = new Formation;
  categories: Categorie[] = [];
  intervenants: Intervenant[] = [];
  disabled: boolean = false;
  today = new Date;
  selectedImage!: File;

  formationForm = new FormGroup({
    titre: new FormControl('', Validators.required),
    categorie: new FormControl('', Validators.required),
    dateDebut: new FormControl('', Validators.required),
    dateFin: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    intervenant: new FormControl('', Validators.required),
    prix: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  get titre() {
    return this.formationForm.get('titre');
  }

  get categorie() {
    return this.formationForm.get('categorie');
  }

  get intervenant() {
    return this.formationForm.get('intervenant');
  }

  get prix() {
    return this.formationForm.get('prix');
  }

  get dateDebut() {
    return this.formationForm.get('dateDebut');
  }

  get dateFin() {
    return this.formationForm.get('dateFin');
  }
  get description() {
    return this.formationForm.get('description');
  }



  dataSourceCat: MatTableDataSource<Categorie> = new MatTableDataSource<Categorie>(this.categories);
  dataSourceInter: MatTableDataSource<Intervenant> = new MatTableDataSource<Intervenant>(this.intervenants);
  constructor(private categorieService: CategorieService, 
    private intervenantService: IntervenantService,
    private router: Router,
    private formationService: FormationService,
    
  ) {}

  ngOnInit(): void {
    this.categorieService.findAll().subscribe(
      (data) => {
        this.categories = data
        this.dataSourceCat.data= this.categories;
      },
      (error) => console.log(error)
    );

    this.intervenantService.findAll().subscribe(
      (data) => {
        this.intervenants = data
        this.dataSourceInter.data= this.intervenants;
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    this.formation = this.formationForm.value;
    this.formation.image = "../../../assets/images/"+this.selectedImage.name;
    console.log(this.formation);
    this.formationService
      .save(this.formation)
      .subscribe((result) => this.gotoFormationList());
  }

  gotoFormationList() {
    this.router.navigate(['/formationList']);
  }

  onFileSelected(event: Event) {
    let target = event.target as HTMLInputElement;
    this.selectedImage = target.files![0];
    console.log(this.selectedImage);
  }
}
