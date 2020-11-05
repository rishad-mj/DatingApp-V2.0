import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesModalsComponent } from 'src/app/Modals/roles-modals/roles-modals.component';
import { User } from 'src/app/Models/User';
import { AccountService } from 'src/app/_Services/account.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users:Partial<User[]>;
  bsModalRef:BsModalRef;

  constructor(private accountService:AccountService,private modalService:BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(){
    this.accountService.getUsersWithroles().subscribe(users =>{
      this.users=users;
    })
  }

  openRolesModal(user:User){
    const config = {
      class:'modal-dialog-centered',
      initialState:{
        user,
        roles:this.gerrolesArray(user)
      }
    };
    this.bsModalRef = this.modalService.show(RolesModalsComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe(value=>{
      const rolesToUpdate={
        roles: [...value.filter(el=>el.checked===true).map(el=>el.name)]
      };

      if(rolesToUpdate){
        this.accountService.updateUserroles(user.name,rolesToUpdate.roles)
        .subscribe(()=>{
          user.roles = [...rolesToUpdate.roles]
        })
      }
    })
  }

  private gerrolesArray(user){
    const roles=[];
    const userRoles=user.roles;

    console.log(userRoles);

    const availableRoles:any[]=[
      {name:'Admin',value:'Admin'},
      {name:'Moderator',value:'Moderator'},
      {name:'Member',value:'Member'}
    ];
    
    availableRoles.forEach(role=>{
      let isMatch=false;
      for(const userRole of userRoles){
        if(role.name == userRole){
          isMatch=true;
          role.checked=true;
          roles.push(role);
          break;
        }
      }

      if(!isMatch){
        role.checked=false;
        roles.push(role);
      }
    })
    console.log(roles);
    return roles;
  }
}
