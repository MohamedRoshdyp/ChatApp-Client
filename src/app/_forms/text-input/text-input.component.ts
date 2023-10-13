import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements ControlValueAccessor {

  @Input() lable!:string;
  @Input() type = 'text';

  constructor(@Self() public ngControl:NgControl){
    if(this.ngControl){

      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(obj: any): void {

  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }


}
