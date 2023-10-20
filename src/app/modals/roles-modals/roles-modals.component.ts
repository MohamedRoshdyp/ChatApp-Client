import { Component, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/login';

@Component({
  selector: 'app-roles-modals',
  templateUrl: './roles-modals.component.html',
  styleUrls: ['./roles-modals.component.scss']
})
export class RolesModalsComponent {


  @Input() updateSelectedRoles = new EventEmitter();
  user!:User;
  roles!:any[];

  constructor(public bsModalRef:BsModalRef){}

  updateRoles(){
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }

}
