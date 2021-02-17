import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorService {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (
      sessionStorage.getItem('jwt') &&
      sessionStorage.getItem('user')
    ) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
            "Bearer " + sessionStorage.getItem('jwt'))
    });
    return next.handle(cloned);
    }
    else{
      return next.handle(req);
    }

    
  }
}
