import { MatPaginator } from '@angular/material/paginator';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Admin } from '../model/admin';
import { AdminService } from '../service/admin.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit, OnDestroy {

  ADMINS: Admin[] = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource: MatTableDataSource<Admin> = new MatTableDataSource<Admin>(this.ADMINS);
  constructor
  (private adminService: AdminService, 
    private changeDetectorRef: ChangeDetectorRef, 
    public dialog: MatDialog,
    private route: Router) {}

  ngOnInit(): void {
    this.adminService.findAll().subscribe(
      (data) => {
        this.ADMINS = data
        this.dataSource.data= this.ADMINS;
      },
      (error) => console.log(error)
    );
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();

  }

  goToAdmin(id: number) {
    this.route.navigate(['/admin/' + id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteAdmin(id: number) {
    this.adminService.delete(id).subscribe(
      (data) => {

        this.adminService.findAll().subscribe(
          (data) => {
            this.ADMINS = data;
            this.dataSource.data = this.ADMINS;
          },
          (error) => {
            this.dataSource = new MatTableDataSource<Admin>();
          }
        );
      },
      (error) => console.log(error)
    );
  }

  openDialog(admin: Admin): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: "Voulez vous supprimer l'admin " + admin.username + '?',
        idSupp: admin.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteAdmin(result.data.idSupp);
      }
    });
  }

  

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

}
