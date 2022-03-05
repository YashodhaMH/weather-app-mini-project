import { Injectable } from '@angular/core';
import { BehaviorSubject , Subject} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WeatherClass } from './weather-class.model';


@Injectable({
  providedIn: 'root'
})
export class WeatherapiService {
  url = 'https://api.openweathermap.org/data/2.5/weather';
 
   apikey='d64d4cab622e7edf3c5288cbab73379e';
   recentData: WeatherClass[]=[]
   isFav:any;
   favData: WeatherClass[]=[]
   data1:any=[]
   data2:any;
   CurrentCityData:any;
   searchKey=new BehaviorSubject(null);
   Route=new BehaviorSubject('home');
  isLiked=false;
  weatherModel:WeatherClass
  d:any;
   constructor( private http: HttpClient){}
  

   getInput(  searchKey:any){
    this. searchKey.next(searchKey)
    }
   getWeatherDataByCoords(lat:any, lon:any){

    let params = new HttpParams()
    .set("lat", lat)
    .set("lon", lon)
    .set("units", 'metric')
    .set("appid", this.apikey)
  

  return this.http.get(this.url, {params});
   
  }
  getWeatherDataByCityname(city:any){
 console.log(city)
    let params = new HttpParams()
    
    .set("q", city)
    .set("units", 'metric')
    .set("appid", this.apikey)
    
    return this.http.get(this.url, {params});
  }
  isFavourityCity(data:WeatherClass){
      this.data2 =localStorage.getItem('favourite');
    this.data1=JSON.parse(this.data2)
    console.log(this.data1)
    let fav:any;
    for (let j = 0; j < this.data1.length; j++) {
  if(data.id==this.data1[j].id && data.name==this.data1[j].name){
    
   
    fav=true;
     this.data1[j].isLiked=true;
     localStorage.setItem('favourite',JSON.stringify(this.data1))
  }
  
    }
  
  return fav

  }
 

  storeRecentData(data:WeatherClass){
  
  this.data2 =localStorage.getItem('Recent');
  this.data1=JSON.parse(this.data2)
  if(this.data1 !== null){
    this.recentData=this.data1
  }
  this.recentData.push(data)
  console.log(data)
   localStorage.setItem("Recent",JSON.stringify(this.recentData))

}
  storeFavData(data:WeatherClass,isLiked:boolean){
    this.data2 =localStorage.getItem('favourite');
    this.data1=JSON.parse(this.data2)
    if(this.data1 !== null){
      this.favData=this.data1
    }
    if(isLiked==true){
      this.favData.push(data)
      localStorage.setItem("favourite",JSON.stringify(this.favData))
    }
    else if(isLiked==false){
      this.favData.pop()
      localStorage.setItem("favourite",JSON.stringify(this.favData))
    }
  
  }
    

 
  updateFavInRecentData(isLiked:boolean){
    console.log(isLiked)
    this.data2 =localStorage.getItem('Recent');
      this.data1=JSON.parse(this.data2)
      if(this.data1 !== null){
        this.recentData=this.data1
      }
     let len=this.recentData.length
     this.recentData[len-1].isLiked=isLiked;
     localStorage.setItem("Recent",JSON.stringify(this.recentData))
}
  
}
