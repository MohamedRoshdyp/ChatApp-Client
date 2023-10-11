import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { Member, updateMember } from '../models/member';
import { Observable } from 'rxjs';


// const httpOptions = {
//   headers : new HttpHeaders({
    
//     Authorization : 'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}').token
//   })
// }
@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseURL:string = environment.baseURL+'Accounts/';


  constructor(private http:HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseURL+'get-all-users');
  }
  getMember(userName:string){
    return this.http.get<Member>(this.baseURL+`get-user-by-userName/${userName}`)
  }
  updateMember(model:updateMember){
    return this.http.put<updateMember>(this.baseURL+'update-current-member',model)
  }
  uploadMemberPhoto(file:any){
    // const params = new HttpParams({fromObject:formData})
    // return this.http.post(this.baseURL+'upload-photo',params.toString(),{
    //   headers:{'Content-Type': 'application/x-www-form-urlencoded'}
    // })
    return this.http.post(this.baseURL+'upload-photo',file)

  }
  removeMemberPhoto(id:number){
    return this.http.delete(this.baseURL+`remove-photo/${id}`);
  }

  setMainPhoto(id:number){
    return this.http.put(this.baseURL+`set-main-photo/${id}`,null);
  }
}
