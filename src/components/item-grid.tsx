
import { useState } from "react";
import { Item, ItemStatus } from "@/types";
import { ItemCard } from "@/components/item-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { filterItems } from "@/lib/utils";

interface ItemGridProps {
  items: Item[];
  onStatusChange?: (id: string, status: ItemStatus) => void;
}

export function ItemGrid({ items, onStatusChange }: ItemGridProps) {
  const [statusFilter, setStatusFilter] = useState<ItemStatus | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredItems = filterItems(items, statusFilter, searchTerm);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="search" className="text-sm font-medium">
            Search
          </Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by name, make or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-sm font-medium">
            Filter by Status
          </Label>
          <RadioGroup
            value={statusFilter}
            onValueChange={(value) => 
              setStatusFilter(value === "" ? undefined : value as ItemStatus)
            }
            className="flex gap-4 mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="all" />
              <Label htmlFor="all" className="cursor-pointer">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pending" id="pending" />
              <Label htmlFor="pending" className="cursor-pointer">Pending</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sell" id="sell" />
              <Label htmlFor="sell" className="cursor-pointer">Sell</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="scrap" id="scrap" />
              <Label htmlFor="scrap" className="cursor-pointer">Scrap</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      {filteredItems.length === 0 ? (
        <div className="py-12 text-center">
          <h3 className="text-lg font-medium text-muted-foreground">No items found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try changing your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard 
              key={item.id} 
              item={item} 
              onStatusChange={onStatusChange} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
