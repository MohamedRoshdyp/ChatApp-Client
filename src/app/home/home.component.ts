import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  registerMode:boolean = false;


  constructor() {
   
  }

  RegisterTogle(){
    this.registerMode = !this.registerMode;
  }
  cancelRegisterMode(e:boolean){
    this.registerMode = e;
  }
}
