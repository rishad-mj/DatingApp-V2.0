import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserParams } from '../Models/userParam';
import { AccountService } from '../_Services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private accountService:AccountService,private toaster:ToastrService) {

  }
  
  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user =>{
        if(user && user.roles)
        {
          if(user.roles.includes('Admin') || user.roles.includes('Moderator'))
          return true;
        }
        this.toaster.error('You cannot enter this area');
      })
    );
  }
  
}
