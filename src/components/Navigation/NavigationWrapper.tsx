import { ReactNode } from "react";

interface NavigationWrapperProps {
  children: ReactNode;
}

export function NavigationWrapper(props: NavigationWrapperProps) {
  return <div className="w-full pb-4 flex gap-2 px-12 justify-center">{props.children}</div>;
}
