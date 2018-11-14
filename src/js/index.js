import Search from './models/search'


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
    const query = 'pizza';

    if (query) {
        // adding state
        state.search = new Search('pizza');

        //prepare UI for result

        //search for recipe
        await state.search.getRecipe();

        //search result on UI
        console.log(state.search.recipieExtracted);
    }
};

document.querySelector(".search").addEventListener("submit", (event) => {
    event.preventDefault();
    controlSearch();
});

