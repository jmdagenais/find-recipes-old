import {NgModule} from '@angular/core';

import {AutoCompleteModule, InputTextModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ChipsModule} from 'primeng/chips';
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import {MessageModule} from 'primeng/message';

@NgModule({
  imports: [
    InputTextModule,
    InputTextareaModule,
    AutoCompleteModule,
    ChipsModule,
    ButtonModule,
    DataViewModule,
    MessageModule
  ],
  exports: [
    InputTextModule,
    InputTextareaModule,
    AutoCompleteModule,
    ChipsModule,
    ButtonModule,
    DataViewModule,
    MessageModule
  ]
})
export class PrimeNgModule {}
