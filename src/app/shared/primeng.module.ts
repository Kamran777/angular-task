import { NgModule } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [TabMenuModule, TableModule, ButtonModule],
    exports: [TabMenuModule, TableModule, ButtonModule],

@NgModule({
    imports: [TabMenuModule],
    exports: [TabMenuModule],
})

export class PrimengModule {}