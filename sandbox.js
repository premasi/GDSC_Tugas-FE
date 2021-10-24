const API_KEY = "api_key=d557ce4f030b477de4f503f2305d0f57";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search")
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

/* Yang nyuri bakal diazab -by Raka Ryandra Guntara
Capek cuy */

getMovies(API_URL);

//get data movies
function getMovies(url) {
fetch(url).then(res => res.json()).then(data => {
    if(data.results.length !== 0){
      showMovies(data.results);  
    } else {
        main.innerHTML = `
        <h1 class = "notFound">Search again :(</h1>
        `
    }
    
})
}

/* Yang nyuri bakal diazab by Raka Ryandra Guntara
Capek cuy */

/*showing list movies*/
function showMovies(data){
    main.innerHTML = "";

    data.forEach(movie => {
        const{title, poster_path, overview, vote_average, id} = movie;
        const movieEL = document.createElement('div');
        movieEL.classList.add("movie");
        movieEL.innerHTML = `

            <img src="${IMG_URL + poster_path}" alt="${title}">
            
            <div class="movie-info">
                <button class="know-more" id="${id}">${title}</button>
                <span class="yellow">${vote_average}</span>
            </div>
            
        
        `
        /* Yang nyuri bakal diazab by Raka Ryandra Guntara
        Capek cuy */

        main.appendChild(movieEL)

        document.getElementById(id).addEventListener('click', () => {
            console.log(id);
            openNav(movie);
          })
    })
}

const overlayContent = document.getElementById("overlay-content");

/* Open when someone clicks on the span element */
function openNav(movie) {
    let id = movie.id;
    fetch(BASE_URL + "/movie/" + id + "?" +API_KEY).then(res => res.json()).then(movie => {
        console.log(movie);
        document.getElementById("myNav").style.width = "100%";
        overlayContent.innerHTML = `
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
            <div class="movie-detail">
                <h1>${movie.title}</h1>
                <span class="yellow">Rating : ${movie.vote_average}</span>
                <p>${movie.overview}</p>
             </div>
         `
    })

}

/* Yang nyuri bakal diazab by Raka Ryandra Guntara
Capek cuy */
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(searchURL + "&query=" + searchTerm);
    } else {
        getMovies(API_URL);
    }
})

/* Yang nyuri bakal diazab by Raka Ryandra Guntara
Capek cuy */