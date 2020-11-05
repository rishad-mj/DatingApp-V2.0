import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { member } from 'src/app/Models/Member';
import { Pagination } from 'src/app/Models/Pagination';
import { User } from 'src/app/Models/User';
import { UserParams } from 'src/app/Models/userParam';
import { AccountService } from 'src/app/_Services/account.service';
import { MembersService } from 'src/app/_Services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  // members$:Observable<member[]>;
  members :member[];
  pagination:Pagination;
  userparam:UserParams;
  user:User;
  genderList=[{value:'male',display:'Males'},{value:'female',display:'Female'}];

  constructor(private memberservice:MembersService,private accountService:AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>{
      this.user = user;
      this.userparam = new UserParams(user);
    }) 
   }

  ngOnInit(): void {
    this.loadmembers();
  }

  loadmembers(){
    this.memberservice.getMembers(this.userparam).subscribe(
        response=>{
          this.members = response.results;
          this.pagination=response.pagination;
        }
    )
  }

  resetfilters(){
    this.userparam=new UserParams(this.user);
    this.loadmembers();
  }

  pageChanged(event:any)
  {
    this.userparam.pageNumber = event.page;
    this.loadmembers();
  }

}
