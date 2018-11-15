import axios from 'axios'

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const key = '59cd77eb7fcbf86820c7d2bb8c626de0';
            const recipe = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title =recipe.data.recipe.title;
            this.author =recipe.data.recipe.publisher;
            this.img =recipe.data.recipe.image_url;
            this.url =recipe.data.recipe.source_url;
            this.ingredients = recipe.data.recipe.ingredients;
        } catch (error) {
            alert(`something went wrong :( `);
        }
    };

    calculatePrepTime() {
        //3 ingredeint take 15 mnts
        const ingredientNum = this.ingredients.length;
        const periods = Math.ceil(ingredientNum/3);
        this.time = periods*15;
    }

    calculateServing(){
        this.serving=4;
    }

    parseIngredients(){
        const unitsLong=['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitsShort=['tbps','tbps','oz','oz','tsp','tsp','cup','pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredient = this.ingredients.map(el=>{
            //uniform units
            let ingredient=el.toLowerCase();
            unitsLong.forEach((unit,i)=>{
                ingredient=ingredient.replace(unit,unitsShort[i]);
            });

            //remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ' );

            //parse ingredients into count, unit, ingredients
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex( el2 => units.includes(el2) );

            let objIng;
            if(unitIndex>-1){
                //there is a unit
                const arrCount=arrIng.slice(0,unitIndex);
                let count;
                
                if(arrCount.length===1){
                    count=eval( arrIng[0].replace('-','+') );
                }else{
                    count=eval(arrIng.slice(0,unitIndex).join('+'));
                }
                objIng = {
                    count,
                    unit:arrIng[unitIndex],
                    ingredient:arrIng.slice(unitIndex+1).join('  ')
                }

            }else if( parseInt(arrIng[0],10) ){
                //there is no unit but first element is number
                objIng ={
                    count:parseInt(arrIng[0],10),
                    unit:'',
                    ingredient:arrIng.slice(1).join(" ")
                }
            }else if(unitIndex === -1){
                //no unit and no number in 1st position 
                objIng ={
                    count:1,
                    unit:'',
                    ingredient
                }
            }

            return objIng;
        });

        this.ingredients = newIngredient;
    }

}