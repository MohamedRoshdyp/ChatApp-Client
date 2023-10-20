import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { User } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl:string = environment.baseURL+'Admin/';

  constructor(private http:HttpClient) { }

  getUsersWithRoles(){
    return this.http.get<Partial<User[]>>(this.baseUrl+'get-users-with-roles');
  }
  updateUserRoles(userName:string,roles:string[]){
    return this.http.post(this.baseUrl+'update-roles/'+userName+'?roles='+roles,{});
  }

}
