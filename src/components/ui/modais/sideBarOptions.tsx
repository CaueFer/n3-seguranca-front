"use client";

import { LogOut, Settings, User as UserIcon } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { clientCookie } from "@/lib/hooks/getClientCookie";
import { useRouter } from "next/navigation";

export function SideBarOptions() {
  const router = useRouter();
  const cookie = clientCookie();

  const handleLogout = () => {
    cookie.remove("token");

    router.replace("/login");
  };

  return (
    <div className="absolute bottom-[10px] left-[30px] w-[200px]">
      <Command className="rounded-xl border bg-primary-foreground text-black shadow @container/card">
        <CommandList>
          <CommandGroup heading="Opções">
            <div className="text-black relative flex gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer hover:bg-accent">
              <UserIcon />
              <span>Perfil</span>
            </div>
            <div className="text-black relative flex gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer hover:bg-accent">
              <Settings />
              <span>Configurações</span>
            </div>

            <CommandSeparator />

            <div
              className="mt-2 text-red-500 relative flex gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer hover:bg-accent hover:text-red-600"
              onClick={() => handleLogout()}
            >
              <LogOut />
              <span>Sair</span>
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
