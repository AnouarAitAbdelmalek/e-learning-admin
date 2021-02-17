import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { Admin } from '../model/admin';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.css']
})
export class AdminItemComponent implements OnInit {

  id!: number;

  admin!: Admin;
  admins!: Admin[];
  selectedImage!: File;
  adminForm = new FormGroup({
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
    return this.adminForm.get('prenom');
  }

  get nom() {
    return this.adminForm.get('nom');
  }

  get cin() {
    return this.adminForm.get('cin');
  }

  get adresse() {
    return this.adminForm.get('adresse');
  }
  get telephone() {
    return this.adminForm.get('telephone');
  }

  get username() {
    return this.adminForm.get('username');
  }

  get email() {
    return this.adminForm.get('email');
  }

  get image() {
    return this.adminForm.get('image');
  }


  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    public dialog: MatDialog,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.adminService.find(this.id).subscribe((data) => {
      console.log(data[0]);
      this.admin = data[0];
      this.nom?.setValue(this.admin.nom);
      this.prenom?.setValue(this.admin.prenom);
      this.telephone?.setValue(this.admin.telephone);
      this.adresse?.setValue(this.admin.adresse);
      this.cin?.setValue(this.admin.cin);
      this.email?.setValue(this.admin.email);
      this.username?.setValue(this.admin.username);
      this.image?.setValue(this.admin.image);
      
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
          
          this.admin = this.adminForm.value;
          if(this.selectedImage != null)
         this.admin.image = "../../../assets/images/"+this.selectedImage.name;
    this.adminService
      .update(this.id, this.admin)
      .subscribe((result) => this.gotoAdminList());
        }
        else {
          this.gotoAdminList();
        }
      });
  }

  gotoAdminList() {
    this.router.navigate(['/adminList']);
  }

  onFileSelected(event: Event) {
    let target = event.target as HTMLInputElement;
    this.selectedImage = target.files![0];
    console.log(this.selectedImage);
  }



}
