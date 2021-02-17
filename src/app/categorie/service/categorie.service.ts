import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formation } from 'src/app/formation/model/formation';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private categorieUrl: string;

  constructor(private http: HttpClient) {
    this.categorieUrl = 'http://localhost:8081/api/categorie';
  }
  public findAll(): Observable<Categorie[]> {
    /*let username = 'categorie';
    let password = 'categorie';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.get<Categorie[]>(this.categorieUrl+"s");
  }

  public findFormations(id:number): Observable<Formation[]> {
    /*let username = 'categorie';
    let password = 'categorie';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.get<Formation[]>(this.categorieUrl+"s/"+id+"/formations");
  }

  public find(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.categorieUrl}s/${id}`);
  }

  public save(categorie: Categorie) {
    /*let username = 'categorie';
    let password = 'categorie';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.post<Categorie>(this.categorieUrl+"s", categorie);
  }
  delete(id: number): Observable<any> {
    /*let username = 'categorie';
    let password = 'categorie';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.delete(`${this.categorieUrl}/${id}`);
  }

}
