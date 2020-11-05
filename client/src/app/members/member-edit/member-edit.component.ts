import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { member } from 'src/app/Models/Member';
import { User } from 'src/app/Models/User';
import { AccountService } from 'src/app/_Services/account.service';
import { MembersService } from 'src/app/_Services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('f') editform:NgForm;
  member:member;
  user:User;
  constructor(private accountService:AccountService,
    private memberService:MembersService,private toaster:ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(
      res=>this.user=res
    );
   }

  ngOnInit(): void {

    this.memberService.getMember(this.user.name).subscribe(
      member=>this.member=member
    );
  }
  SaveChanges()
  {
    this.memberService.updateMember(this.member).subscribe(()=>{
      this.toaster.success("Profile updated Sucessfully");
      this.editform.reset(this.member);
    })

  }
}
