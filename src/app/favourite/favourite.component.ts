import { Component, OnInit } from '@angular/core';
import { WeatherClass } from '../core/weather-class.model';
import { WeatherapiService } from '../core/weatherapi.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  constructor(private service: WeatherapiService, private router: Router) { }
  favData: WeatherClass[] = []
  RecentData: WeatherClass[] = []
  data1 = []
  data2: any;
  isLiked: boolean;
  len: any;
  subscription: any;
  TempC: any;
  ngOnInit(): void {
    this.subscription = this.service.C.subscribe(value => {
      this.TempC = value;
    })
    this.data2 = localStorage.getItem('favourite');
    this.favData = (JSON.parse(this.data2)).reverse();
    this.len = this.favData.length
    this.data2 = localStorage.getItem('Recent');
    this.RecentData = JSON.parse(this.data2)
  }
  onHeartClick(i: any) {
    this.favData[i].isLiked = !this.favData[i].isLiked;
    for (let j = 0; j < this.RecentData.length; j++) {
      if (this.favData[i].id == this.RecentData[j].id) {
        this.RecentData[j].isLiked = this.favData[i].isLiked
      }
    }
    localStorage.setItem('Recent', JSON.stringify(this.RecentData))
    this.favData.splice(i, 1)
    localStorage.setItem('favourite', JSON.stringify(this.favData))
  }
  removeAll() {
    Swal.fire({
      title: "<span style=' font-size: 15px;'>Are you sure want to remove all the favourites?</span>",
      width: 458,
      padding: '2.5em',
      showCancelButton: true,
      confirmButtonText: "<span style='padding-left:20px;padding-right:20px' > YES</span>",
      reverseButtons: true,
      confirmButtonColor: ' #F76B1C',
      cancelButtonText: "  <span style='color:black'> NO</span>",
      cancelButtonColor: 'white'

    }).then((result) => {
      if (result.value) {
        localStorage.removeItem('favourite')

        window.location.reload()
      }
    })

  }
  searchCity(searchKey: any) {
    this.service.getInput(searchKey)
    this.router.navigate(['home'])
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
