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
    this.seanceUrl = 'http://localhost:8081/api/seance';
  }  

  public find(id: number): Observable<Seance> {
    return this.http.get<Seance>(`${this.seanceUrl}s?id=${id}`);
  }

  public save(seance: Seance) {
    return this.http.post<Seance>(this.seanceUrl+"s", seance);
  }
  delete(id: number): Observable<any> {

    return this.http.delete(`${this.seanceUrl}/${id}`);
  }

}
