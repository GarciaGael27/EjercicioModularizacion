import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import IconMoon from "../Icons/IconMoon";    
import IconSun from "../Icons/IconSun";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="theme-switcher">
      {theme === "light" ? <IconMoon /> : <IconSun />}
    </button>
  );
};

export default ThemeSwitcher;
