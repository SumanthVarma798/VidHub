import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="text-center text-danger text-xl-center mt-5">
        <h1>Error: 404</h1>
      </div>
      <div className="text-center mt-5">
        <h4>The page you are looking for is not found</h4>
      </div>
      <div className="text-center mt-5">
        <Link className="btn btn-lg btn-link" to="/">
          <i className="fa fa-home pr-2" />
          Back to home
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
