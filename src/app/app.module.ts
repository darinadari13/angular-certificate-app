import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CertificateInfoComponent } from './components/certificate-info/certificate-info.component';
import { CertificateListComponent } from './components/certificates-list/certificates-list.component';
import { UploadInputComponent } from './components/upload-input/upload-input.component';


@NgModule({
  declarations: [
    AppComponent,
    CertificateListComponent,
    CertificateInfoComponent,
    UploadInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
