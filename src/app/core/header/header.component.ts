import { Component, OnInit } from '@angular/core';
import { WeatherapiService } from '../weatherapi.service';
import { fromEvent, throttleTime } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
input:any;
currentRoute:any;
msg = '';
isSmallMobileDevice: MediaQueryList = window.matchMedia("(max-width: 599px)")

  constructor( private router:Router,private service:WeatherapiService) {
  console.log(this.isSmallMobileDevice)
  }
 

  handleSubmit(e:any){
    e.preventDefault();
    this.searchData()
    this.input=''
 
  }

  handleKeyUp(e:any){
    
     if(e.keyCode === 13){
     
        this.handleSubmit(e);
       
     }
  }
  ngOnInit(): void {

 
  }
searchData(){
  this.service.getInput(this.input)
  localStorage.setItem('search',JSON.stringify('clicked'))


  
}


}
