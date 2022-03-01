document.documentElement.addEventListener('submit', (event)=> {
    event.preventDefault();
})

let searchEngineURL
function getSearchEngine() {
    chrome.storage.local.get(['searchEngine'], (result)=> {
        if (result.searchEngine == '1') {
            searchEngineURL = 'https://google.com/search?q=';
            searchInput.placeholder = 'Search with Google';
        }
        else if (result.searchEngine == '2') {
            searchEngineURL = 'https://bing.com/search?q=';
            searchInput.placeholder = 'Search with Bing';
        }
        else if (result.searchEngine == '3') {
            searchEngineURL = 'https://duckduckgo.com/?q=';
            searchInput.placeholder = 'Search with DuckDuckGo';
        }
    })
}

getSearchEngine();

function createImgElement(src) {
    const img = document.createElement('img');
    img.classList.add('image-background');
    img.src = src;
    document.body.appendChild(img);
}

const imageBackground = document.querySelector('.imageBackground');

chrome.storage.local.get(['backgroundType', 'backgroundImageData'], (result)=> {
    if (result.backgroundType == '1') {
        //nothing
    }
    else if (result.backgroundType == '2') {
        createImgElement('resources/default_wallpaper.jpg');
    }
    else if (result.backgroundType == '3' || result.backgroundType == '4') {
        createImgElement(result.backgroundImageData);
    }
})

// text search
const searchInput = document.querySelector('#search-input');
const searchClear = document.querySelector('#search-clear');

document.querySelector('#search-form').addEventListener('submit', ()=> {
    if (searchInput.value.length > 0) {
        window.location.href = searchEngineURL + searchInput.value;
    }
})

searchInput.addEventListener('input', ()=> {
    if (searchInput.value.length > 0) {
        searchClear.style.display = 'flex';
    }
    else if (searchInput.value.length == 0) {
        searchClear.style.display = '';
    }
})

searchClear.addEventListener('click', ()=> {
    searchInput.value = '';
    searchClear.style.display = '';
})

// in focus input

searchInput.addEventListener('focus', ()=> {
    document.querySelector('#search-form').classList.add('input-focus');
})

searchInput.addEventListener('blur', ()=> {
    document.querySelector('#search-form').classList.remove('input-focus');
})