import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private categorieUrl: string;

  constructor(private http: HttpClient) {
    this.categorieUrl = 'http://localhost:5001/categories';
  }
  public findAll(): Observable<Categorie[]> {
    /*let username = 'categorie';
    let password = 'categorie';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.get<Categorie[]>(this.categorieUrl);
  }

  public find(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.categorieUrl}/${id}`);
  }

  public save(categorie: Categorie) {
    /*let username = 'categorie';
    let password = 'categorie';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.post<Categorie>(this.categorieUrl, categorie);
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
