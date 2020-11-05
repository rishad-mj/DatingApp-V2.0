import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './Models/User';
import { AccountService } from './_Services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  users:any;
  constructor(private http:HttpClient,private accountService:AccountService) {
    
  }

  setCurrentUser(){
    const user: User =JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  ngOnInit(): void {
   this.setCurrentUser();
  //  this.getUsers();
  }

  // getUsers()
  // {
  //     this.http.get('https://localhost:5001/api/users')
  //         .subscribe( response=> {
  //           this.users =response;
  //           console.log(response);
  //         },
  //           error=>{console.log(error);}) 
  // }
}
