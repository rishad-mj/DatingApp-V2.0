import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../Models/User';
import { AccountService } from '../_Services/account.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
// model:any={};
registerForm:FormGroup;
maxDate:Date;
validationErrors :String[]=[];

// @Input() usersFromHome :User
@Output() cancelRegister = new EventEmitter();
  constructor(private accountService:AccountService,private toastr :ToastrService,
    private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.initform();
    this.maxDate=new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);

  }
  initform(){
    this.registerForm = this.fb.group({
      gender:['male'],
      name:['',Validators.required],
      knownAs:['',Validators.required],
      dateOfBirth:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword:['',[Validators.required,this.matchValues('password')]]
    })
  }

  matchValues(matchTo:string):ValidatorFn{
    return (control:AbstractControl) =>{
      return control?.value===control?.parent?.controls[matchTo].value?null:{isMatching:true}
    }
  }

  register(){
    this.accountService.register(this.registerForm.value).subscribe(response=>{
      this.router.navigateByUrl('/members');
    }, error =>{
    this.validationErrors=error;
    })
  }
  cancel(){
    this.cancelRegister.emit(false);
  }

}