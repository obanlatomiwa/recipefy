import psl from 'psl';
import {DOM} from './base';

export const getInput = () => DOM.searchInput.value; 
export const clearInput = () => {
    DOM.searchInput.value; 
}

export const clearResults = () => {
    DOM.searchResultList.innerHTML = '';
    DOM.resultPages.innerHTML = '';
}

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    })
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
}


// limit the recipe title render to the UI
export const limitRecipeTitle = (title, limit = 17, deLimiter = ' ') => {
    const newTitle = [];
    if (title.length > limit){
        title.split(deLimiter).reduce((acc, cur, i, arr)=> {
            if (acc + cur.length <= limit){
                newTitle.push(cur);
            }else {
                newTitle.push(' ...');
                arr.splice(1)
            }
            return acc + cur.length;
        }, 0);

        // return new title
        return newTitle.join(deLimiter);
    }
    return title;
}

const renderRecipe = recipe => {
    const extractHostname = url => {
        var hostname;
        //find & remove protocol (http, ftp, etc.) and get hostname
    
        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }
    
        //find & remove port number
        hostname = hostname.split(':')[0];
        //find & remove "?"
        hostname = hostname.split('?')[0];
    
        return hostname;
    }


    const baseUri = `https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`;
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.id}">
                <figure class="results__fig">
                    <img src="${baseUri}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${limitRecipeTitle(psl.get(extractHostname(recipe.sourceUrl)), 20, '')}</p>
                </div>
            </a>
        </li>
    `;

    DOM.searchResultList.insertAdjacentHTML('beforeend', markup);
}


// create button
// type is either 'next' or 'prev'
const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto = ${type === 'prev' ? page -1 : page + 1}>
    <span>Page ${type === 'prev' ? page -1 : page + 1}</span> 
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
</button>

`;

// render button
const renderButtons = (page, numResults, resultPerPage) => {
    const pages = Math.ceil(numResults / resultPerPage);

    // pagination
    let button;
    if (page === 1 && pages > 1){
        // first page should display next button
        button = createButton(page, 'next');
    }else if (page === pages && pages > 1){
        // last page should display previous button
        button = createButton(page, 'prev');
    }else if (page < pages) {
        // both prev and next
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `;
    }
    // add to DOM
    DOM.resultPages.insertAdjacentHTML('afterbegin', button);
}

// pagination
export const renderResults = (recipes, page = 1, resultPerPage = 10) => {
    // render paginated results
    const start = (page - 1) * resultPerPage;
    const end = page * resultPerPage;
    recipes.slice(start, end).forEach(renderRecipe); 

    // pagination buttons
    renderButtons(page, recipes.length, resultPerPage);
}
