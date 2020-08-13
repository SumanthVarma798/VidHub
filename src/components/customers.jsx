import React from "react";
import { Link } from "react-router-dom";

const Customers = () => {
  return (
    <React.Fragment>
      <h1>Customers</h1>
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

export default Customers;
