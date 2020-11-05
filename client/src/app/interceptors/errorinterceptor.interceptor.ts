import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorinterceptorInterceptor implements HttpInterceptor {

  constructor(private router:Router,private toaster:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error =>{
        if(error)
        {
          switch(error.status){
            case 400:
              if(error.error.errors){
                const modalStateErrors=[];
                for (const key in error.error.errors) {
                  if(error.error.errors[key])
                  modalStateErrors.push(error.error.errors[key])
                }
                throw modalStateErrors;
              } else {
                this.toaster.error(error.statustext,error.status);
              }
             break;
              case 401:
                this.toaster.error(error.statustext,error.status)
                break;
              case 404:
                  this.router.navigateByUrl('/not-found');
                  break;
              case 500:
                 this.router.navigateByUrl('/server-error');
                    break;   
             default:
               this.toaster.error('Something unexpected went wrong');
               break;
          }
        }
        return throwError(error);
      })
    );
  }
}
