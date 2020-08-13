import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="container-fluid">
      <div className="row align-content-center">
        <div className="col-0">
          <i className="fa fa-search fa-2x" />
        </div>
        <div className="col">
          <input
            type="text"
            name="query"
            className="form-control mb-2"
            placeholder="Search ....."
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
