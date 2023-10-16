import { Component,OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Pagination } from 'src/app/models/Pagination';
import { User } from 'src/app/models/login';
import { Member } from 'src/app/models/member';
import { UserParams } from 'src/app/models/userParams';
import { AuthService } from 'src/app/services/auth.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  members!:Member[] | null;
  pagniation!:Pagination;
  user!:User;
  userParams!:UserParams;
  genderList = [
    {key:'male',value:'Males'},
    {key:'female',value:'Females'},
  ]
  constructor(private memberServices:MembersService){
    this.userParams = this.memberServices.getUserParams();;
  }

  ngOnInit(): void {
    this.getMembers()
  }
  getMembers(){
    this.memberServices.setUserParams(this.userParams);
    this.memberServices.getMembers(this.userParams).subscribe({
      next:(res)=>{
        this.members = res.result;
        this.pagniation = res.pagniation
        // console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  pageChanged(event:any){
    this.userParams.pageNumber = event.page;
    this.memberServices.setUserParams(this.userParams);
    this.getMembers();
  }
  restFiters(){
    this.userParams =  this.memberServices.resetUserPrams();
    // this.userParams = new UserParams(this.user);
    this.getMembers();
  }
}
