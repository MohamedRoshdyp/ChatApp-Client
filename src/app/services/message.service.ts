import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { Message } from '../models/message';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseURl: string = environment.baseURL + 'Messages/';


  constructor(private http: HttpClient) { }

  getMessages(pageNumber: number, pageSize: number, container: string) {

    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);

    return getPaginatedResult<Message[]>(this.baseURl + 'get-message-for-user', params, this.http)
  }

  getMessageRead(userName:string){
    return this.http.get<Message[]>(this.baseURl+`get-message-read/${userName}`);
  }
  sendMessage(userName:string,content:string){
    return this.http.post<Message>(this.baseURl+'add-message',{recipientUserName:userName,content})
  }
  deleteMessage(id:number){
    return this.http.delete(this.baseURl+'delete-message/'+id);
  }
}
