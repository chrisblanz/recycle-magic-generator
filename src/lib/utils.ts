
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Item, ItemStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const generateQRCode = (id: string): string => {
  // In a real app, we'd use a QR code library, but for now we'll just return the ID
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}`;
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getStatusColor = (status: ItemStatus): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'scrap':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'sell':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const generateItemDescription = (item: Item): string => {
  if (!item.details || !item.measurements) {
    return "Item description pending. Please complete item details.";
  }

  const { make, model, year, condition, specs } = item.details;
  const { height, width, depth, weight } = item.measurements;
  
  let description = '';
  
  // Basic information
  if (make && model) {
    description += `${year ? year + ' ' : ''}${make} ${model} `;
  }
  
  if (item.name) {
    if (!make && !model) {
      description += `${item.name} `;
    } else if (item.name !== `${make} ${model}`) {
      description += `- ${item.name} `;
    }
  }
  
  // Add condition
  if (condition) {
    description += `in ${condition} condition. `;
  } else {
    description += `. `;
  }
  
  // Add measurements
  const dimensionsAvailable = height || width || depth;
  if (dimensionsAvailable) {
    description += `Dimensions: `;
    if (height) description += `Height: ${height}″ `;
    if (width) description += `Width: ${width}″ `;
    if (depth) description += `Depth: ${depth}″ `;
  }
  
  if (weight) {
    description += `Weight: ${weight} lbs. `;
  }
  
  // Add specs if available
  if (specs && Object.keys(specs).length > 0) {
    description += `\n\nSpecifications: `;
    Object.entries(specs).forEach(([key, value]) => {
      description += `\n- ${key}: ${value}`;
    });
  }
  
  return description;
};

// Mock function to load items from localStorage
export const loadItems = (): Item[] => {
  const savedItems = localStorage.getItem('recycleItems');
  return savedItems ? JSON.parse(savedItems) : [];
};

// Mock function to save items to localStorage
export const saveItems = (items: Item[]): void => {
  localStorage.setItem('recycleItems', JSON.stringify(items));
};

// Filter items by different criteria
export const filterItems = (
  items: Item[], 
  status?: ItemStatus,
  search?: string
): Item[] => {
  return items.filter(item => {
    // Filter by status if provided
    if (status && item.status !== status) {
      return false;
    }
    
    // Filter by search term if provided
    if (search) {
      const searchLower = search.toLowerCase();
      const nameMatch = item.name?.toLowerCase().includes(searchLower);
      const makeMatch = item.details?.make?.toLowerCase().includes(searchLower);
      const modelMatch = item.details?.model?.toLowerCase().includes(searchLower);
      
      if (!nameMatch && !makeMatch && !modelMatch) {
        return false;
      }
    }
    
    return true;
  });
};
