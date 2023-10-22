import { Component,OnDestroy,OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { environment } from 'src/assets/environments/environment';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';
import { PresenceService } from 'src/app/services/presence.service';
import { User } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs';
@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit,OnDestroy  {

  @ViewChild('memberTabs',{static:true}) memberTabs!:TabsetComponent;

  member!:Member;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  baseSeverURL :string = environment.baseServerURL;
  activeTab!:TabDirective;
  messages:Message[] = [];
  user!:User;
  constructor(public presence:PresenceService,private activatedRoute:ActivatedRoute,
    private messageServices:MessageService,private authServices:AuthService){
      this.authServices.currentUser$.pipe(take(1)).subscribe(user=>{
        if(user){
          this.user =user
        }
      })
    }
  ngOnInit(): void {
   
    this.activatedRoute.data.subscribe({
      next:(res:any)=>{
        this.member = res.member
        this.galleryImages = this.getImages();
        
      }
    })
    this.activatedRoute.queryParams.subscribe({
      next:(res:any)=>{
        res.tab ? this.selectTab(res.tab):this.selectTab(0)
      }
    })
    // this.loadMember();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent:100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview:true
      }
    ]
   
  }
  getImages():NgxGalleryImage[]{
    const imageUrls = [];
    for(const photo of this.member.photos){
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }
  // loadMember(){
  //   let currentURL =this.activatedRoute.snapshot.paramMap.get('userName');
  //   if(currentURL){
  //     this.memberServices.getMember(currentURL)
  //     .subscribe({
  //       next:(res)=>{
  //         if(res){ 
  //           this.member = res
  //           this.galleryImages = this.getImages();
  //         }
  //       }
  //     })
  //   }
    
  // }

  loadMessages() {
    this.messageServices.getMessageRead(this.member.userName).subscribe({
      next: (res) => {
        this.messages = res
        console.log(res);
      }
    }
    )
  }

  onTabActivator(data:TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading ==='Messages' && this.messages.length ===0){
      // this.loadMessages();
      this.messageServices.createHubConnection(this.user,this.member.userName)
    }
    else{
      this.messageServices.stopHubConnection();
    }
  }
  selectTab(tabId:number){
    this.memberTabs.tabs[tabId].active = true;
  }
  ngOnDestroy(): void {
    this.messageServices.stopHubConnection();
    
  }

}
