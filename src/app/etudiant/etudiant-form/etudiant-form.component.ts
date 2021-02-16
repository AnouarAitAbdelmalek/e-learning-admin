import { EtudiantService } from './../service/etudiant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Etudiant } from './../model/etudiant';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etudiant-form',
  templateUrl: './etudiant-form.component.html',
  styleUrls: ['./etudiant-form.component.css']
})
export class EtudiantFormComponent implements OnInit {

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
    password: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
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
    private etudiantService: EtudiantService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.etudiant = this.etudiantForm.value;
    this.etudiant.image = "../../../assets/images/"+this.selectedImage.name;
    console.log(this.etudiant);
    this.etudiantService
      .save(this.etudiant)
      .subscribe((result) => this.gotoEtudiantList());
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
