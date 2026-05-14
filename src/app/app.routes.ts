import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page-component/home-page-component';
import { NotFoundComponent } from './components/not-found-component/not-found-component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];
