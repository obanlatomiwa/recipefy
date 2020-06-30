// api link
//https://recipesapi.herokuapp.com/api/search

import Search from './models/Search';
import Recipe from './models/Recipe';
import {DOM, renderLoader, removeLoader} from './views/base';
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'


/** Global State of the app
 * search object
 * shopping list object
 * liked recipes object
 * current recipe object
 */

// state keeps current data
const state = {};


/**
 * SEARCH CONTROLLER
 */

const controlSearch = async () => {
    // get query from view
    const query = searchView.getInput();
    // if query create a new search object and add  to state
    if (query){
        state.search = new Search(query);

        // prepare UI for search results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(DOM.searchResult);

        try {
        // search for recipe
        await state.search.getResults();

        // render search results on UI
        removeLoader();
        searchView.renderResults(state.search.recipes);
        } catch (error) {
            alert('Something wrong with the search...');
            removeLoader(); 
        }
        

    }
};

// const searchBox = 
DOM.searchRecipe.addEventListener('submit', e => {
    e.preventDefault(); 
    controlSearch();
});

DOM.resultPages.addEventListener('click', e => {
    const button = e.target.closest('.btn-inline');
    if (button){
        searchView.clearResults();
        const goToPage = parseInt(button.dataset.goto, 10);
        searchView.renderResults(state.search.recipes, goToPage);

    }
})



/**
 * RECIPE CONTROLLER
 */

const controlRecipe= async() => {
    // get id from url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // prepare UI
        recipeView.clearRecipe();
        renderLoader(DOM.recipe);

        // create new recipe object
        state.recipe = new Recipe(id);
        try {
        // extract recipe data
        await state.recipe.getRecipe();

        // render recipe to UI
        removeLoader();
        recipeView.renderRecipe(state.recipe);
        console.log(state.recipe)
    } catch (error) {
            alert('Error processing Recipe!');
        }
        
    }
}

// adding global events  
['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));


// testing
// const res = new Recipe('33631');
// res.getRecipe();
// console.log(res)
