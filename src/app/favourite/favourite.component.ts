import { Component, OnInit } from '@angular/core';
import { WeatherClass } from '../core/weather-class.model';
import { WeatherapiService } from '../core/weatherapi.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  constructor(private service:WeatherapiService) { }
  favData: WeatherClass[]=[]
  RecentData: WeatherClass[]=[]
  data1=[]
  data2:any;
 isLiked:boolean;
 len:any;
  ngOnInit(): void {
    this.data2 =localStorage.getItem('favourite');
    this.favData=JSON.parse(this.data2)
    this.len=this.favData.length
    this.data2 =localStorage.getItem('Recent');
    this.RecentData=JSON.parse(this.data2)
  }
  onHeartClick(i:any){
    this.favData[i].isLiked = ! this.favData[i].isLiked;
   
    for(let j=0;j<this.RecentData.length;j++){
      if(this.favData[i].id==this.RecentData[j].id){
        this.RecentData[j].isLiked=this.favData[i].isLiked
      }
    }
    localStorage.setItem('Recent', JSON.stringify(this.RecentData))
    this.favData.splice(i,1)
    localStorage.setItem('favourite', JSON.stringify(this.favData))
  }
  removeAll(){
    if(confirm('Are you sure  want to remove all the favourites?')){
      localStorage.setItem('favourite',JSON.stringify([]))
    }
  

  }
}
