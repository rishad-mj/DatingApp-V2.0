import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_Services/account.service';
import { User } from '../Models/User';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountservice:AccountService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let curentUser:User;
    this.accountservice.currentUser$.pipe(take(1)).subscribe(user=> curentUser=user);
    if(curentUser){
      request=request.clone({
        setHeaders:{
          Authorization: 'Bearer '+curentUser.token
        }
      })
    }

    return next.handle(request);
  }
}
