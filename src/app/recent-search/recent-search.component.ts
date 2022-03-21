import { Component, OnDestroy, OnInit } from '@angular/core';

import { WeatherClass } from '../core/weather-class.model';
import { WeatherapiService } from '../core/weatherapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',

  styleUrls: ['./recent-search.component.css'],
})
export class RecentSearchComponent implements OnInit, OnDestroy {
  RecentData: WeatherClass[] = [];
  FavData: WeatherClass[] = [];
  data1 = [];
  data2: any;
  isLiked: boolean;
  len: any;
  TempC: any;
  f: any;
  subscription: any;
  constructor(private service: WeatherapiService, private router: Router) {}
  ngOnInit(): void {
    this.subscription = this.service.C.subscribe((value) => {
      this.TempC = value;
    });

    localStorage.setItem('search', JSON.stringify('unclicked'));
    this.data2 = localStorage.getItem('Recent');
    this.RecentData = JSON.parse(this.data2).reverse();
    this.len = this.RecentData.length;
    this.data2 = localStorage.getItem('favourite');
    this.FavData = JSON.parse(this.data2);
  }
  onHeartClick(i: any) {
    this.RecentData[i].isLiked = !this.RecentData[i].isLiked;
    this.RecentData = this.RecentData.map((currentValue) => {
    if ( currentValue.id == this.RecentData[i].id && currentValue.name == this.RecentData[i].name) {
        currentValue.isLiked = this.RecentData[i].isLiked;
      }
      return currentValue;
    });
    localStorage.setItem('Recent', JSON.stringify(this.RecentData));

    if (this.RecentData[i].isLiked == true) {
      this.FavData = this.FavData || [];
      this.FavData.push(this.RecentData[i]);
    } else {
      this.FavData = this.FavData.filter((currentValue) => {
        return this.RecentData[i].id !== currentValue.id;
      });
    }
    localStorage.setItem('favourite', JSON.stringify(this.FavData));
  }
  removeAll() {
    localStorage.removeItem('Recent');
  }
  searchCity(searchKey: any) {
    this.service.getInput(searchKey);
    this.router.navigate(['home']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
