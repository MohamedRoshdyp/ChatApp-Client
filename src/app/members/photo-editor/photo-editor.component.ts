import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Photo } from 'src/app/models/Photo';
import { User } from 'src/app/models/login';
import { Member } from 'src/app/models/member';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member!: Member;
  selectdFile!: File;
  currentUserImage!: string | ArrayBuffer | null;
  user!: any;
  @ViewChild('photoMember') memberProfilePhoto!: ElementRef;
  constructor(private memberServices: MembersService, private alert: AlertifyService
    , private fb: FormBuilder, private authServices: AuthService
  ) {

    this.authServices.currentUser$.pipe(take(1)).subscribe(user => this.user = user)

  }
  ngOnInit(): void {
    this.getMember();
  }
  getMember() {
    const user = this.user;
    if (user) {

      this.memberServices.getMember(user.userName).subscribe({
        next: (res) => {
          this.member = res;
        }
      })
    }
  }
  onSubmit() {
    const formData = new FormData();
    if (this.selectdFile) {
      formData.append('file', this.selectdFile, this.selectdFile.name);

    }
    this.memberServices.uploadMemberPhoto(formData).subscribe({
      next: (res) => {
        this.alert.success('upload user profile image sucssfully')
        this.reset();
        this.getMember()
        console.log(res);
      }, error: (err) => {
        this.alert.warning(err.message)

        console.log(err);
      }
    })
  }
  onFileSelected(event: any) {
    this.selectdFile = event.target.files[0]
    if (this.selectdFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.currentUserImage = e.target.result
      }
      reader.readAsDataURL(this.selectdFile)

    }
    else {
      this.currentUserImage = null;
    }
  }
  reset() {
    this.memberProfilePhoto.nativeElement.value = '';
    this.currentUserImage = null;
  }
  removeItem(id: number) {
    this.memberServices.removeMemberPhoto(id).subscribe({
      next: (res) => {
        this.getMember();
        this.alert.success('removed imaged Successflly');

      },
      error: (err) => {
        this.alert.error(err.error)
        console.log(err);
      }
    })
  }
  setMainPhoto(photo: Photo) {
    this.memberServices.setMainPhoto(photo.id).subscribe({
      next: (res) => {
        if (res) {
          this.user.photoUrl = photo.url;
          this.authServices.setCurrentUser(this.user)
          this.member.photoUrl = photo.url;
          this.member.photos.forEach(p=>{
            if(p.isMain) p.isMain = false;
            if(p.id === photo.id) p.isMain = true;
          })

          this.alert.success('set main photo sussfully')
        }
      },
      error: (err) => {
        this.alert.error(err.error)
        console.log(err);
      }
    })
  }
}
