import React, { Component } from "react";

class TableHeader extends Component {
  rasieSort = (path) => {
    const sortCol = { ...this.props.sortColumn };
    if (sortCol.path === path)
      sortCol.order = sortCol.order === "asc" ? "desc" : "asc";
    else {
      sortCol.path = path;
      sortCol.order = "asc";
    }
    this.props.onSort(sortCol);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (
      column.path !== sortColumn.path ||
      column.key === "Like" ||
      column.key === "Delete" ||
      column.key === "Edit"
    )
      return null;
    if (sortColumn.order === "asc")
      return <i className="fa fa-arrow-circle-up" />;
    return <i className="fa fa-arrow-circle-down" />;
  };

  render() {
    const { columns } = this.props;
    return (
      <thead className="table table-hover">
        <tr className="table-primary">
          {columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.rasieSort(column.path)}
            >
              <div className="row text-center">
                <div className="col text-center">
                  <h5>{column.label}</h5>
                </div>
                <div className="col-4 align-self.center">
                  <h5>{this.renderSortIcon(column)}</h5>
                </div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
