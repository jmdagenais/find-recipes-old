import {NgModule} from '@angular/core';

import {AutoCompleteModule, InputTextModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ChipsModule} from 'primeng/chips';
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  imports: [
    InputTextModule,
    InputTextareaModule,
    AutoCompleteModule,
    ChipsModule,
    ButtonModule,
    DataViewModule,
    MessageModule,
    ConfirmDialogModule
  ],
  exports: [
    InputTextModule,
    InputTextareaModule,
    AutoCompleteModule,
    ChipsModule,
    ButtonModule,
    DataViewModule,
    MessageModule,
    ConfirmDialogModule
  ]
})
export class PrimeNgModule {}
