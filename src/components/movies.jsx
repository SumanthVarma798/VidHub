import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MovieTable from "./movietable";
import SearchBar from "./common/searchBar";
import { Paginate } from "../utils/paginate";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentGenre: "",
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: movies } = await getMovies();
    const { data: genres } = await getGenres();
    this.setState({
      movies,
      genres: [{ _id: "", name: "All Genres" }, ...genres],
      currentGenre: { _id: "", name: "All Genres" },
    });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    this.setState({
      movies: originalMovies.filter((m) => m._id !== movie._id),
    });

    try {
      await deleteMovie(movie._id);
    } catch (exc) {
      if (exc.response && exc.response.status === 404)
        toast.error("Error occured while deleting a movie !");
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ currentGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      currentGenre: { _id: "", name: "All Genres" },
      currentPage: 1,
    });
  };

  handleEdit = (movie) => {
    if (movie._id)
      window.location.replace(`http://localhost:3000/movies/${movie._id}`);
    else window.location.replace(`http://localhost:3000/not-found`);
  };

  handleButtonPress = (movie) => {
    if (movie.link) window.open(movie.link, "_blank");
    else window.location.replace(`http://localhost:3000/movies/${movie._id}`);
  };

  getPagedData() {
    const {
      currentGenre,
      movies,
      sortColumn,
      currentPage,
      pageSize,
      searchQuery,
    } = this.state;
    let filteredMovies = movies;
    if (searchQuery)
      filteredMovies = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (currentGenre && currentGenre._id)
      filteredMovies = movies.filter((m) => m.genre._id === currentGenre._id);

    const sortedMovieList = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movieList = Paginate(sortedMovieList, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movieList };
  }

  render() {
    const {
      movies,
      pageSize,
      currentPage,
      genres,
      currentGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    const { user } = this.props;

    const { totalCount, data } = this.getPagedData();

    return (
      <div className="d-flex">
        <div className="row">
          <div className="col-3">
            <div className="row">
              <div className="col">
                <ListGroup
                  genres={genres}
                  currentGen={currentGenre}
                  onSelect={this.handleGenreSelect}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                {user && (
                  <Link
                    className="btn btn-outline-primary btn-block mt-3"
                    to="/movies/new"
                  >
                    <i className="fa fa-video-camera pr-2" />
                    Add Movie
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <SearchBar value={searchQuery} onChange={this.handleSearch} />
              {totalCount === 0 ? (
                <div className="container-fluid text-center m-5">
                  <h1>
                    <div className="container text-left">
                      <span
                        style={{ cursor: "pointer" }}
                        className="badge badge-warning"
                      >
                        {searchQuery === ""
                          ? movies.length === 0
                            ? "There are no movies to show"
                            : "There are no Movies to show in this section"
                          : "There are no movies matching the search query."}
                      </span>
                    </div>
                  </h1>
                </div>
              ) : (
                <MovieTable
                  movies={data}
                  onDelete={this.handleDelete}
                  onEdit={this.handleEdit}
                  onLike={this.handleLike}
                  onSort={this.handleSort}
                  onPress={this.handleButtonPress}
                  sortColumn={sortColumn}
                />
              )}
              <div className="row">
                <div className="col">
                  <Pagination
                    itemsCount={totalCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                  />
                </div>
                {totalCount === 0 ? (
                  ""
                ) : (
                  <div className="col">
                    <div className="container">
                      <h4>
                        <span className="badge badge-light">
                          {totalCount === 1
                            ? "There is 1 movie in the database"
                            : `There are ${totalCount} movies in the database`}
                        </span>
                      </h4>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
