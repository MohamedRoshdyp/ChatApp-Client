import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { Member, updateMember } from '../models/member';
import { Observable, map, of, take } from 'rxjs';
import { PaginatedResult } from '../models/Pagination';
import { UserParams } from '../models/userParams';
import { AuthService } from './auth.service';
import { User } from '../models/login';


// const httpOptions = {
//   headers : new HttpHeaders({

//     Authorization : 'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}').token
//   })
// }
@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseURL: string = environment.baseURL + 'Accounts/';
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

  setUserParams(params: UserParams) {
    this.userParams = params;
  }
  getUserParams() {
    return this.userParams;
  }
  resetUserPrams(){
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }
  getMembers(userParams: UserParams) {
    // console.log(Object.values(userParams).join('-'));
    var response = this.memberCash.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return this.getPaginatedResult<Member[]>(this.baseURL + 'get-all-users', params)
      .pipe(
        map(res => {
          this.memberCash.set(Object.values(userParams).join('-'), res)
          return res;
        })
      )
  }
  private getPaginatedResult<T>(url: any, params: any) {
    const paginatedResult: PaginatedResult<T | null> = new PaginatedResult<T>();

    return this.http.get<T>(url, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          let _pagination = response.headers.get('Pagination');
          if (_pagination !== null) {
            paginatedResult.pagniation = JSON.parse(_pagination);
          }
          return paginatedResult;
        })
      );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
  }
  getMember(userName: string) {
    // console.log(this.memberCash.values());
    const member = [...this.memberCash.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName === userName);

    if (member) {
      return of(member);
    }

    // console.log(member);
    return this.http.get<Member>(this.baseURL + `get-user-by-userName/${userName}`)
  }
  updateMember(model: updateMember) {
    return this.http.put<updateMember>(this.baseURL + 'update-current-member', model)
  }
  uploadMemberPhoto(file: any) {
    // const params = new HttpParams({fromObject:formData})
    // return this.http.post(this.baseURL+'upload-photo',params.toString(),{
    //   headers:{'Content-Type': 'application/x-www-form-urlencoded'}
    // })
    return this.http.post(this.baseURL + 'upload-photo', file)

  }
  removeMemberPhoto(id: number) {
    return this.http.delete(this.baseURL + `remove-photo/${id}`);
  }

  setMainPhoto(id: number) {
    return this.http.put(this.baseURL + `set-main-photo/${id}`, null);
  }
}
