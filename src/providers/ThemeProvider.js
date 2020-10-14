import React, { useState}  from 'react';

const ThemeContext = React.createContext();

const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(false);
  
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext };