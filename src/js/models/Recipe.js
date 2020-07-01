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


    updateServings(type){
        // update servings
        const newServings = type === 'dec' ? this.servings -1 : this.servings + 1;

        // update ingredients
        this.ingredients.forEach(ingredient => {
            ingredient.amount *= (newServings / this.servings);
        })
        this.servings = newServings
    }

}
