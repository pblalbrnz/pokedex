import { TbListSearch, TbPokeball } from "react-icons/tb";
import { Header } from "./components/Header";
import "./global.css";
import { PiCirclesFourBold, PiMoonBold, PiSunBold } from "react-icons/pi";
import { useTheme } from "./useTheme";
import ThemeContext from "./ThemeContext";
import Pokedex from "./pages/Pokedex";
import { useEffect } from "react";

function App() {
  const themeHook = useTheme();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.add(savedTheme);
  }, []);

  if (themeHook.states.theme === "light") document.body.classList.add("light");

  return (
    <ThemeContext.Provider value={themeHook.states.theme}>
      <Header.Wrapper>
        <div className="flex gap-4">
          <Header.Toggle
            title="theme"
            icons={{
              toggle: { icon: PiMoonBold },
              toggled: { icon: PiSunBold },
            }}
            toggled={themeHook.states.theme == "light" ? false : true}
            theme={themeHook.actions.handleTheme}
          />
          <Header.Button placeholder="Pokemons" icon={TbPokeball} />
          <Header.Input placeholder="Greeninja" icon={PiCirclesFourBold} />
        </div>
        <div className="flex gap-4">
          <Header.Button placeholder="Filter" icon={TbListSearch} />
        </div>
      </Header.Wrapper>
      <Pokedex />
    </ThemeContext.Provider>
  );
}

export default App;
