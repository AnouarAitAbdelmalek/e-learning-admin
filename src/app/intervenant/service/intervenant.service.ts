import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formation } from 'src/app/formation/model/formation';
import { Intervenant } from '../model/intervenant';

@Injectable({
  providedIn: 'root'
})
export class IntervenantService {

  private intervenantUrl: string;

  constructor(private http: HttpClient) {
    this.intervenantUrl = 'http://localhost:8081/api/intervenant';
  }
  public findAll(): Observable<Intervenant[]> {
    /*let username = 'intervenant';
    let password = 'intervenant';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.get<Intervenant[]>(this.intervenantUrl+"s");
  }

  public find(id: number): Observable<Intervenant[]> {
    return this.http.get<Intervenant[]>(`${this.intervenantUrl}s?id=${id}`);
  }
  public findFormations(id:number): Observable<Formation[]>
  {
    return this.http.get<Formation[]>(`${this.intervenantUrl}/${id}/formations`);
  }


  public save(intervenant: Intervenant) {
    /*let username = 'intervenant';
    let password = 'intervenant';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.post<Intervenant>(this.intervenantUrl+"s", intervenant);
  }

  public saveImage(id:number,image:File) {
    /*let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/
    const formData: FormData = new FormData();

    formData.append('image', image);
    return this.http.post<Intervenant>("http://localhost:8081/api/intervenantPicture/"+id, formData,{
      reportProgress: true,
      responseType: 'json'
    });
  }
  delete(id: number): Observable<any> {
    /*let username = 'intervenant';
    let password = 'intervenant';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.delete(`${this.intervenantUrl}/${id}`);
  }

  public update(id: number,intervenant: Intervenant) {
    /*let username = 'intervenant';
    let password = 'intervenant';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.put<Intervenant>(`${this.intervenantUrl}/${id}`,intervenant);
  }
}
