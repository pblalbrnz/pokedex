import { ReactNode } from "react";

interface HeaderWrapperProps {
  children: ReactNode;
}

export function HeaderWrapper(props: HeaderWrapperProps) {
  return (
    <header className="fixed w-screen h-16 bg-slate-200 flex items-center px-12 py-4 justify-between z-50">
      {props.children}
    </header>
  );
}
