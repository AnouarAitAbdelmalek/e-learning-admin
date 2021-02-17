import { SeanceService } from './../../seance/seance.service';
import { Formation } from 'src/app/formation/model/formation';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormationService } from '../service/formation.service';
import { Seance } from 'src/app/seance/model/seance';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-formation-item',
  templateUrl: './formation-item.component.html',
  styleUrls: ['./formation-item.component.css']
})
export class FormationItemComponent implements OnInit {

  formation: Formation = new Formation;
  seanceForm = new FormGroup({
    titre: new FormControl('', Validators.required),
    jour: new FormControl('', Validators.required),
    creneau: new FormControl('', Validators.required)
  });

  seances: Seance[] = [];

  get titre() {
    return this.seanceForm.get('titre');
  }

  get jour() {
    return this.seanceForm.get('jour');
  }

  get creneau() {
    return this.seanceForm.get('creneau');
  }



  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, 
    public dialog: MatDialog,
    private formationService: FormationService,
    private seanceService: SeanceService
  ) {}


  ngOnInit(): void {
    this. formationService.find(this.activatedRoute.snapshot.params['id']).subscribe(
      (data) => {
        this.formation=data[0];
        this.formationService.findSeances(this.formation.id).subscribe(result=>{
          this.seances=result;
        })
      }
    );
  }

  onSubmit() {

    let newSeance = new Seance;
    let date = new Date;
    date = this.seanceForm.get('jour')?.value;
    if(this.seanceForm.get('creneau')?.value == 1)
      date.setHours(8);
    if(this.seanceForm.get('creneau')?.value == 2)
      date.setHours(10);
    if(this.seanceForm.get('creneau')?.value == 3)
      date.setHours(14);
    if(this.seanceForm.get('creneau')?.value == 4)
      date.setHours(16);

    newSeance.titre=this.seanceForm.get('titre')?.value;
    newSeance.creneau=date;
    newSeance.formation = this.formation;
    
    this.seanceService.save(newSeance).subscribe(
      (data) =>{
        this.formationService.findSeances(this.formation.id).subscribe(result=>{
          this.seances=result;
        })
        this.seanceForm.reset();
      },(error) => {
        alert('khata2');
        this.seanceForm.reset();
      }
    )
    
  }

  deleteSeance(seance: Seance) {
  

      this.seanceService.delete(seance.id).subscribe(
        (data) =>{
          this.formationService.findSeances(this.formation.id).subscribe(result=>{
            this.seances=result;
          })
        },(error) => {
          alert(seance.id)
        }
      )
    
  }

  openDialog(seance: Seance): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: "Voulez vous supprimer la séance " + seance.titre + '?',
        supp: seance,
      },
    });


    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSeance(result.data.supp);
      }
    });
  }

  goToEtudiants(formation: Formation): void{
    this.router.navigate(['/formation/'+formation.id+'/etudiants']);
  }


}
