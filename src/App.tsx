import { TbPokeball } from "react-icons/tb";
import { Header } from "./components/Header";
import "./global.css";
import { PiCirclesFourBold } from "react-icons/pi";

function App() {
  return (
    <>
      <Header.Wrapper>
        <Header.Button placeholder="Pokemons" icon={TbPokeball} />
        <Header.Input placeholder="Greeninja" icon={PiCirclesFourBold} />
      </Header.Wrapper>
    </>
  );
}

export default App;
