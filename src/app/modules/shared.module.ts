import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule } from "ngx-timeago";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    NgxGalleryModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot()
  ],
  exports:[
    TabsModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    BsDatepickerModule,
    PaginationModule,
    ButtonsModule,
    TimeagoModule
  ]
})
export class SharedModule { }
