import axios from "axios";
import {cors, apiKey} from '../config';


export default class Search {
    constructor(query) {
        this.query = query;
    };
    async getResults(){
        try{
        // const result = await axios(`${cors}https://recipesapi.herokuapp.com/api/search?&q=${this.query}`);
        const result = await axios(`${cors}https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&query=${this.query}&number=200`);
        this.recipes = result.data.results;
        }catch(error){
            alert(error);
        }
    }
}




