import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { GarmentComponent } from './components/garment/garment.component';
import { OutfitComponent } from './components/outfit/outfit.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vetements', component: GarmentComponent },
  { path: 'garde-robes', component: OutfitComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
