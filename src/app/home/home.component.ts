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
  F: any;
  iconid: any;
  isLiked: boolean = false;
  colorValue: any;
  search: any;
  dateTime = new Date();
  subscription: any;
  constructor(private service: WeatherapiService) {}
  ngOnInit(): void {
  
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
      this.createModel(this.weatherResponseObject);
      this.isFavCity(this.weatherModel);

      let res = localStorage.getItem('search')?.replace(/"/g, '');

      if (res == 'clicked') {
       
        this.service.storeRecentData(this.weatherModel);
      }
    });
  }
  getCurrentLocationData() {
    navigator.geolocation.getCurrentPosition((success) => {
      this.lat = success.coords.latitude;
      this.lon = success.coords.longitude;

      this.service
        .getWeatherDataByCoords(this.lat, this.lon)
        .subscribe((data: any) => {
          this.weatherResponseObject = data;
          this.createModel(this.weatherResponseObject);
          this.isFavCity(this.weatherModel);
          this.tmin = Math.floor(this.weatherResponseObject.main.temp_min);
          this.tmax = Math.floor(this.weatherResponseObject.main.temp_max);
          this.C = Math.floor(this.weatherResponseObject.main.temp);
          this.F = Math.floor(this.C * (9 / 5) + 32);
        });
    });
  }

  createModel(weatherResponseObject: any) {
    this.weatherModel = new WeatherClass(
      weatherResponseObject.weather[0].id,
      weatherResponseObject.name,
      weatherResponseObject.sys.country,
      weatherResponseObject.weather[0].icon,
      Math.floor(weatherResponseObject.main.temp),
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
  }
  onClickbutton1() {
    this.c = true;
    this.colorValue = !this.colorValue;
  }

  onClickbutton2() {
    this.c = false;
    this.colorValue = !this.colorValue;
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
