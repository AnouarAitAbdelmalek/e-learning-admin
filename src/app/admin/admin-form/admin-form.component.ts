import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../model/admin';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {

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
    password: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
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
    private adminService: AdminService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.admin = this.adminForm.value;
    
    this.admin.image =  "../../../assets/images/"+this.selectedImage.name;
    console.log(this.admin);
    this.adminService
      .save(this.admin)
      .subscribe((result) => this.gotoAdminList());
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
