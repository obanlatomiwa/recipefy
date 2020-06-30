import axios from 'axios';
import {cors, apiKey} from './config.js'

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try {
            await axios();
            
        } catch (error) {
            alert(error);
        }
    }
}