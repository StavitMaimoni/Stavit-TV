const API_KEY = "08cc33bd5ae3a747598ce2ad84376e66";
const BASE_URL = 'https://api.themoviedb.org/3';

const requests = {
    getSearchMovie: (searchText: string) => `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${searchText}`,
    //Movies genres:
    fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
    fetchMovieTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
    fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
    fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
    fetchDocumentariesMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
    //TV shows genres:
    fetchSeriesTopRated: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchSeriesAction: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10759`,
    fetchSeriesMystery: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=9648`,
    fetchSeriesReality: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10764`,
    fetchDocumentariesSeries: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=99`,
    //Kids TV shows genres:
    fetchSeriesComedy: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=35`,
    fetchSeriesKids: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10762`,
    fetchSeriesFamily: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10751`,
    fetchSeriesScienceFiction: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10765`,
    //Kids movies genres:
    fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
    fetchAnimationsMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=16`,
    fetchFantasyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=14`,
    fetchScienceFictionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=878`,
}

export default requests;
