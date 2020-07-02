// api link
//https://recipesapi.herokuapp.com/api/search

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import {DOM, renderLoader, removeLoader} from './views/base';
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'



/** Global State of the app
 * search object
 * shopping list object
 * liked recipes object
 * current recipe object
 */

// state keeps current data
const state = {};
window.state = state;


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

        // highlight selected search item
        if (state.search){
            searchView.highlightSelected(id);
        }

        // create new recipe object
        state.recipe = new Recipe(id);
        try {
        // extract recipe data
        await state.recipe.getRecipe();

        // render recipe to UI
        removeLoader();
        recipeView.renderRecipe(state.recipe);
    } catch (error) {
            alert('Error processing Recipe!');
        }
        
    }
}



// adding global events  
['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));

/**
 * LIST CONTROLLER
 */

const controlList = () => {
    // create a new list if none
    if(!state.list) state.list = new List();

    // add ingredient to list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.amount, el.unit, el.name);
        listView.renderItem(item); 
    })
}

// handle delete and update shopping list item

DOM.shoppingList.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // handle delete button
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        // delete from state
        state.list.deleteItem(id);

        // delete from UI
        listView.deleteItem(id);
        
    // handle amount update
    }else if(e.target.matches('.shopping__count-value')){
        const value = parseFloat(e.target.value, 10);
        state.list.updateAmount(id, value);
    }

})


// handling recipe button clicks
DOM.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')){
        // decrease button
        if (state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }else if (e.target.matches('.btn-increase, .btn-increase *')){
        // increase button
        state.recipe.updateServings('inc'); 
        recipeView.updateServingsIngredients(state.recipe); 
    }else if(e.target.matches('.recipe__btn--add, recipe__btn--add *')){
        controlList();
    }
})


window.l = new List();
 