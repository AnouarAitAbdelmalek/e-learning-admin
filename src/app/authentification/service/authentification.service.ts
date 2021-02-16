import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'src/app/admin/model/admin';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private httpClient: HttpClient) {}

  authentificate(username: string, password: string) {
    let authRequest = {
      username : username,
      password: password
    }
    console.log(username + ' '+ password);
    return this.httpClient.post<any>('http://localhost:8081/authenticate', authRequest)
      .pipe( 
         map(value => {
           sessionStorage.setItem('jwt',value.jwt)
           sessionStorage.setItem('user',JSON.stringify(value.user));
           console.log(value);
           return value;
         }),
         catchError(err => {
           console.error('HTTP ERROR: ', err);
           return throwError(err);
         })
       );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('jwt');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('jwt');
  }
}
