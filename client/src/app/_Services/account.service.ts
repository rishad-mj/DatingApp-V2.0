import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../Models/User';
import { UserParams } from '../Models/userParam';


//Services are singleton this will stay alive till applications are closed
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  userRoles:Partial<User[]>;
  // inject http
  constructor(private http:HttpClient) {  }

    login(model:any){
      return this.http.post(this.baseUrl+'account/login',model).pipe(
      map((response:User)=>{
          const user=response;
          if(user)
          {
            localStorage.setItem('user',JSON.stringify(user));
            this.setCurrentUser(user);
            this.currentUserSource.next(user);
          }
        }))
    }

    register(model:any)
    {
    return this.http.post(this.baseUrl+'Account/register',model).pipe(
      map((user: User) => {
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
    }

    setCurrentUser(user:User){
      user.roles = [];
      const roles = this.getDecodedToken(user.token).role;
      Array.isArray(roles) ? user.roles= roles: user.roles.push(roles);
      localStorage.setItem('user',JSON.stringify(user));
      this.currentUserSource.next(user);

    }

    logout(){
      localStorage.removeItem('user');
      this.currentUserSource.next(null);
    }

    getDecodedToken(token:string){
    console.log(JSON.parse(atob(token.split('.')[1])));
    return JSON.parse(atob(token.split('.')[1]))

    }

    getUsersWithroles(){
      return this.http.get<Partial<User[]>>(this.baseUrl + 'admin/users-with-roles');
    }

    updateUserroles(userName:string,roles:string[]){
      return this.http.post(this.baseUrl + 'admin/edit-roles/'+userName+'?roles='+ roles,{})
    }

}
