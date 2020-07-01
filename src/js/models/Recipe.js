import axios from 'axios';
import {cors, apiKey} from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try {
            const result = await axios(`${cors}https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${apiKey}&includeNutrition=false`);
            this.title = result.data.title;
            this.publisher = result.data.sourceName;
            this.img = result.data.image;
            this.url = result.data.sourceUrl;
            this.ingredients = result.data.extendedIngredients;
            this.time = result.data.cookingMinutes;
            this.servings = result.data.servings;
            console.log(result); 
        } catch (error) {
            alert(error);
        }
    }

// // calculate cooking time
// calcTime() {
//     // assume we need 15mins for each ingredient
//     const numIng = this.ingredients.length;
//     const periods = Math.ceil(numIng / 3);
//     this.time = periods * 15;
// }

// calcServings() {
//     this.servings = 4;
// }

// // processing Ingredients
// parseIngredients(){
//     const newIngredients = this.ingredients.map(el => {

//     });

//     this.ingredients = newIngredients;
// }


}
