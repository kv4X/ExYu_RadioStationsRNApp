import React, { useState}  from 'react';

const SearchBarContext = React.createContext();

const SearchBarProvider = (props) => {
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchText, setSearchText] = useState(false);

  return (
    <SearchBarContext.Provider
      value={{
        searchStatus,
        setSearchStatus,
        searchText,
        setSearchText
      }}
    >
      {props.children}
    </SearchBarContext.Provider>
  )
}

export { SearchBarProvider, SearchBarContext };