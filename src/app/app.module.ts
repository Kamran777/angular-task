import { ButtonComponent } from './components/shared-components/button/button.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { HomeComponent } from './components/home/home.component';
import { BooksModule } from './components/books/books.module';
import { SharedModule } from './shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TabMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BooksModule,
    CommonModule
  ],
  exports: [ButtonComponent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
