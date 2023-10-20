import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { ILogin, User } from '../models/login';
import { ReplaySubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL:string = environment.baseURL;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http:HttpClient) { }

  login(model:any){
    return this.http.post<any>(this.baseURL+'Accounts/login',model).pipe(
      map((res:User)=>{
        const user = res;
        if(user){
          this.setCurrentUser(user);
          // localStorage.setItem('user',JSON.stringify(res))
          // this.currentUserSource.next(user)
        }
      })
    )
  }
  setCurrentUser(user:User){
    user.roles = [];
    const roles = this.getDecodeToken(user.token).role;
    Array.isArray(roles) ?user.roles = roles : user.roles.push(roles); 
    localStorage.setItem('user',JSON.stringify(user))
    this.currentUserSource.next(user);
  }
  register(model:any){
    return this.http.post<any>(this.baseURL+'Accounts/Register',model).pipe(
      map((respnsoe:User)=>{
        const user = respnsoe;
        if(user){
          this.setCurrentUser(user);
          // localStorage.setItem('user',JSON.stringify(user));
          // this.currentUserSource.next(user);
        }
      })
    )
  }
  logout(){
    localStorage.removeItem('user')
    this.currentUserSource.next(null);
  }

  getDecodeToken(token:string){
    return JSON.parse(atob(token.split('.')[1]))
  }
 
}
