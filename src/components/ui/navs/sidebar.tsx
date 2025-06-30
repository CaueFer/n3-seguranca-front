"use client";

import { FC, ForwardRefExoticComponent, RefAttributes, useState } from "react";
import {
  LayoutDashboard,
  Folder,
  Users,
  Settings,
  Search,
  EllipsisVertical,
  LucideProps,
  ClipboardMinus,
  User,
} from "lucide-react";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import { SideBarOptions } from "../modais/sideBarOptions";

const Sidebar: FC = () => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <aside className="hidden md:block w-[var(--sidebar-width)] transition-width duration-200 text-sidebar-foreground group peer z-[99]">
      <div className="sticky top-0 hidden md:flex w-[var(--sidebar-width)] transition-[width,transform] duration-200 ease-linear group-data-[collapsible=offcanvas]:-translate-x-full group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+theme(spacing.4)+2px)]">
        <nav
          data-sidebar="sidebar"
          className="flex flex-col min-h-screen w-full bg-sidebar group-data-[variant=floating]:border group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm py-4"
        >
          {/* LOGO */}
          <div data-sidebar="header" className="flex flex-col gap-2 p-2">
            <ul className="flex flex-col gap-1 w-full">
              <li className="relative group/menu-item">
                <Link
                  href={"/"}
                  className="flex items-center gap-2 p-2 rounded-md text-sm h-8 font-semibold"
                >
                  <ClipboardMinus className="size-5" />

                  <span className="truncate text-base">Relatorious</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col flex-1 gap-2 p-2 w-[var(--sidebar-width)] overflow-clip">
            {/* MENU ITEMS */}
            <ul className="flex flex-col gap-1">
              <SidebarItem icon={LayoutDashboard} label="Dashboard" url="/" />
              <SidebarItem icon={Users} label="Funcionários" url="/" />
              <SidebarItem icon={Folder} label="Relatórios" url="/relatorios" />
            </ul>

            <div className="mt-auto pt-4">
              <ul className="flex flex-col gap-1">
                <SidebarItem icon={Settings} label="Configurações" url="/" />
                <SidebarItem icon={Search} label="Pesquisar" url="/" />
              </ul>

              <div className="mt-4">
                {/* USER OPTIONS */}
                <button
                  className="relative z-50 flex items-center gap-2 w-full p-2 text-sm cursor-pointer bg-primary-foreground rounded-3xl"
                  onClick={() => setShowOptions((prev) => !prev)}
                >
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <User />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium truncate">Teste</div>
                    <div className="text-xs text-muted-foreground truncate">
                      teste@teste.com
                    </div>
                  </div>
                  <EllipsisVertical className="ml-auto h-4 w-4" />

                  {showOptions && (
                    <div className="absolute top-0 left-0 z-50">
                      <SideBarOptions />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

interface SidebarItemProps {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  url: Url;
}
const SidebarItem: FC<SidebarItemProps> = ({ icon: Icon, label, url }) => (
  <li className="relative group/menu-item">
    <Link
      href={url}
      className="flex items-center gap-2 p-2 w-full rounded-md text-sm h-8 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  </li>
);

export default Sidebar;
