import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    NgxGalleryModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
  ],
  exports:[
    TabsModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    BsDatepickerModule
  ]
})
export class SharedModule { }
