import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements  CanDeactivate<unknown> {
  canDeactivate(component: MemberEditComponent): boolean  {
    if(component.editform.dirty){
      return confirm('Are you sure you want to continue? any unsaved chnages will be lost.');
    }
    return true;
  }
  
}