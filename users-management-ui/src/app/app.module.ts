import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { UsersManagementModule } from './features/users-management/users-management-module';

@NgModule({
  declarations: [
    AppComponent
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UsersManagementModule,
    StoreModule.forRoot({}),    
    EffectsModule.forRoot([]),
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
