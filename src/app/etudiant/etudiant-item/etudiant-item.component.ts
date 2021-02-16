import { EtudiantService } from './../service/etudiant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-etudiant-item',
  templateUrl: './etudiant-item.component.html',
  styleUrls: ['./etudiant-item.component.css']
})
export class EtudiantItemComponent implements OnInit {

  id!: number;

  etudiant!: Etudiant;
  etudiants!: Etudiant[];
  selectedImage!: File;
  etudiantForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    cin: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.nullValidator),
    image: new FormControl('', Validators.nullValidator),
    //formations: new FormControl('', Validators.nullValidator),
  });

  get prenom() {
    return this.etudiantForm.get('prenom');
  }

  get nom() {
    return this.etudiantForm.get('nom');
  }

  get cin() {
    return this.etudiantForm.get('cin');
  }

  get adresse() {
    return this.etudiantForm.get('adresse');
  }
  get telephone() {
    return this.etudiantForm.get('telephone');
  }

  get username() {
    return this.etudiantForm.get('username');
  }

  get email() {
    return this.etudiantForm.get('email');
  }
  
  get image() {
    return this.etudiantForm.get('image');
  }

  

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    public dialog: MatDialog,
    private etudiantService: EtudiantService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.etudiantService.find(this.id).subscribe((data) => {
      this.etudiant = data;
      this.nom?.setValue(this.etudiant.nom);
      this.prenom?.setValue(this.etudiant.prenom);
      this.telephone?.setValue(this.etudiant.telephone);
      this.adresse?.setValue(this.etudiant.adresse);
      this.cin?.setValue(this.etudiant.cin);
      this.email?.setValue(this.etudiant.email);
      this.username?.setValue(this.etudiant.username);
      this.image?.setValue(this.etudiant.image);      
      //this.formations?.setValue(this.etudiant.formations);
    });
  }

  onSubmit() {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: {
          message: "Voulez vous enregistrer cette modification ?"
        },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.etudiant = this.etudiantForm.value;
          if(this.selectedImage != null)
         this.etudiant.image = "../../../assets/images/"+this.selectedImage.name;
    this.etudiantService
      .update(this.id, this.etudiant)
      .subscribe((result) => this.gotoEtudiantList());
        }
        else {
          this.gotoEtudiantList();
        }
      });
  }

  gotoEtudiantList() {
    this.router.navigate(['/etudiantList']);
  }


  onFileSelected(event: Event) {
    let target = event.target as HTMLInputElement;
    this.selectedImage = target.files![0];
    console.log(this.selectedImage);
  }

}
