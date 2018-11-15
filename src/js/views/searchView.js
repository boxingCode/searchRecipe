import { element } from './base'

export const getInput = () => {
    return element.searchInput.value;
};

export const clearInputbox = () => {
    element.searchInput.value = "";
};

export const clearSearchedResult = () => {
    element.searchResultList.innerHTML = "";
    element.searchResultPages.innerHTML ="";
};

export const selectedItem = (id,prevId)=> {
    console.log(`a[href="#${id}"]`);
    if(prevId)
        document.querySelector(`a[href="#${prevId}"]`).classList.remove('results__link--active');

    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}

const makeTitleOfALine = (title, limit = 17) => {
    const titleNew = [];
    if (title.length > limit) {
        title.split(' ').reduce((lengthCount, curr) => {
            if (lengthCount + curr.length <= limit) {
                titleNew.push(curr);
            }
            return lengthCount + curr.length;
        }, 0);

        return `${titleNew.join(' ')} ..`;
    }

    return title;
};

const renderRecipe = (recipe) => {
    const html = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${makeTitleOfALine(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;

    element.searchResultList.insertAdjacentHTML('beforeend', html);
};

export const renderResult = (recipeList, page = 1, resultPerPage = 10) => {
    const start = (page - 1) * resultPerPage;
    const end = page * resultPerPage;

    /*for (const recipe of recipeList.slice(start, end)) {
        renderRecipe(recipe);
    }*/
    recipeList.slice(start, end).forEach(renderRecipe);
    renderButton(page,recipeList.length,resultPerPage);
};

const renderButton = (page, numResults, resultPerPage) => {
    const pages = Math.ceil(numResults / resultPerPage);
    let button;
    if (page === 1 && pages > 1) {
        button=creteButton(page,'next');
    } else if (page === pages && pages > 1) {
        button=creteButton(page,'prev');
    } else if (page < pages ) {
        button=`
        ${creteButton(page,'prev')}
        ${creteButton(page,'next')}`;
    }
    element.searchResultPages.insertAdjacentHTML('afterbegin',button);
};

const creteButton = (page,type) => {
    return `
            <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1} >
                <span>Page ${type === 'prev' ? page-1 : page+1}</span>    
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                </svg>
            </button>
            `
}