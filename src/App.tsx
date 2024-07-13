import { TbListSearch, TbPokeball } from "react-icons/tb";
import { Header } from "./components/Header";
import "./global.css";
import { PiCirclesFourBold, PiMoonBold, PiSunBold } from "react-icons/pi";
import { useTheme } from "./useTheme";
import ThemeContext from "./ThemeContext";
import Pokedex from "./pages/Pokedex";

function App() {
  const themeHook = useTheme();

  if (themeHook.states.theme === "light") document.body.classList.add("light");

  let loadingStyle;

  if (themeHook.states.theme == "light") loadingStyle = "text-slate-800";
  if (themeHook.states.theme == "dark") loadingStyle = "text-slate-200";
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
      {/* (
        <div
          className={twMerge(
            "w-full h-screen px-12 pt-20 pb-4 flex flex-col justify-center items-center gap-2",
            loadingStyle
          )}
        >
          <PiCircleNotchBold className="animate-spin" size={128} />
          <span className="text-xl font-poppins font-bold">Loading...</span>
        </div>
      ) */}
      <Pokedex />
    </ThemeContext.Provider>
  );
}

export default App;
