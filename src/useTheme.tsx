import { useContext, useState } from "react";
import ThemeContext from "./ThemeContext";

export function useTheme() {
  const themeCtx = useContext(ThemeContext);
  const [theme, setTheme] = useState(themeCtx);

  function handleTheme() {
    if (theme === "light")
      setTheme("dark"), document.body.classList.replace("light", "dark");
    else {
      setTheme("light");
      if (document.body.classList.contains("dark"))
        document.body.classList.replace("dark", "light");
    }
  }

  return { actions: { handleTheme }, states: { theme, themeCtx } };
}
