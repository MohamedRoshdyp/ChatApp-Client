import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { User } from 'src/app/models/login';
import { Member } from 'src/app/models/member';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {

  user!: User; //to send the member to get current user value
  member!: Member;
  editMemberForm:FormGroup;

  @HostListener('window:beforeunload',['$event'])
    unLoadNotification($event:any){
      if(this.editMemberForm.dirty){
        $event.returnValue = true;
      }
    }

  constructor(private authService: AuthService, private memberServices: MembersService
    ,private fb:FormBuilder,private alert:AlertifyService) {
    this.authService.currentUser$.pipe(take(1)).subscribe({
      next: (res) => {
        if (res) {
          this.user = res;
        }
      }
    })
    this.editMemberForm = this.fb.group({
      introduction:['',[Validators.required]],
      lookingFor:['',[Validators.required]],
      city:['',[Validators.required]],
      country:['',[Validators.required]],
      interests:['',[Validators.required]],     
    })
   
  }
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberServices.getMember(this.user.userName).subscribe({
      next: (res) => {
        this.member = res;
        this.editMemberForm.setValue({
          introduction:this.member.introduction,
          lookingFor:this.member.lookingFor,
          city:this.member.city,
          country:this.member.country,
          interests:this.member.interests
        })
      }
    })
  }
  onSubmit(){
    this.memberServices.updateMember(this.editMemberForm.value).subscribe({
      next:(res)=>{
        this.editMemberForm.reset(this.member)
        this.loadMember();
        this.alert.success('updated Succssfully')
        console.log(res);
      },
      error:(err)=>{
        this.alert.error(err.message)
        console.log(err);
      }
    })
  }
}
