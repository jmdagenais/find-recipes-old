import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Route, RouterModule} from '@angular/router';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmationService} from 'primeng/api';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import {RecipeService} from './shared/recipe.service';
import {TagSelectorComponent} from './tag-selector/tag-selector.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { TimeFormatPipe } from './shared/pipe/time-format/time-format.pipe';
import {PrimeNgModule} from './primeNg.module';
import {HtmlifyPipe} from './shared/pipe/htmlify/htmlify.pipe';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Route[] = [
  {path: '', component: RecipeListComponent},
  {path: 'recipes', component: RecipeListComponent},
  {path: 'recipes/add', component: AddRecipeComponent, canActivate: [AuthGuard]},
  {path: 'recipes/:id', component: RecipeDetailComponent},
  {path: 'recipes/:id/edit', component: AddRecipeComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent}
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    RecipeListComponent,
    TagSelectorComponent,
    RecipeDetailComponent,
    AdminComponent,
    TimeFormatPipe,
    HtmlifyPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    PrimeNgModule,
  ],
  providers: [RecipeService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
