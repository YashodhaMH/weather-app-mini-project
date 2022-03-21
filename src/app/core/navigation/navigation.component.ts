import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  dateTime = new Date()
 constructor(){}

  ngOnInit(): void {
    setInterval(()=>{
      this.dateTime = new Date();
    },60000);
  
  }

}
