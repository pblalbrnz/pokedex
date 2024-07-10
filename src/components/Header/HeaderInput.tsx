import { useState } from "react";
import { IconType } from "react-icons";
import { PiQuestionBold } from "react-icons/pi";

interface HeaderInputProps {
  icon?: IconType;
  placeholder?: string;
}

export function HeaderInput({
  placeholder = "Input",
  icon: Icon = PiQuestionBold,
}: HeaderInputProps) {
  const headerInput = document.getElementById("headerInput");

  const [inputValue, setInputValue] = useState("");

  return (
    <div
      id="wrapperInput"
      className="flex gap-2 px-4 py-2 items-center font-noto rounded bg-slate-300 cursor-pointer text-slate-800 hover:bg-blue-200 hover:text-blue-600 transition-all ease-linear group/header-input focus-within:shadow-border focus-within:shadow-blue-500"
      onClick={() => headerInput && headerInput.focus()}
      onMouseEnter={() => headerInput && headerInput.focus()}
    >
      <Icon
        size={20}
        className="group-focus-within/header-input:text-blue-600"
      />
      <input
        id="headerInput"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="w-16 bg-slate-300 group-hover/header-input:bg-blue-200 group-hover/header-input:text-blue-600 placeholder:text-slate-400 group-hover/header-input:placeholder:text-blue-400 focus:shadow-none outline-none transition-all ease-linear group-hover/header-input:w-60 group-focus-within/header-input:w-60"
      />
    </div>
  );
}
