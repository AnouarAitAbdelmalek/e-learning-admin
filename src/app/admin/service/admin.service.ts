import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../model/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUrl: string;

  constructor(private http: HttpClient) {
    this.adminUrl = 'http://localhost:8081/api/admin';
  }
  public findAll(): Observable<Admin[]> {
    /*let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.get<Admin[]>(this.adminUrl+"s");
  }

  public find(id: number): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.adminUrl}s?id=${id}`);
  }

  public save(admin: Admin) {
    /*let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.post<Admin>(this.adminUrl+"s", admin);
  }
  public saveImage(id:number,image:File) {
    /*let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/
    const formData: FormData = new FormData();

    formData.append('image', image);
    return this.http.post<Admin>("http://localhost:8081/api/adminPicture/"+id, formData,{
      reportProgress: true,
      responseType: 'json'
    });
  }
  delete(id: number): Observable<any> {
    /*let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.delete(`${this.adminUrl}/${id}`);
  }

  public update(id: number,admin: Admin) {
    /*let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.put<Admin>(`${this.adminUrl}/${id}`,admin);
  }
}
