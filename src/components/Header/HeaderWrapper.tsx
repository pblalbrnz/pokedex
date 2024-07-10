import { ReactNode } from "react";

interface HeaderWrapperProps {
  children: ReactNode;
}

export function HeaderWrapper(props: HeaderWrapperProps) {
  return (
    <header className="w-screen h-16 bg-slate-100 flex items-center px-12 py-4 gap-4">
      {props.children}
    </header>
  );
}
