import { Component, OnInit } from '@angular/core';
import { WeatherapiService } from '../weatherapi.service';





@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  dateTime = new Date()
  currentRoute:any;
 constructor(private service:WeatherapiService){}

  ngOnInit(): void {
    setInterval(()=>{
      this.dateTime = new Date();
    },60000);
  
  }

}
