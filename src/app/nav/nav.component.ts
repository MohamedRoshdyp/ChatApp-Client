import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../models/login';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { environment } from 'src/assets/environments/environment';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  loginForm:FormGroup;
  loggedIn:boolean= false;
  baseSeverURL :string = environment.baseServerURL;

  // currentUser$!:Observable<User | null>;
  constructor(public authServices:AuthService
    ,private fb:FormBuilder
    ,private router:Router
    ,private alert:AlertifyService){
    this.loginForm = fb.group({
      userName:['ali',[Validators.required]],
      password:['Aa@123456',[Validators.required]]
    })
  }

  ngOnInit(): void {
    // this.currentUser$ = this.authServices.currentUser$;
  }
  login(){
    this.authServices.login(this.loginForm.value).subscribe({
      next:(res)=>{
        this.loggedIn = true;
        this.router.navigate(['/member'])
        this.alert.success('login successfly')
        // console.log(res);
      },
      error:(err)=>{
        this.alert.error(`${err.error.status} - ${err.error.title}`)
        console.error(err)
      },
      
    })
  }
 
  logout(){
    this.authServices.logout();
    this.router.navigate(['/'])
    this.loggedIn = false;
    this.alert.warning('loged out !')
  }

}
