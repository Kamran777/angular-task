import { NavigationStart, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
})
export class TabMenuComponent implements OnInit, OnDestroy {
  public items: MenuItem[];
  public activeItem: MenuItem;
  public subscription: Subscription;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.tabMenuItemConfiguration();
  }

  public tabMenuItemConfiguration(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
      { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/books'] },
      { label: 'Form', icon: 'pi pi-fw pi-file', routerLink: ['/add'] },
    ];

    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/home') {
          this.activeItem = this.items[0];
        } else if (event.url === '/books') {
          this.activeItem = this.items[1];
        } else if (event.url === '/books/add' || event.url === '/add') {
          this.activeItem = this.items[2];
        } else {
          this.activeItem = {};
        }
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
