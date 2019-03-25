// export class Recipe {
//   constructor(
//     public name: string,
//     public description: string,
//     public tags: string[],
//     public id: string) {
//
//   }
// }

export interface Recipe {
  id?: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
}
