import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { AccountService } from '../_Services/account.service';

@Component({
  selector: 'navbar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any ={};

  constructor(public accountService:AccountService,
    private router:Router,private toastr:ToastrService) { 

  }

  ngOnInit(): void {

  }

  login()
  {
    this.accountService.login(this.model).subscribe(
      response=>{
        this.router.navigateByUrl('/members');
      }
    );
  }

  logout(){

    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
