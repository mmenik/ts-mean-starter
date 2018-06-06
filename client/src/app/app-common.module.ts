import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './app-material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        AppMaterialModule,
        TranslateModule
    ],
    exports: [
        CommonModule,
        FlexLayoutModule,
        AppMaterialModule,
        TranslateModule,
    ]
})
export class AppCommonModule { }
