import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
// import { MatButtonModule } from '@angular/material/Button';
// import {MatButtonToggleModule} from '@angular/material/button-toggle';
// import { MatButtonToggleGroup } from '@angular/material/button-toggle';


// import { MatButtonModule } from '@angular/material/Button';
// import {MatButtonToggleModule} from '@angular/material/button-toggle'


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
   
    // MatButtonToggleGroup,
    // MatButtonModule 


    // MatButtonToggleGroup
  ]
})
export class HomeModule { }
