import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AllAuthorsComponent } from './all-authors/all-authors.component';
import { AddAuthorsComponent } from './add-authors/add-authors.component';
import { EditAuthorsComponent } from './edit-authors/edit-authors.component';
import { FormsModule } from '@angular/forms';

import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AllAuthorsComponent,
    AddAuthorsComponent,
    EditAuthorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
