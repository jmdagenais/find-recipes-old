import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

import {Recipe} from '../recipe.model';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  @ViewChild('f') recipeForm: NgForm;
  private tags: string[] = [];
  // public currentTag: string = '';
  public recipe: Recipe = new Recipe();
  public extraTime: {time: number, name: string} = {time: 0, name: ''};
  public showExtraTime = false;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {

  }

  // addTag(tag: string) {
  //   if (tag.length > 0) {
  //     this.tags.push(tag);
  //     this.currentTag = '';
  //   }
  // }

  removeTag(tag: string) {
    const index = this.tags.indexOf(tag);
    this.tags.splice(index, 1);
  }

  // onKeyPress(event: KeyboardEvent) {
  //   if (event.keyCode === 13) {
  //     event.preventDefault();
  //     this.addTag(this.currentTag);
  //   }
  // }

  submit(form: NgForm) {
    if (form.valid) {
      const url = environment.api_url;

      // save recipe to the DB
      this.http.post(url + 'recipes', this.recipe)
        .subscribe((val) => {
          form.reset();
          this.tags = [];
        });
    }
  }


}
