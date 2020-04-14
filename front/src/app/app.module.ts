import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { OutfitComponent } from './components/outfit/outfit.component';
import { GarmentComponent } from './components/garment/garment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalAddGarmentComponent } from './components/garment/modal-add-garment/modal-add-garment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OutfitComponent,
    GarmentComponent,
    ModalAddGarmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  entryComponents: [
    ModalAddGarmentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
