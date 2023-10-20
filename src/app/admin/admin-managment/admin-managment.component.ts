import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalsComponent } from 'src/app/modals/roles-modals/roles-modals.component';
import { User } from 'src/app/models/login';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-managment',
  templateUrl: './admin-managment.component.html',
  styleUrls: ['./admin-managment.component.scss']
})
export class AdminManagmentComponent implements OnInit {

  users:Partial<User[]> = [];
  bsModalRef?: BsModalRef;
  constructor(private adminServices:AdminService
    ,private modalService:BsModalService){

  }
  ngOnInit(): void {
   this.getUersWithRoles();
  }
  getUersWithRoles(){
    this.adminServices.getUsersWithRoles().subscribe({
      next:(res)=>{
        if(res){
          this.users = res;
        }
      }
    })
  }
  openRolesModal(user:User){
    const config =  {
      class :'modal-dialog-centerd',
      initialState: {
        user,
        roles:this.getRolesArray(user)
      }
    };
    this.bsModalRef = this.modalService.show(RolesModalsComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe({
      next:(values:any)=>{
        const roleToUpdate = {
          roles: [...values.filter((x:any)=>x.checked === true).map((x:any)=>x.name)]
        }
        if(roleToUpdate){
          this.adminServices.updateUserRoles(user.userName,roleToUpdate.roles).subscribe({
            next:()=>{
              user.roles = [...roleToUpdate.roles]
            }
          })
        }
      }
    })
  //  this.modalRef =  this.modalServices.show(RolesModalsComponent);
  }
  private getRolesArray(user:User){
    const roles:any[] = [];
    const userRoles = user.roles;
    const avilableRoels:any[] = [
      {name:'Admin',value:'Admin'},
      {name:'Moderator',value:'Moderator'},
      {name:'Member',value:'Member'},
    ]
    avilableRoels.forEach(element => {
      let isMatch = false;
      for(const _userRole of userRoles){
        if(element.name === _userRole){
          isMatch = true;
          element.checked = true;
          roles.push(element);
          break;
        }
      }
      if(!isMatch){
        element.checked = false;
        roles.push(element);
      }
    });
    return roles;
  }
}
