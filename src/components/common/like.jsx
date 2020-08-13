import React from "react";

const Like = ({ liked, onPress }) => {
  let classes = "fa fa-heart fa-2x";
  if (!liked) classes = "fa fa-heart-o fa-2x";
  return (
    <i
      onClick={onPress}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
