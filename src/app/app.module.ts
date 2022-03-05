import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from './core/core.module';
import { WeatherapiService } from './core/weatherapi.service';
import { HttpClientModule } from '@angular/common/http';
// import { MatButtonModule } from '@angular/material/Button';
// import {MatButtonToggleModule} from '@angular/material/button-toggle';
// import { MatButtonToggleGroup } from '@angular/material/button-toggle';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    CoreModule,
    HttpClientModule,
    CommonModule
    // FontAwesomeModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    // MatButtonToggleGroup,
    // BrowserAnimationsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [WeatherapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
