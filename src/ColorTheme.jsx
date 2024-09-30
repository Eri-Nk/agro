import { createContext, useState, useContext } from "react";

const ColorContext = createContext();
export const useTheme = () => useContext(ColorContext);

const ColorTheme = ({ children }) => {
  const [isDarkTheme, setisDarkTheme] = useState(false);

  return (
    <ColorContext.Provider value={{ isDarkTheme, setisDarkTheme }}>
      {children}
    </ColorContext.Provider>
  );
};
export default ColorTheme;
