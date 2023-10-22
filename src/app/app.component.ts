import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/login';
import { PresenceService } from './services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'client';
  constructor(private authServices: AuthService,private presenceServices:PresenceService) {

  }
  ngOnInit(): void {
    this.setCurrentUser();
  }


  setCurrentUser() {
    const lsUser = localStorage.getItem('user');
    if (lsUser) {

      const user: User = JSON.parse(lsUser);
      this.authServices.setCurrentUser(user)
      this.presenceServices.createHubConnection(user);
    }
  }


}
