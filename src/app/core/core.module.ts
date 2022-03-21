import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonInterceptor } from './common.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers:[{
    provide:HTTP_INTERCEPTORS, useClass:CommonInterceptor,multi:true
  }],
 
  exports:[
    HeaderComponent,
    NavigationComponent 

  ],
  // providers:[{
  //  {provide:}
  // }]
})
export class CoreModule { }
