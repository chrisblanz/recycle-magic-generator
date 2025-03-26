
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Item } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/utils";

interface ItemCardProps {
  item: Item;
  onStatusChange?: (id: string, status: 'scrap' | 'sell') => void;
}

export function ItemCard({ item, onStatusChange }: ItemCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className={`overflow-hidden h-full transition-shadow duration-300 ${isHovered ? 'shadow-lg' : 'shadow-sm'}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium truncate">
                {item.name || item.details?.make || 'Unnamed Item'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {formatDate(item.timestamp)}
              </p>
            </div>
            <StatusBadge status={item.status} />
          </div>
        </CardHeader>
        <CardContent className="flex justify-center pb-2">
          <img
            src={item.qrCode}
            alt="QR Code"
            className="w-32 h-32 object-contain my-2"
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-2 pt-0">
          {item.status === 'pending' && onStatusChange && (
            <div className="grid grid-cols-2 gap-2 w-full">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-900 border-red-200"
                onClick={() => onStatusChange(item.id, 'scrap')}
              >
                Mark as Scrap
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900 border-green-200"
                onClick={() => onStatusChange(item.id, 'sell')}
              >
                Mark for Sale
              </Button>
            </div>
          )}
          <Link to={`/items/${item.id}`} className="w-full">
            <Button variant="default" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
