export const DOM  = {
    searchRecipe: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResultList: document.querySelector('.results__list'),
    searchResult: document.querySelector('.results'),
    resultPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list'),

}

export const DOMStrings = {
    loader: 'loader',
}

// adding a loader to the result list section
export const renderLoader = parent => {
    const loader = `
        <div class = "${DOMStrings.loader}">
            <svg> 
                <use href="img/icons.svg#icon-cw"> </use>
            </svg>
        </div>    
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

// removing loader after result list appears
export const removeLoader = () => {
    const loader = document.querySelector(`.${DOMStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}