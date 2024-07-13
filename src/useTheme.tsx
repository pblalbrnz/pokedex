import { useContext, useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";

export function useTheme() {
  const themeCtx = useContext(ThemeContext);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : themeCtx;
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.classList.add(theme);
  }, [theme]);

  function handleTheme() {
    if (theme === "light") {
      setTheme("dark");
      document.body.classList.replace("light", "dark");
    } else {
      setTheme("light");
      document.body.classList.replace("dark", "light");
    }
  }

  return { actions: { handleTheme }, states: { theme, themeCtx } };
}
