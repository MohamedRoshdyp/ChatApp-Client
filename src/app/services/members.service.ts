import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { Member, updateMember } from '../models/member';
import { Observable, map, of, take } from 'rxjs';
import { PaginatedResult } from '../models/Pagination';
import { UserParams } from '../models/userParams';
import { AuthService } from './auth.service';
import { User } from '../models/login';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';


// const httpOptions = {
//   headers : new HttpHeaders({

//     Authorization : 'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}').token
//   })
// }
@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseURL: string = environment.baseURL;
  memberCash = new Map();
  user!: User;
  userParams!: UserParams;

  constructor(private http: HttpClient, private authServices: AuthService) {
    this.authServices.currentUser$.pipe(take(1)).subscribe({
      next: (res) => {
        if (res) {
          this.user = res;
          this.userParams = new UserParams(res);
        }
      }
    }
    )
  }

  addLike(userName: string) {
    return this.http.post(this.baseURL + 'Likes/add-like/' + userName, {});
  }
  getLikes(Pridicate: string,pageNumber:number,pageSize:number) {
    let params = getPaginationHeaders(pageNumber,pageSize);
    params = params.append('Pridicate',Pridicate);
    // return this.http.get(this.baseURL + 'Likes/get-user-like');
    return getPaginatedResult<Partial<Member[]>>(this.baseURL+'Likes/get-user-like',params,this.http);
  }
  setUserParams(params: UserParams) {
    this.userParams = params;
  }
  getUserParams() {
    return this.userParams;
  }
  resetUserPrams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }
  getMembers(userParams: UserParams) {
    console.log(Object.values(userParams).join('-'));
    var response = this.memberCash.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<Member[]>(this.baseURL + 'Accounts/get-all-users', params,this.http)
      .pipe(
        map(res => {
          this.memberCash.set(Object.values(userParams).join('-'), res)
          return res;
        })
      )
  }
 
  getMember(userName: string) {
    // debugger
    // console.log(this.memberCash.values());
    const member = [...this.memberCash.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName === userName);

    if (member) {
      return of(member);
    }

    // console.log(member);
    return this.http.get<Member>(this.baseURL + `Accounts/get-user-by-userName/${userName}`)
  }
  updateMember(model: updateMember) {
    return this.http.put<updateMember>(this.baseURL + 'Accounts/update-current-member', model)
  }
  uploadMemberPhoto(file: any) {
    // const params = new HttpParams({fromObject:formData})
    // return this.http.post(this.baseURL+'upload-photo',params.toString(),{
    //   headers:{'Content-Type': 'application/x-www-form-urlencoded'}
    // })
    return this.http.post(this.baseURL + 'Accounts/upload-photo', file)

  }
  removeMemberPhoto(id: number) {
    return this.http.delete(this.baseURL + `Accounts/remove-photo/${id}`);
  }

  setMainPhoto(id: number) {
    return this.http.put(this.baseURL + `Accounts/set-main-photo/${id}`, null);
  }
}
