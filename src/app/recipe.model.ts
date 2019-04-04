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

  public get image(): string {
    return this.imageUrl || 'assets/images/assiette.jpg';
  }

  constructor() {

  }
}

// export interface Recipe {
//   id?: string;
//   name: string;
//   description: string;
//   tags: string[];
//   image?: string;
// }
