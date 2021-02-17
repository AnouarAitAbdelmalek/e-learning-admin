import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Etudiant } from '../model/etudiant';
import { HttpClient } from '@angular/common/http';
import { Formation } from 'src/app/formation/model/formation';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private etudiantUrl: string;

  constructor(private http: HttpClient) {
    this.etudiantUrl = 'http://localhost:8081/api/etudiant';
  }
  public findAll(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.etudiantUrl+"s");
  }

  public find(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.etudiantUrl}s/${id}`);
  }

  public findFormations(id:number): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.etudiantUrl+"/"+id+"/formations");
  }

  public save(etudiant: Etudiant) {

    return this.http.post<Etudiant>(this.etudiantUrl+"s", etudiant);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.etudiantUrl}/${id}`);
  }

  public update(id: number,etudiant: Etudiant) {

    return this.http.put<Etudiant>(`${this.etudiantUrl}/${id}`,etudiant);
  }
}
