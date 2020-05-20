import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OutfitGenerateComponent } from './components/outfit-generate/outfit-generate.component';
import { HttpClientModule } from '@angular/common/http';
import { OutfitComponent } from './components/outfit/outfit.component';
import { GarmentComponent } from './components/garment/garment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalAddGarmentComponent } from './components/garment/modal-add-garment/modal-add-garment.component';
import { LoginComponent } from './components/login/login.component';

import { DragDropDirective } from './directive/draganddrop.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { ModalProfilComponent } from './components/modal-profil/modal-profil.component';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { MatCardModule } from '@angular/material/card';
import { LegalComponent } from './components/legal/legal.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { environment } from 'src/environments/environment';


const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.baseDomain
  },
  palette: {
    popup: {
      background: 'rgb(208, 213, 216)',
      text: '#000'
    },
    button: {
      background: '#2e4ead'
    }
  },
  theme: 'edgeless',
  type: 'info',
  content: {
    message: 'En poursuivant votre navigation sur ce site, ' +
      'vous acceptez l’utilisation de Cookies ou autres traceurs afin de pouvoir vous offir une navigation simplifié.',
    dismiss: 'OK !',
    link: 'En savoir plus.',
    href: 'https://cookiesandyou.com',
    policy: 'Cookie Policy'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    OutfitGenerateComponent,
    OutfitComponent,
    GarmentComponent,
    ModalAddGarmentComponent,
    DragDropDirective,
    LoginComponent,
    NavbarComponent,
    ModalProfilComponent,
    ModalConfirmComponent,
    LegalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatBadgeModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    DragScrollModule,
    MatCardModule,
    MatCheckboxModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
  ],
  entryComponents: [
    ModalAddGarmentComponent,
    ModalProfilComponent,
    ModalConfirmComponent,
    OutfitGenerateComponent,
    LegalComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
