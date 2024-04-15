
document.getElementById('searchMovie').addEventListener('submit', (e) => {
    const searchTerm = document.getElementById('movie-name').value;
    if (!searchTerm || searchTerm.length === 0) {
        document.getElementById('Error-Div').style.display = 'block';
        document.getElementById('result').style.display = 'none';
        document.getElementById('error').innerHTML = "Please enter movie name";
        document.getElementById('result').innerHTML = '';
    }
    else {
        fetchData(searchTerm);
    }
    e.preventDefault();
});

async function fetchData(name) {
    try {
        const apiKey = "d5e4561c";
        const moviesContainer = document.getElementById('result');
        let response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${name}`);
        let data = await response.json();
        if (data.Response === "False") {
            document.getElementById('Error-Div').style.display = 'block';
            document.getElementById('result').style.display = 'none';
            document.getElementById('error').innerHTML = data.Error;
            moviesContainer.innerHTML = '';
            return;
        }
        document.getElementById('Error-Div').style.display = 'none';
        document.getElementById('result').style.display = 'block';
        moviesContainer.innerHTML = '';
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
                            <div id="movies">
                                <div class="info">
                                    <img src="${data.Poster}"
                                        class="poster" />
                                    <div>
                                        <h2>${data.Title}</h2>
                                        <div id="rating">
                                            <h4>IMDB Rating : ${data.imdbRating}</h4>
                                        </div>
                                        
                                        <div class="details">
                                            <span>${data.Rated}</span>
                                            <span>${data.Year}</span>
                                            <span>${data.Runtime}</span>
                                        </div>
                                        <div class="gener">
                                            <div>${data.Genre}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="plot">
                                    <h3>Plot</h3>
                                    <p>${data.Plot}</p>
                                </div>
                                
                                <div class="actors">
                                    <h3>Actors</h3>
                                    <p>${data.Actors}</p>
                                </div>
                            </div>
                        `;
        moviesContainer.appendChild(movieElement);
    } catch (error) {
        alert('An error occurred while fetching movie data.');
        console.error(error);
    }

}
