import React from "react";
import { Link } from "react-router-dom";

const Rentals = () => {
  return (
    <React.Fragment>
      <h1>Rentals</h1>
      <div className="row">
        <div className="col justify-content-left mt-2">
          <Link className="btn btn-large btn-primary" to="/">
            <i className="fa fa-home pr-1" />
            Home
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Rentals;
