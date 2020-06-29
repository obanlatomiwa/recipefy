import {DOM} from './base';

export const getInput = () => DOM.searchInput.value; 

export const renderResults = (recipes) => {
    recipes.array.forEach(element => {
        renderRecipe(element);
    });
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link results__link--active" href="#${recipe.id}">
                <figure class="results__fig">
                    <img src="${recipe.image}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">The Pioneer Woman</p>
                </div>
            </a>
        </li>
    `;
}