import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherapiService } from '../core/weatherapi.service';
import { WeatherClass } from '../core/weather-class.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  lat: any;
  lon: any;
  weatherResponseObject: any;
  weatherModel: any;
  C: any;
  c: any;
  tmin: any;
  tmax: any;
  tminf:any;
  tmaxf:any;
  F: any;
  iconid: any;
  isLiked: boolean = false;
  colorValue: any;
  search: any;
  dateTime = new Date();
  subscription: any;
  TempC:any;
  Tempb:any;
  constructor(private service: WeatherapiService) {}
  ngOnInit(): void {
    this.service.C.subscribe(value=>{
      this.Tempb=value;
      this.TempC=value;
    })
    if(this.TempC==true){
      this.onClickbutton1()
      this.colorValue=true
    }
    else{
  
      this.onClickbutton2()
      this.colorValue=false  
    }
    setInterval(() => {
      this.dateTime = new Date();
    }, 60000);

    if (localStorage.getItem('favourite') == null) {
      localStorage.setItem('favourite', JSON.stringify([]));
    }
    if (localStorage.getItem('Recent') == null) {
      localStorage.setItem('Recent', JSON.stringify([]));
    }

   this.subscription= this.service.searchKey.subscribe((value) => {
      this.search = value;
      if(this.search!==null){
        this.searchWeatherOfCity();
      
       }
        else{
          this.getCurrentLocationData();
        }
    }); 
  }

  searchWeatherOfCity() {
    this.service.getWeatherDataByCityname(this.search).subscribe((data) => {
      this.isLiked = false;
      this.weatherResponseObject = data;
      this.convertCtoF()
      this.createModel(this.weatherResponseObject);
      this.isFavCity(this.weatherModel);
      let res = localStorage.getItem('search')?.replace(/"/g, '');
      if (res == 'clicked') {
           this.service.storeRecentData(this.weatherModel);
      }
    }
    ,(err:any)=>{
      alert(err)
    }
    );
  }
  convertCtoF(){
    this.C = Math.floor(this.weatherResponseObject.main.temp);
    this.F = Math.floor(this.C * (9 / 5) + 32);
    this.tmin = Math.floor(this.weatherResponseObject.main.temp_min);
     this.tmax = Math.floor(this.weatherResponseObject.main.temp_max); 
     this.tminf=Math.floor(this.tmin * (9 / 5) + 32);
     this.tmaxf=Math.floor(this.tmax * (9 / 5) + 32);
  }
  getCurrentLocationData() {
    navigator.geolocation.getCurrentPosition((success) => {
      this.lat = success.coords.latitude;
      this.lon = success.coords.longitude;

      this.service
        .getWeatherDataByCoords(this.lat, this.lon)
        .subscribe((data: any) => {
          this.weatherResponseObject = data;
          this.convertCtoF()
          this.createModel(this.weatherResponseObject);
          this.isFavCity(this.weatherModel);
        
        });
    });
  }

  createModel(weatherResponseObject: any) {
    this.weatherModel = new WeatherClass(
      weatherResponseObject.id,
      weatherResponseObject.name,
      weatherResponseObject.sys.country,
      weatherResponseObject.weather[0].icon,
      Math.floor(weatherResponseObject.main.temp),
      Math.floor(Math.floor(this.weatherResponseObject.main.temp) * (9 / 5) + 32),
      weatherResponseObject.weather[0].description,
      this.isLiked
    );
  }

  isFavCity(weatherModel: WeatherClass) {
   
    this.isLiked = this.service.isFavourityCity(weatherModel);

    if (this.isLiked == true) {
      this.weatherModel.isLiked = true;
    }
  }
  onHeartClick() {
    this.isLiked = !this.isLiked;
    this.createModel(this.weatherResponseObject);

    this.service.storeFavData(this.weatherModel, this.isLiked);
    this.service.updateFavInRecentData(this.isLiked);
    if(this.isLiked==true){
      document.getElementById('heart')!.style.color="#FAD05B";
    }
    else{
      document.getElementById('heart')!.style.color="white";
    }

  }
  onClickbutton1() {
    this.TempC = true;
    this.colorValue = !this.colorValue;
    this.service.temperatureUnitC(this.TempC);
  }

  onClickbutton2() {
    this.TempC = false;
    this.colorValue = !this.colorValue;
    
    this.service.temperatureUnitC(this.TempC);
  }
  getCss() {
    return this.colorValue ? 'white' : 'transparent';
  }

  getCsss() {
    return this.colorValue ? 'transparent' : 'white';
  }

  getColor() {
    return this.colorValue ? 'red' : 'white';
  }

  getColorr() {
    return this.colorValue ? 'white' : 'red';
  }

  getValueCss() {
    return { 'background-color': this.getCss(), color: this.getColor() };
  }

  getCssss() {
    return { 'background-color': this.getCsss(), color: this.getColorr() };
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
