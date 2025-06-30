import Sidebar from "@/components/ui/navs/sidebar";
import TabSelector from "@/components/view/relatorio/tabSelector";

export default function PageRelatorios() {
  return (
    <div className="relative flex flex-row w-screen h-screen">
      <Sidebar />
      <div className="flex flex-col gap-2">
        <TabSelector />
      </div>
    </div>
  );
}
