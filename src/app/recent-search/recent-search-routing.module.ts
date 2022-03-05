import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecentSearchComponent } from './recent-search.component';

const routes: Routes = [{ path: '', component: RecentSearchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecentSearchRoutingModule { }
