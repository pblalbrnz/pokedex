import { useContext, useState } from "react";
import { IconType } from "react-icons";
import { PiMagnifyingGlassBold, PiQuestionBold, PiXBold } from "react-icons/pi";
import ThemeContext from "../../ThemeContext";
import { twMerge } from "tailwind-merge";

interface HeaderInputProps {
  icon?: IconType;
  placeholder?: string;
  onSearch: (query: string) => void;
}

export function HeaderInput({
  placeholder = "Input",
  icon: Icon = PiQuestionBold,
  ...props
}: HeaderInputProps) {
  const theme = useContext(ThemeContext);

  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    props.onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission or other default behavior
      props.onSearch(query);
    }
  };

  let divStyle, iconStyle, inputStyle, searchStyle;

  if (theme === "light") {
    divStyle =
      "bg-slate-300 text-slate-800 hover:bg-blue-200 hover:text-blue-600 focus-within:shadow-blue-500";
    iconStyle = "group-focus-within/header-input:text-blue-600";
    searchStyle =
      "bg-blue-400 text-slate-200 hover:bg-blue-500 hover:text-slate-300";
    inputStyle =
      "bg-slate-300 group-hover/header-input:bg-blue-200 group-hover/header-input:text-blue-600 placeholder:text-slate-400 group-hover/header-input:placeholder:text-blue-400 ";
  }
  if (theme === "dark") {
    divStyle =
      "bg-slate-700 text-slate-100 hover:bg-blue-600 hover:text-blue-200 focus-within:shadow-blue-300";
    iconStyle = "group-focus-within/header-input:text-blue-200";
    searchStyle =
      "bg-slate-400 text-slate-200 hover:bg-blue-400 hover:text-slate-600";
    inputStyle =
      "bg-slate-700 group-hover/header-input:bg-blue-600 group-hover/header-input:text-blue-200 placeholder:text-slate-500 group-hover/header-input:placeholder:text-blue-300 ";
  }

  const headerInput = document.getElementById("headerInput");

  return (
    <div
      id="wrapperInput"
      className={twMerge(
        "flex gap-2 pl-4 pr-1 items-center font-noto rounded cursor-pointer transition-all ease-linear group/header-input focus-within:shadow-border",
        divStyle
      )}
      onClick={() => headerInput && headerInput.focus()}
      onMouseEnter={() => headerInput && headerInput.focus()}
    >
      <Icon size={20} className={iconStyle} />
      <input
        id="headerInput"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder={placeholder}
        className={twMerge(
          "focus:shadow-none outline-none transition-all ease-linear w-60 group-focus-within/header-input:w-60",
          inputStyle
        )}
      />
      <button
        className="text-xs hidden group-focus-within/header-input:flex group-active/header-input:flex "
        onClick={() => setQuery("")}
      >
        <PiXBold />
      </button>
      <button
        className={twMerge(
          "p-2 rounded hidden group-focus-within/header-input:flex group-active/header-input:flex transition-all ease-linear",
          searchStyle
        )}
        onClick={() => handleSearch()}
      >
        <PiMagnifyingGlassBold />
      </button>
    </div>
  );
}
