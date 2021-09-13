import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
})
export class TabMenuComponent {
  public items: MenuItem[];
  public activeItem: MenuItem;
  public active: boolean = false;

  public ngOnInit(): void {
    this.tabMenuItemConfiguration();
  }

  public tabMenuItemConfiguration(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
      { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/books'] },
      { label: 'Form', icon: 'pi pi-fw pi-file', routerLink: ['/add'] },
    ];

    this.activeItem = this.items[0];
  }
}
