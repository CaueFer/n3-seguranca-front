// components/CardDashboard.tsx
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { FC } from "react";

interface CardDashboardProps {
  title: string;
  value: string;
  update: string;
}

export const CardDashboard: FC<CardDashboardProps> = ({
  title,
  value,
  update,
}) => {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow @container/card">
      <div className="flex flex-col space-y-1.5 p-6 relative">
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="tracking-tight @[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {value}
        </div>
        <div className="absolute right-4 top-4">
          <Button
            variant="outline"
            className="flex items-center gap-1 text-xs font-semibold border px-2.5 py-0.5 rounded-full text-foreground"
          >
            <RefreshCcw />
          </Button>
        </div>
      </div>
      <div className="flex p-6 pt-0 flex-col items-start gap-1 text-sm">
        <div className="text-muted-foreground">{update}</div>
      </div>
    </div>
  );
};
