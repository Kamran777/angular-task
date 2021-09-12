import { Book } from './../../../models/book.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-book-author',
  templateUrl: './book-author.component.html',
  styleUrls: ['./book-author.component.scss'],
})
export class BookAuthorComponent implements OnInit {
  public books: Book[] = [];
  public id: number = 0;
  public showLoader: boolean = false;
  public title: string = 'AUTHORS';
  public subscription: Subscription;

  constructor(
    private apiService: ApiService,
    private _activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.showLoader = true;
    this.getDataByAuthor();
  }

  public getDataByAuthor(): void {
    this.subscription = this._activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = Number(params['id']);
        this.apiService.getAll<Book[]>(`books`).subscribe((data: any) => {
          data.map((value: any) => {
            if (
              value.author
                .map((author: any) => {
                  return author.id;
                })
                .indexOf(this.id) !== -1
            ) {
              setTimeout(() => {
                this.showLoader = false;
                this.books?.push(value);
              }, 1000);
            }
          });
        });
      }
    );
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
