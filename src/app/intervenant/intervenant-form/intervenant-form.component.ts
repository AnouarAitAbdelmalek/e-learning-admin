import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Intervenant } from '../model/intervenant';
import { IntervenantService } from '../service/intervenant.service';

@Component({
  selector: 'app-intervenant-form',
  templateUrl: './intervenant-form.component.html',
  styleUrls: ['./intervenant-form.component.css']
})
export class IntervenantFormComponent implements OnInit {

  intervenant!: Intervenant;
  intervenants!: Intervenant[];
  selectedImage!: File;
  intervenantForm = new FormGroup({
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
    return this.intervenantForm.get('prenom');
  }

  get nom() {
    return this.intervenantForm.get('nom');
  }

  get cin() {
    return this.intervenantForm.get('cin');
  }

  get adresse() {
    return this.intervenantForm.get('adresse');
  }
  get telephone() {
    return this.intervenantForm.get('telephone');
  }

  get username() {
    return this.intervenantForm.get('username');
  }

  get email() {
    return this.intervenantForm.get('email');
  }

  get image() {
    return this.intervenantForm.get('image');
  }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private intervenantService: IntervenantService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.intervenant = this.intervenantForm.value;
    this.intervenant.image = "../../../assets/images/"+this.selectedImage.name;
    console.log(this.intervenant);
    this.intervenantService
      .save(this.intervenant)
      .subscribe((result) => this.gotoIntervenantList());
  }

  gotoIntervenantList() {
    this.router.navigate(['/intervenantList']);
  }

  onFileSelected(event: Event) {
    let target = event.target as HTMLInputElement;
    this.selectedImage = target.files![0];
    console.log(this.selectedImage);
  }

}
