import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'books',
    loadChildren: () =>
      import('./components/books/books.module').then(
        (module) => module.BooksModule
      ),
    pathMatch: 'prefix',
  },
  { path: 'details', redirectTo: 'books/details/:id', pathMatch: 'full' },
  { path: 'author', redirectTo: 'books/author/:id', pathMatch: 'full' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
