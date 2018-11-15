import Search from './models/search'
import Recipe from './models/recipe'
import { element, loaderRotate, clearLoader } from './views/base'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
//application state
/*  
search object
current recipie
shopping list
liked recipie
*/
const state = {};

const controlSearch = async () => {
    //getting query from view
    const query = searchView.getInput()

    if (query) {
        // adding state
        state.search = new Search(query);

        //prepare UI for result
        searchView.clearInputbox();
        searchView.clearSearchedResult();
        loaderRotate(element.searchResult);

        try {
            //search for recipe
            await state.search.getRecipe();

            //search result on UI
            clearLoader();
            searchView.renderResult(state.search.recipeExtracted);

        } catch (error) {
            clearLoader();
            alert('something went wrong loading search item')
        }
    }
};

element.searchButton.addEventListener("submit", (event) => {
    event.preventDefault();
    controlSearch();
});

element.searchResultPages.addEventListener('click', event => {
    const button = event.target.closest('.btn-inline');
    if (button) {
        const goToPage = parseInt(button.dataset.goto, 10);
        searchView.clearSearchedResult();
        searchView.renderResult(state.search.recipeExtracted, goToPage);
    }
});


const controlRecipe = async () => {
    const id = window.location.hash.replace('#','');
    const prevEleId;
    if (id) {
        recipeView.clearRecipe();
        loaderRotate(element.recipe);

        //make the selected list
        if(state.search) searchView.selectedItem(id,prevId);

        state.recipe = new Recipe(id);
        try {
            //waiting recipie
            await state.recipe.getRecipe();

            //parsing ingredient
            state.recipe.parseIngredients();

            state.recipe.calculatePrepTime();
            state.recipe.calculateServing();

            //render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);            
        } catch (error) {
            alert('error loading recipe');
        }
    }
    prevEleId = id;
};

window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
