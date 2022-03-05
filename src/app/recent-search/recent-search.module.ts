import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecentSearchRoutingModule } from './recent-search-routing.module';
import { RecentSearchComponent } from './recent-search.component';


@NgModule({
  declarations: [
    RecentSearchComponent
  ],
  imports: [
    CommonModule,
    RecentSearchRoutingModule
  ]
})
export class RecentSearchModule { }
