import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GarmentComponent } from './components/garment/garment.component';
import { OutfitComponent } from './components/outfit/outfit.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', component: LoginComponent, outlet: 'main', pathMatch: 'full' },
      { path: ':token', component: LoginComponent, outlet: 'main', pathMatch: 'full' },
    ]
  },
  { path: 'accueil', component: GarmentComponent, canActivate: [AuthGuardService] },
  { path: 'tenues', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'garde-robes', component: OutfitComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
