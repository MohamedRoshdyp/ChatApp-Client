import { Component,OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  members!:Member[];
  constructor(private memberServices:MembersService){}

  ngOnInit(): void {
    this.getMembers()
  }
  getMembers(){
    this.memberServices.getMembers().subscribe({
      next:(res)=>{
        this.members = res;
        // console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
