import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { AlertifyService } from '../services/alertify.service';
import { Message } from '../models/message';
import { Pagination } from '../models/Pagination';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {


  messages!:Message[] | null;
  pagination!:Pagination;
  container:string = 'Outbox';
  pageSize:number=8;
  pageNumber:number=1;
  loading:boolean = false;
  constructor(private messageServices:MessageService,private alert:AlertifyService){}

  ngOnInit(): void {
      this.loadMessages();
  }
  loadMessages(){
    this.loading = true;
    this.messageServices.getMessages(this.pageNumber,this.pageSize,this.container).subscribe(
      {
        next:(res)=>{
            this.messages = res.result
            this.pagination = res.pagniation
            this.loading  = false;
            // console.log(res);
        }
      }
    )
  }
  deleteMessage(id:number){
    this.messageServices.deleteMessage(id).subscribe({
      next:()=>{
        let _index = this.messages?.findIndex(x=>x.id === id);
        if(_index){

          this.messages?.splice(_index,1)
        }
      }
    })
  }
  pageChanged(e:any){
    this.pageNumber = e.page;
    this.loadMessages();
  }
}
