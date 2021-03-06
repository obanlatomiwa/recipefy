import {DOM} from './base';
import {Fraction} from 'fractional';

// formats the amount per ingredient required
// const formatAmount = amount => {
//     if (amount){
//         const newAmount = Math.round(amount * 10000) / 10000; 
//         const [integer, decimal] = newAmount.toString().split('.').map(el => parseInt(el, 10));

//         if (!decimal) return newAmount;

//         if (integer === 0){
//             const fraction = new Fraction(newAmount);
//             return `${fraction.numerator}/${fraction.denominator}`;
//         }else{
//             const fraction = new Fraction(newAmount - integer);
//             return `${integer} ${fraction.numerator}/${fraction.denominator}`;
//         }
//     }
//     return '?'; 
// }

const formatAmount = amount => {
    if (amount) {
        const [integer, decimal] = amount.toString().split('.').map(el => parseInt(el, 10));
        
        if (!decimal) return amount;
        const places = [1250, 2500, 5000, 7500, 8250, 9999];
        let decimals = decimal;
        decimals *= 1000;
        decimals /= 10**(Math.floor(Math.log10(decimals)) - 3);
        decimals = Math.floor(decimals);
        
        let x = places.length - 1;
        for (const [i, el] of places.entries()) {
            if (el - decimals >= 0) {
                x = i;
                break;        
            }}

            decimals = x === 5? 1: places[x]/10000;
        
        if (integer === 0) {
            const fraction = new Fraction(decimals);
            return `${fraction.numerator}/${fraction.denominator}`;
        } else {
            const fraction = new Fraction(decimals);
            return `${integer} ${fraction.numerator}/${fraction.denominator}`;
        }
    }
    return amount;
}


export const clearRecipe = () => {
    DOM.recipe.innerHTML = '';
}

const createIngredient = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatAmount(ingredient.amount)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.name}
        </div>
    </li> 

`;


export const renderRecipe = (recipe, isLiked) => {
    const markup = `
    <figure class="recipe__fig">
        <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>

    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
            </svg>
        </button>
    </div>



    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">

        ${recipe.ingredients.map(el => createIngredient(el)).join('')}

        </ul>

        <button class="btn-small recipe__btn recipe__btn--add">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>

    `;

    DOM.recipe.insertAdjacentHTML('afterbegin', markup);
}

export const updateServingsIngredients = recipe => {
    // update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
    // update ingredients
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el, i) => {
        el.textContent = formatAmount(recipe.ingredients[i].amount);
    })
}