import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { PrimengModule } from './primeng.module';

const IMPORTS_EXPORTS: Type<any>[] = [CommonModule, PrimengModule]

@NgModule({
    imports: [IMPORTS_EXPORTS],
    exports: [IMPORTS_EXPORTS],
})

export class SharedModule {}