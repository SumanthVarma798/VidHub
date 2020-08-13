import React, { Component } from "react";
import { getCurrentUser } from "../services/authService";
import Table from "./common/table";
import Like from "./common/like";

class MovieTable extends Component {
  columns = [
    {
      path: "title",
      label: "Movie",
      content: (item) => (
        <button
          className="btn btn-outline-link text-primary"
          onClick={() => this.props.onPress(item)}
        >
          {item.title}
        </button>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Quantity" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "Like",
      label: "Like?",
      content: (item) => (
        <Like liked={item.liked} onPress={() => this.props.onLike(item)} />
      ),
    },
  ];

  editColumn = {
    key: "Edit",
    content: (item) => (
      <button
        onClick={() => this.props.onEdit(item)}
        className="btn btn-outline-info btn-sm"
      >
        <i className="fa fa-pencil pr-2" />
        Edit
      </button>
    ),
  };

  deleteColumn = {
    key: "Delete",
    content: (item) => (
      <button
        onClick={() => this.props.onDelete(item)}
        className="btn btn-outline-danger btn-sm"
      >
        <i className="fa fa-trash-o pr-2" />
        Remove
      </button>
    ),
  };

  render() {
    const { movies, onSort, sortColumn } = this.props;
    const user = getCurrentUser();
    if (user && user.isAdmin)
      this.columns.push(this.editColumn, this.deleteColumn);
    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        data={movies}
      />
    );
  }
}

export default MovieTable;
