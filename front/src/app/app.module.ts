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
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { DragDropDirective } from './directive/draganddrop.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OutfitComponent,
    GarmentComponent,
    ModalAddGarmentComponent,
    DragDropDirective,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ModalAddGarmentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
