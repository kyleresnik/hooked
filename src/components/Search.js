import React, { useState } from 'react';

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  // useState new hooks API, allows adding state to functional component.
  // useState allows on argument: initial state, then returns an array
  // containing current state (equivalent of this.state in class component)
  // and returns a function to update state (like this.setState). We are
  // passing current state as value for the search input field.

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }
  // When onChange event is called, handleSearchInputChanges function is
  // called which then calls the state update function with new value.

  const resetInputField = () => {
    setSearchValue("");
  }
  // resetInputField calls the state update function (setSearchValue)
  // with an empty string that clears the input field.

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  );
}

export default Search;