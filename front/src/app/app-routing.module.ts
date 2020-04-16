import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { GarmentComponent } from './components/garment/garment.component';
import { OutfitComponent } from './components/outfit/outfit.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', component: LoginComponent, outlet: 'main', pathMatch: 'full' },
      { path: 'inscription', component: RegisterComponent, outlet: 'main', pathMatch: 'full', },
    ]
  },
  { path: 'accueil', component: HomeComponent },
  { path: 'vetements', component: GarmentComponent },
  { path: 'garde-robes', component: OutfitComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
