import { Component, OnInit } from '@angular/core';
import { WeatherClass } from '../core/weather-class.model';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.css'],
})
export class RecentSearchComponent implements OnInit {
  constructor() {}
  RecentData: WeatherClass[] = [];
  FavData: WeatherClass[] = [];
  data1 = [];
  data2: any;
  isLiked: boolean;
  len:any;
  ngOnInit(): void {
    localStorage.setItem('search',JSON.stringify('unclicked'))
    this.data2 = localStorage.getItem('Recent');
    this.RecentData = JSON.parse(this.data2);
   
    this.len=this.RecentData.length
    this.data2 = localStorage.getItem('favourite');
    this.FavData = JSON.parse(this.data2);
  }
  onHeartClick(i: any) {
    this.RecentData[i].isLiked = !this.RecentData[i].isLiked;
    for (let j = 0; j < this.RecentData.length; j++) {
      if (this.RecentData[i].id == this.RecentData[j].id && this.RecentData[i].name == this.RecentData[j].name ) {
        this.RecentData[j].isLiked = this.RecentData[i].isLiked;
        localStorage.setItem('Recent', JSON.stringify(this.RecentData));
      }
    }
    if (this.RecentData[i].isLiked == true) {
    
      this.FavData = this.FavData || [];
      this.FavData.push(this.RecentData[i]);
    
    } 
    else {
      for (let j = 0; j < this.FavData.length; j++) {
        if (this.RecentData[i].id == this.FavData[j].id) {
          this.FavData.splice(j, 1);
        }
      }
    }
    localStorage.setItem('favourite', JSON.stringify(this.FavData));

    
  }
  removeAll(){
    if(confirm('Are you sure  want to remove all the favourites?')){
      localStorage.setItem('Recent',JSON.stringify([]))
    }
  }
}
