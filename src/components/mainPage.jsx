import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <React.Fragment>
      <div className="row justify-content-md-center">
        <h1 className="mb-2">Welcome to the Movie Database</h1>
      </div>
      <div className="row justify-content-md-center">
        <Link className="btn btn-primary btn-lg mt-2" to="/movies">
          <i className="fa fa-ticket pr-2" />
          Go To Movies
        </Link>
      </div>
    </React.Fragment>
  );
};

export default MainPage;
