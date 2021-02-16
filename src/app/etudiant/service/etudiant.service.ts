import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Etudiant } from '../model/etudiant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private etudiantUrl: string;

  constructor(private http: HttpClient) {
    this.etudiantUrl = 'http://localhost:5001/etudiants';
  }
  public findAll(): Observable<Etudiant[]> {
    /*let username = 'etudiant';
    let password = 'etudiant';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.get<Etudiant[]>(this.etudiantUrl);
  }

  public find(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.etudiantUrl}/${id}`);
  }

  public save(etudiant: Etudiant) {
    /*let username = 'etudiant';
    let password = 'etudiant';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.post<Etudiant>(this.etudiantUrl, etudiant);
  }

  public delete(id: number): Observable<any> {
    /*let username = 'etudiant';
    let password = 'etudiant';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.delete(`${this.etudiantUrl}/${id}`);
  }

  public update(id: number,etudiant: Etudiant) {
    /*let username = 'etudiant';
    let password = 'etudiant';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.put<Etudiant>(`${this.etudiantUrl}/${id}`,etudiant);
  }
}
