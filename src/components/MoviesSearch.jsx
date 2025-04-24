import React from "react";
import "./Movies.css";

const MoviesSearch = (props) => {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSearch(props.value);
  };

  const handleClear = () => {
    props.onChange("");
    props.onSearch("");
  };

  return (
    <div className="search-container">
      <div className="row">
        <input
          type="text"
          value={props.value}
          onChange={handleChange}
          placeholder={props.placeholder}
          className="col-md-7"
        ></input>
        <button type="submit" className="col-sm-2" onClick={handleSubmit}>
          🔍
        </button>
        <button type="submit" className="col-sm-2" onClick={handleClear}>
          ❌
        </button>
      </div>
    </div>
  );
};

export default MoviesSearch;
