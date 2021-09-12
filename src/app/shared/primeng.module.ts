import { NgModule } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    imports: [TabMenuModule, TableModule, ButtonModule, InputTextModule, DropdownModule],
    exports: [TabMenuModule, TableModule, ButtonModule, InputTextModule, DropdownModule],
})

export class PrimengModule {}