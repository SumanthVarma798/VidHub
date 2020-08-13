import React from "react";
import TableHeader from "./tableheader";
import TableBody from "./tableBody";

const Table = ({ columns, onSort, sortColumn, data }) => {
  return (
    <table className="table table-hover">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
