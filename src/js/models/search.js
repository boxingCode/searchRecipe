//https://www.food2fork.com/api/search
// 955cf7a946889665b0fb91e5bf5be1bc  apikey


import axios from 'axios'
import { error } from 'util';

export default class Search {
    
    constructor(query) {
        this.query = query;
    }

    async getRecipe() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '59cd77eb7fcbf86820c7d2bb8c626de0';
        try {
            const result = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.recipeExtracted = result.data.recipes;
        } catch (error) {
            alert(error)
        }
    }

}
