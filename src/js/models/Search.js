import axios from "axios";

export default class Search {
    constructor(query) {
        this.query = query;
    };
    async getResults(){
        const cors = 'https://cors-anywhere.herokuapp.com/';
        const apiKey = '3ffa9f208fba4366b7f71a8a17bd22ae'
        try{
        // const result = await axios(`${cors}https://recipesapi.herokuapp.com/api/search?&q=${this.query}`);
        const result = await axios(`${cors}https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&query=${this.query}&number=200`);
        this.recipes = result.data.results;
        console.log(result)
        }catch(error){
            alert(error);
        }
    }
}




