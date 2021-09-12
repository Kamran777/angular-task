import { NgModule } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [TabMenuModule, TableModule, ButtonModule, InputTextModule, DropdownModule, ProgressSpinnerModule, ConfirmDialogModule, ToastModule],
    exports: [TabMenuModule, TableModule, ButtonModule, InputTextModule, DropdownModule, ProgressSpinnerModule, ConfirmDialogModule, ToastModule],
})

export class PrimengModule {}