// Select elements from DOM
var elList = document.querySelector("#movie_list");
var elSearchResultNum = document.querySelector("#search-result-number");
var elForm = document.querySelector("#form");
var elInputValue = document.querySelector("#input");
var elRating = document.querySelector("#movie-rating");
var elSort = document.querySelector("#rating_sort");
var elCategorySelect = document.querySelector("#category-select");
var elTempaleCard = document.querySelector("#template-card").content;

// Get sliced movies
let slicedMovies = movies.slice(0, 100);



// get Normolized movies
var normolizedMovieList = slicedMovies.map(movieItem => {
    return {
        title: movieItem.Title.toString(),
        categories: movieItem.Categories,
        rating: movieItem.imdb_rating,
        year: movieItem.movie_year,
        imageLink: `https://i.ytimg.com/vi/${movieItem.ytid}/mqdefault.jpg`,
        youtubeLink: `https://www.youtube.com/watch?v=${movieItem.ytid}`
    }
})


renderMovies(normolizedMovieList, elList);


// generate categories
function generateCategories(movieArray){
    let categoryList = [];

    movieArray.forEach(item => {
        var newArr = item.categories.split("|");
        newArr.forEach(item => {
            if(!categoryList.includes(item)) categoryList.push(item)
        })
    })

    categoryList.sort();

    let categoryFragment = document.createDocumentFragment();

    categoryList.forEach(function(item){
        let categoryOption = document.createElement("option");
        categoryOption.value = item;
        categoryOption.textContent = item;
        categoryFragment.appendChild(categoryOption)
    })

    elCategorySelect.appendChild(categoryFragment)
}

generateCategories(normolizedMovieList)




// create render function
function renderMovies(array, place){
    place.innerHTML = null;

    let elFragment = document.createDocumentFragment()

    array.forEach(item => {
        let newDiv = elTempaleCard.cloneNode(true);

        newDiv.querySelector("#card-img").src = item.imageLink;
        newDiv.querySelector(".card-title").textContent = item.title;
        newDiv.querySelector(".movie-category").textContent = item.categories.split("|").join(", ");
        newDiv.querySelector(".movie-year").textContent = item.year;
        newDiv.querySelector(".movie-rating").textContent = item.rating;
        newDiv.querySelector(".movie-youtube-link").href = item.youtubeLink;
        newDiv.querySelector(".movie-youtube-linkk").href = item.youtubeLink;

        elFragment.appendChild(newDiv);
    });

    place.appendChild(elFragment)
    elSearchResultNum.textContent = array.length
}


// event submit
elForm.addEventListener("submit", function(evt){
    evt.preventDefault();

    let searchInput = elInputValue.value.trim();
    let ratingInput = elRating.value.trim();
    let selectOption = elCategorySelect.value;
    let sortingType = elSort.value;

    let pattern = new RegExp(searchInput, "gi")

    let resultArray = findMovies(pattern, ratingInput, selectOption)

    if(sortingType === "heigh"){
        resultArray.sort(function(b, a){
            return a.rating - b.rating
        })
    }

    if(sortingType === "low"){
        resultArray.sort(function(a, b){
            return a.rating - b.rating
        })
    }

    renderMovies(resultArray, elList)
})






// // sort2 by name
// elForm.addEventListener("input", function(evt){
//     evt.preventDefault();

//     var searchInput = elInputValue.value.trim().toLowerCase()


//     var searchedMovies = normolizedMovieList.filter(function(item){
//         return item.title.toLowerCase().includes(searchInput)
//     })

//     renderMovies(searchedMovies, elList)
// })



// find movies
var findMovies = function(movie_title, minRating, genre){

    return normolizedMovieList.filter(function(movie){
        var doesMatchCategory = genre === "All" || movie.categories.split("|").includes(genre);

        return movie.title.match(movie_title) && movie.rating >= minRating && doesMatchCategory;
    })
}

// console.log(findMovies("e", 7.5, "Comedy"));
// sort3 by category
// elForm.addEventListener("submit", function(evt){
//     evt.preventDefault();

//     var selectOption = elCategorySelect.value;

//     let categotisedMovies = [];

//     if(selectOption === "All"){
//         categotisedMovies = normolizedMovieList
//     }
//     else{
//         categotisedMovies = normolizedMovieList.filter(function(item){
//             return item.categories.includes(selectOption)
//         })
//     }

//     renderMovies(categotisedMovies, elList)
// })

// sort1 by rating
// elForm.addEventListener("submit", function(evt){
//     evt.preventDefault();

//     let movieRating = elRating.value.trim();

//     let filteredArray = normolizedMovieList.filter(function(item){
//         return item.rating > movieRating
//     })

//     elSearchResultNum.textContent = filteredArray.length
//     renderMovies(filteredArray, elList)
// })