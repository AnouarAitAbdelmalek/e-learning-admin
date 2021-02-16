import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'src/app/admin/model/admin';

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
    return this.httpClient
      .post<string>('http://localhost:8082/authenticate', authRequest)
      .pipe(
        map((data) => {
          sessionStorage.setItem('jwt', data);
          console.log(data);
          return data;
        })
      )
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
