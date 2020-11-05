import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements ControlValueAccessor,OnInit {
@Input() label:string;
@Input() maxDate:Date;
@Input() format:string; //default format
bsConfig: Partial<BsDatepickerConfig>;

  constructor(@Self() public ngControl:NgControl) {
    this.ngControl.valueAccessor=this;
    this.bsConfig={
      containerClass:'theme-red'
      // dateInputFormat: 'DD MMMM YYYY',
    }
   }
  ngOnInit(): void {
    this.bsConfig={
      containerClass:'theme-red',
      dateInputFormat: this.format//'DD MMMM YYYY',
    }
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

}
