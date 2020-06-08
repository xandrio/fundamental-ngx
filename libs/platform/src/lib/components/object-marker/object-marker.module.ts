import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectMarkerComponent } from './object-marker.component';
import { ObjectStatusModule } from '@fundamental-ngx/core';


@NgModule({
  declarations: [ObjectMarkerComponent],
  imports: [
    CommonModule,
    ObjectStatusModule
  ],
  exports: [
    ObjectMarkerComponent
  ]
})
export class PlatformObjectMarkerModule { }
