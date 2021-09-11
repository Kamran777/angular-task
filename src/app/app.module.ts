import { BookTableComponent } from './components/books/book-table/book-table.component';
import { BookComponent } from './components/books/book/book.component';
import { SharedModule } from './shared/shared.module';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    AppComponent,
    TabMenuComponent,
    BookComponent,
    BookTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
