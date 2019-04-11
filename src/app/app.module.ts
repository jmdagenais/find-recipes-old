import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Route, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import {RecipeService} from './shared/recipe.service';
import {TagSelectorComponent} from './tag-selector/tag-selector.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { TimeFormatPipe } from './shared/pipe/time-format/time-format.pipe';
import {PrimeNgModule} from './primeNg.module';
import {HtmlifyPipe} from './shared/pipe/htmlize/htmlify.pipe';

const routes: Route[] = [
  {path: '', component: RecipeListComponent},
  {path: 'recipes', component: RecipeListComponent},
  {path: 'recipes/add', component: AddRecipeComponent},
  {path: 'recipes/:id', component: RecipeDetailComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    RecipeListComponent,
    TagSelectorComponent,
    RecipeDetailComponent,
    TimeFormatPipe,
    HtmlifyPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    PrimeNgModule
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
