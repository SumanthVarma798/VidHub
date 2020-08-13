import http from "./httpService";

const moviesEndpoint = "movies/";

export function getMovies() {
  return http.get(moviesEndpoint);
}

export function getMovie(movieId) {
  return http.get(moviesEndpoint + movieId);
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return await http.put(moviesEndpoint + movie._id, body);
  }

  return await http.post(moviesEndpoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(moviesEndpoint + movieId);
}
