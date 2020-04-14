import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { GarmentComponent } from './components/garment/garment.component';
import { OutfitComponent } from './components/outfit/outfit.component';
import { ModalAddGarmentComponent } from './components/garment/modal-add-garment/modal-add-garment.component';

const routes: Routes = [
  // { path: 'profil', component: SingleAppareilComponent },
  { path: '', component: HomeComponent },
  { path: 'vetements', component: GarmentComponent },
  { path: 'garde-robes', component: OutfitComponent },
  { path: 'add', component: ModalAddGarmentComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
