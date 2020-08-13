import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class NewMoviesForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
      link: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(1).required().label("Movie Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(1)
      .max(100)
      .required()
      .label("Number of movies in stock"),
    dailyRentalRate: Joi.number()
      .min(1)
      .max(5)
      .required()
      .label("Daily Rental Rate"),
    link: Joi.string().uri().label("Wiki link"),
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    this.setState({ genres });

    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (err) {
      if (err.response && err.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      link: movie.link,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div className="pt-5">
        <div className="text-center pt-2">
          <h1>
            Add or Edit movies Here
            <i className="fa fa-video-camera pl-3" />
          </h1>
        </div>
        <div className="container pt-3 w-50">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Movie Title")}
            {this.renderSelect("genreId", "Genre", this.state.genres)}
            {this.renderInput("numberInStock", "Number of movies in stock")}
            {this.renderInput("dailyRentalRate", "Daily rental rate")}
            {this.renderInput("link", "Wikipedia link to the movie")}
            {this.renderLoginButton("Add", "video-camera")}
          </form>
        </div>
      </div>
    );
  }
}

export default NewMoviesForm;
