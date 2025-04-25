import React from "react";

const AddFavourite = (props) => {
  const handleClick = (e) => {
    e.stopPropagation();
    props.handleFavouritesClick();
  };

  return (
    <button
      className="heart-icon"
      onClick={handleClick}
      style={{
        color: props.isFavourite ? "red" : "black",
        background: "none",
        border: "none",
      }}
    >
      {props.isFavourite ? "❤️" : "♡"}
    </button>
  );
};

export default AddFavourite;
