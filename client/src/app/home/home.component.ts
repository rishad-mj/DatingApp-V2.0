import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registermode=false;
  // users:any;
  constructor(private Http:HttpClient) { }

  ngOnInit(): void {
    // this.getUsers();
  }

  registerToggle(){
    this.registermode = !this.registermode;
  }

  // getUsers(){
  //   this.Http.get('https://localhost:5001/api/users')
  //   .subscribe(users => this.users=users);
  // }
  cancelReg(event:boolean)
  {
    this.registermode=event;
    console.log('Cancelled!!!');
  }
}
