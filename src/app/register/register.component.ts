import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter<boolean>();
  registerForm:FormGroup;
  constructor(public authServices:AuthService,private fb:FormBuilder
    ,private router:Router,private alert:AlertifyService) {
    this.registerForm = this.fb.group({
      userName:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
  register(){
    this.authServices.register(this.registerForm.value).subscribe({
      next:(res)=>{
        // console.log(res);
        this.alert.success('register success');
        this.cancel();
        this.router.navigate(['/member'])

      },
      error:(err)=>{
        this.alert.error(err.error[0])
        console.log(err);
      }
    })
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
