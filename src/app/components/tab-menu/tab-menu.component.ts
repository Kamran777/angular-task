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

  public ngOnInit(): void {
    this.tabMenuItemConfiguration();
  }

  public tabMenuItemConfiguration(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Table', icon: 'pi pi-fw pi-table' },
      { label: 'Form', icon: 'pi pi-fw pi-file' },
    ];

    this.activeItem = this.items[0];
  }
}
