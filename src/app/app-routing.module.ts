import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'favourite',
    loadChildren: () =>
      import('./favourite/favourite.module').then((m) => m.FavouriteModule),
  },
  {
    path: 'recent-search',
    loadChildren: () =>
      import('./recent-search/recent-search.module').then(
        (m) => m.RecentSearchModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
