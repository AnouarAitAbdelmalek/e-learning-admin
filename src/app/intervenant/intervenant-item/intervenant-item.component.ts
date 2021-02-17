import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { Intervenant } from '../model/intervenant';
import { IntervenantService } from '../service/intervenant.service';

@Component({
  selector: 'app-intervenant-item',
  templateUrl: './intervenant-item.component.html',
  styleUrls: ['./intervenant-item.component.css']
})
export class IntervenantItemComponent implements OnInit {

  id!: number;

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
    password: new FormControl('', Validators.nullValidator),
    image: new FormControl('', Validators.nullValidator),
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
    public dialog: MatDialog,
    private intervenantService: IntervenantService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.intervenantService.find(this.id).subscribe((data) => {
      this.intervenant = data[0];
      this.nom?.setValue(this.intervenant.nom);
      this.prenom?.setValue(this.intervenant.prenom);
      this.telephone?.setValue(this.intervenant.telephone);
      this.adresse?.setValue(this.intervenant.adresse);
      this.cin?.setValue(this.intervenant.cin);
      this.email?.setValue(this.intervenant.email);
      this.username?.setValue(this.intervenant.username);
      this.image?.setValue(this.intervenant.image);      
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
          this.intervenant = this.intervenantForm.value;
          if(this.selectedImage != null)
         this.intervenant.image = "../../../assets/images/"+this.selectedImage.name;
    this.intervenantService
      .update(this.id, this.intervenant)
      .subscribe((result) => this.gotoIntervenantList());
        }
        else {
          this.gotoIntervenantList();
        }
      });
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
