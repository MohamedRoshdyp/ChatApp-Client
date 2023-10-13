import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup,FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<boolean>();
  registerForm:FormGroup;
  maxDate!:Date;


  constructor(public authServices:AuthService,private fb:FormBuilder
    ,private router:Router,private alert:AlertifyService) {
    this.registerForm = this.fb.group({
      gender:['male'],
      knownAs:['',[Validators.required,Validators.maxLength(5),Validators.minLength(3)]],
      dateOfBirth:['',[Validators.required]],
      country:['',[Validators.required]],
      city:['',[Validators.required]],
      userName:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPasswrod:['',[Validators.required,this.matchValues('password')]]
    })
  }
  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-15)
  }

  matchValues(matchTo:string):ValidatorFn{
    return(control:AbstractControl | any) =>{
      return control?.value === control?.parent?.controls[matchTo].value
      ? null :{isMatching:true}
    }
  }
  get _userName(){
    return this.registerForm.get('userName')
  }
  get _email(){
    return this.registerForm.get('email')
  }
  get _password(){
    return this.registerForm.get('password')
  }
  get _confirmPasswrod(){
    return this.registerForm.get('confirmPasswrod')

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
