import { Component, Input } from '@angular/core';
import { Member } from 'src/app/models/member';
import { environment } from 'src/assets/environments/environment';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent {

  @Input() member!:Member;
  baseSeverURL :string = environment.baseServerURL;

  constructor(){}

}
