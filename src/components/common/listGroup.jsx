import React from "react";

const ListGroup = ({
  genres,
  currentGen,
  onSelect,
  valueProperty,
  textProperty,
}) => {
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          key={genre[valueProperty]}
          onClick={() => onSelect(genre)}
          style={{ cursor: "pointer" }}
          className={
            currentGen[valueProperty] === genre[valueProperty]
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
