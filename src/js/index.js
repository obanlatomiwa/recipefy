// api link
//https://recipesapi.herokuapp.com/api/search

import Search from './models/Search';
import {DOM, renderLoader, removeLoader} from './views/base';
import * as searchView from './views/searchView'

/** Global State of the app
 * search object
 * shopping list object
 * liked recipes object
 * current recipe object
 */

// state keeps current data
const state = {};

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

        // search for recipe
        await state.search.getResults();

        // render search results on UI
        removeLoader();
        searchView.renderResults(state.search.recipes);

    }
};

const searchBox = DOM.searchRecipe.addEventListener('submit', e => {
    e.preventDefault(); 
    controlSearch();
});





