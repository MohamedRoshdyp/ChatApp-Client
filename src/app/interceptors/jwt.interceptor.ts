import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/login';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authServices:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser!:User;
    
    this.authServices.currentUser$.subscribe({
      next:(res)=>{
        if(res){

          currentUser = res;
        }
      }
    });
    if(currentUser){
      request =request.clone({
        setHeaders:{
          Authorization : `Bearer ${currentUser.token}`
        }
      })
    }

  

    return next.handle(request);
  }
}
