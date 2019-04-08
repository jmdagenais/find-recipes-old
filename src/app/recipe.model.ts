export class Recipe {
  public _id: string;
  public name: string;
  public ingredients: string;
  public preparation: string;
  public tags: string[];
  public nbPortions: number;
  public prepTime: number = 0;
  public cookTime: number = 0;
  public extraTime: {time: number, name: string} = null;
  public imageUrl: string;
  public imageData: string;

  public get image(): string {
    return this.imageData || this.imageUrl || 'assets/images/assiette.jpg';
  }

  constructor(data?) {
    this._id = data._id;
    this.name = data.name;
    this.ingredients = data.ingredients;
    this.preparation = data.preparation;
    this.tags = data.tags;
    this.nbPortions = data.nbPortions;
    this.prepTime = data.prepTime;
    this.cookTime = data.cookTime;
    this.extraTime = data.extraTime;
    this.imageUrl = data.imageUrl;
    this.imageData = data.imageData;
  }
}

// export interface Recipe {
//   id?: string;
//   name: string;
//   description: string;
//   tags: string[];
//   image?: string;
// }
