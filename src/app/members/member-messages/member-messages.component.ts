import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {

  @ViewChild('messageForm') messageForm!: NgForm;

  @Input() messages!: Message[];
  @Input() userName!: string;
  messageContent!: string;
  constructor(public messageServices: MessageService) { }
  ngOnInit(): void {
  }
  sendMessage() {
    this.messageServices.sendMessage(this.userName, this.messageContent).then(()=>{
      this.messageForm.reset();
    })
  }

}
