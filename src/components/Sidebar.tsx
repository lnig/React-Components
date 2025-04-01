import { LogOut, Menu, X } from "lucide-react";
import { createContext, useState, useContext, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarContext = createContext({});

type SidebarProps = {
  background?: string,
  children: ReactNode,
  onLogout?: () => void,
};

export default function Sidebar({ children, onLogout, background = "#fcfcfc" }: SidebarProps) {
  return (
    <aside className="z-50 pb-1 lg:h-full w-full lg:w-64 bg-white"
      style={{background: background}}
      >
      <nav className="h-full flex flex-col">
        <SidebarContext.Provider value={{}}>
          <ul
            className={`
              flex-1 px-3 mt-5 lg:block
              lg:h-auto lg:overflow-y-auto
              overflow-y-auto max-h-[calc(100vh-64px)]
            `}
          >
            {children}
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

type SidebarItemProps = {
  text: string,
  path: string,
  Icon: React.ElementType,
  onClick?: () => void,
  badge?: boolean,
  primaryColor?: string,
  hoverColor?: string,
  textColor?: string
};

export const SidebarItem: React.FC<SidebarItemProps> = ({
  text,
  path,
  Icon,
  onClick,
  badge = false,
  primaryColor,
  hoverColor,
  textColor
}) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      onClick={onClick}
      className={`relative flex items-center py-3 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
        isActive ? "bg-primary-100 text-primary-500" : "hover:bg-textBg-200 text-textBg-600"
      }`}
    >
      <Icon />
      <span className="w-52 ml-3">{text}</span>
      {badge && <div className="absolute right-2 w-2 h-2 rounded bg-primary-500" />}
    </Link>
  );
};
