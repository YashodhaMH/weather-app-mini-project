import { Component, OnInit } from '@angular/core';
import { WeatherapiService } from '../weatherapi.service';
import { fromEvent, throttleTime } from 'rxjs';
import {
  Router,
  Event as NavigationEvent,
  NavigationStart,
} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  input: any;
  currentRoute: any;
  msg = '';
  event$: any;
  // isSmallMobileDevice: MediaQueryList = window.matchMedia('(max-width: 599px)');
  ngOnInit(): void {
    document.getElementById('mobileHeader')!.style.display = 'none';
    fromEvent(window, 'resize').subscribe((event) => {
      if (window.innerWidth <= 400 && this.currentRoute !== 'home') {
        document.getElementById('desktopHeader')!.style.display = 'none';
        document.getElementById('mobileHeader')!.style.display = 'block';
      } else {
        document.getElementById('mobileHeader')!.style.display = 'none';
        document.getElementById('desktopHeader')!.style.display = 'block';
      }
    });
  }

  constructor(private router: Router, private service: WeatherapiService) {
    this.event$ = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        if (event.url == '/favourite') {
          this.currentRoute = 'Favourite';
        } else if (event.url == '/recent-search') {
          this.currentRoute = 'Recent Search';
        } else {
          this.currentRoute = 'home';
        }
      }
    });
  }

  handleSubmit(e: any) {
    e.preventDefault();
    this.searchData();
    this.input = '';
  }

  handleKeyUpForDesktop(e: any) {
    if (e.keyCode === 13) {
      this.handleSubmit(e);
    }
  }
  handleKeyUpForMobile(e: any) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.searchData();
      this.input = '';
      document.getElementById('backToHome')!.click();
      document.getElementById('mobileHeader')!.style.display = 'none';
    }
  }

  searchData() {
    this.service.getInput(this.input);
    localStorage.setItem('search', JSON.stringify('clicked'));
    this.router.navigate(['home']);
  }
  backToHome() {
    this.router.navigate(['home']);
    document.getElementById('mobileHeader')!.style.display = 'none';
    document.getElementById('desktopHeader')!.style.display = 'block';
  }
}
