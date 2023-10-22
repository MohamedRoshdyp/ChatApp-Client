import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { Message } from '../models/message';
import { Member } from '../models/member';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from '../models/login';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseURl: string = environment.baseURL + 'Messages/';
  hubURL :string = environment.hubURL;
  private hubConnection!:HubConnection;

  private messageReadSource = new BehaviorSubject<Message[]>([]);
  messageRead$ = this.messageReadSource.asObservable();

  constructor(private http: HttpClient) { }

  createHubConnection(user:User,otherUserName:string){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubURL+'message?user='+otherUserName,{
        accessTokenFactory:()=>user.token
      })
      .withAutomaticReconnect()
      .build();
      this.hubConnection.start().catch(err=>console.log(err))

      this.hubConnection.on('ReceivedMessageRead',message=>{
        this.messageReadSource.next(message);
      })
      this.hubConnection.on('NewMessage',message=>{
        this.messageRead$.pipe(take(1)).subscribe(messages=>{
          this.messageReadSource.next([...messages,message])
        })
      })

  }
  stopHubConnection(){
    if(this.hubConnection){
      this.hubConnection.stop();
    }
  }
  getMessages(pageNumber: number, pageSize: number, container: string) {

    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);

    return getPaginatedResult<Message[]>(this.baseURl + 'get-message-for-user', params, this.http)
  }

  getMessageRead(userName:string){
    return this.http.get<Message[]>(this.baseURl+`get-message-read/${userName}`);
  }
  async sendMessage(userName:string,content:string){
    debugger
    return this.hubConnection.invoke('SendMessage',{recipientUserName:userName,content})
    .catch(err=>console.log(err))
  }
  deleteMessage(id:number){
    return this.http.delete(this.baseURl+'delete-message/'+id);
  }
}
