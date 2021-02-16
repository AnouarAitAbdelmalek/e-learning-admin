import { Seance } from './model/seance';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  private seanceUrl: string;
  

  constructor(
    private http: HttpClient
    ) {
    this.seanceUrl = 'http://localhost:5001/seances';
  }  

  public find(id: number): Observable<Seance> {
    return this.http.get<Seance>(`${this.seanceUrl}/${id}`);
  }

  public save(seance: Seance) {
    /*let username = 'formation';
    let password = 'formation';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.post<Seance>(this.seanceUrl, seance);
  }
  delete(id: number): Observable<any> {
    /*let username = 'formation';
    let password = 'formation';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.delete(`${this.seanceUrl}/${id}`);
  }

}
