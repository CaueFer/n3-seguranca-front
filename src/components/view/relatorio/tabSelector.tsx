import React from "react";
import { ChevronDown, Columns2, Plus } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabSelector = () => {
  return (
    <div className="flex items-center justify-between px-4 lg:px-6">
      <label htmlFor="view-selector" className="sr-only">
        View
      </label>
      <Select defaultValue="outline">
        <SelectTrigger
          id="view-selector"
          className="h-9 w-fit flex items-center justify-between px-3 py-2 text-sm border rounded-md bg-transparent shadow-sm focus:outline-none focus:ring-1 focus:ring-ring @4xl/main:hidden"
        >
          <SelectValue placeholder="View" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="outline">Outline</SelectItem>
          <SelectItem value="past-performance">Past Performance</SelectItem>
          <SelectItem value="key-personnel">Key Personnel</SelectItem>
          <SelectItem value="focus-documents">Focus Documents</SelectItem>
        </SelectContent>
      </Select>

      {/* Desktop tabs */}
      <Tabs defaultValue="outline" className="hidden @4xl/main:flex">
        <TabsList>
          <TabsTrigger value="outline">Outline</TabsTrigger>
          <TabsTrigger value="past-performance">
            Past Performance
            <div className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30 text-xs font-semibold">
              3
            </div>
          </TabsTrigger>
          <TabsTrigger value="key-personnel">
            Key Personnel
            <div className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30 text-xs font-semibold">
              2
            </div>
          </TabsTrigger>
          <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="lg" className="h-8 gap-2 text-xs">
              <Columns2 className="size-4" />
              <span className="hidden lg:inline">Customize Columns</span>
              <span className="lg:hidden">Columns</span>
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Coluna 1</DropdownMenuItem>
            <DropdownMenuItem>Coluna 2</DropdownMenuItem>
            <DropdownMenuItem>Coluna 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="lg" className="h-8 gap-2 text-xs">
          <Plus className="size-4" />
          <span className="hidden lg:inline">Add Section</span>
        </Button>
      </div>
    </div>
  );
};

export default TabSelector;
