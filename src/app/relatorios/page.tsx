"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/ui/navs/sidebar";
import { TabsContent } from "@/components/ui/tabs";
import { TabSelector } from "@/components/view/relatorio/tabSelector";
import RelatorioForm from "@/components/view/relatorio/relatorioForm";
import { RelatoriosTable } from "@/components/view/relatorio/relatoriosTable";

import { get } from "@/lib/helpers/fetch.helper";

export default function PageRelatorios() {
  const [meusRelatorios, setMeusRelatorios] = useState([]);

  useEffect(() => {
    const getRelatorios = async () => {
      get("/relatorios/meus-relatorios")
        .then(async (res: Response) => {
          const data = await res.json();

          console.log(data.relatorios);
          setMeusRelatorios(data.relatorios);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getRelatorios();
  }, []);

  return (
    <div className="relative flex flex-row w-screen h-screen">
      <Sidebar />
      <div className="gap-2 p-5 w-full">
        <TabSelector>
          <TabsContent value="listar">
            <RelatoriosTable data={meusRelatorios} />
          </TabsContent>
          <TabsContent value="enviar">
            <RelatorioForm />
          </TabsContent>
        </TabSelector>
      </div>
    </div>
  );
}
