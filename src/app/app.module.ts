import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Route, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AutoCompleteModule, InputTextModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ChipsModule} from 'primeng/chips';
import {ButtonModule} from 'primeng/button';

import { AppComponent } from './app.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import {RecipeService} from './shared/recipe.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TagSelectorComponent} from './tag-selector/tag-selector.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

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
    RecipeDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    InputTextModule,
    InputTextareaModule,
    AutoCompleteModule,
    ChipsModule,
    ButtonModule
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
