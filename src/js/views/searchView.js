import {DOM} from './base';

export const getInput = () => DOM.searchInput.value; 
export const clearInput = () => {
    DOM.searchInput.value; 
}

export const clearResults = () => {
    DOM.searchResultList.innerHTML = '';
}

// limit the recipe title render to the UI
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit){
        title.split(' ').reduce((acc, cur)=> {
            if (acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return new title
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}


export const renderResults = (recipes) => {
    recipes.forEach(renderRecipe);
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.id}">
                <figure class="results__fig">
                    <img src="${recipe.image}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">The Pioneer Woman</p>
                </div>
            </a>
        </li>
    `;

    DOM.searchResultList.insertAdjacentHTML('beforeend', markup);
}

