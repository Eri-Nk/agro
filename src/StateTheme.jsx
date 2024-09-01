import { createContext, useState, useContext } from "react";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const StateTheme = ({ children }) => {
  const [isDarkTheme, setisDarkTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setisDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default StateTheme;
