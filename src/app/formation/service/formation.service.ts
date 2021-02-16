import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Formation } from '../model/formation';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private formationUrl: string;
  

  constructor(
    private http: HttpClient
    ) {
    this.formationUrl = 'http://localhost:5001/formations';
  }
  public findAll(): Observable<Formation[]> {
    /*let username = 'formation';
    let password = 'formation';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.get<Formation[]>(this.formationUrl);
  }

  

  public find(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.formationUrl}/${id}`);
  }

  public save(formation: Formation) {
    /*let username = 'formation';
    let password = 'formation';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.post<Formation>(this.formationUrl, formation);
  }
  delete(id: number): Observable<any> {
    /*let username = 'formation';
    let password = 'formation';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.delete(`${this.formationUrl}/${id}`);
  }

  public update(id: number,formation: Formation) {
    /*let username = 'formation';
    let password = 'formation';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.put<Formation>(`${this.formationUrl}/${id}`,formation);
  }
}
