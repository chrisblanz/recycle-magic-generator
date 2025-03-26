
import { useState, useEffect } from 'react';
import { Item, ItemStatus } from '@/types';
import { generateUniqueId, generateQRCode, loadItems, saveItems } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load items on mount
  useEffect(() => {
    try {
      const savedItems = loadItems();
      setItems(savedItems);
    } catch (error) {
      console.error('Failed to load items:', error);
      toast({
        title: 'Error',
        description: 'Failed to load items',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Save items whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        saveItems(items);
      } catch (error) {
        console.error('Failed to save items:', error);
        toast({
          title: 'Error',
          description: 'Failed to save items',
          variant: 'destructive',
        });
      }
    }
  }, [items, isLoading, toast]);

  // Create a new item
  const createItem = () => {
    const id = generateUniqueId();
    const newItem: Item = {
      id,
      qrCode: generateQRCode(id),
      timestamp: new Date().toISOString(),
      status: 'pending',
    };
    
    setItems(prev => [newItem, ...prev]);
    
    toast({
      title: 'Item Created',
      description: 'New item has been created with a QR code',
    });
    
    return newItem;
  };

  // Update an item
  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
    
    toast({
      title: 'Item Updated',
      description: 'Item details have been updated',
    });
  };

  // Update item status
  const updateItemStatus = (id: string, status: ItemStatus) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status } : item
      )
    );
    
    toast({
      title: 'Status Updated',
      description: `Item marked as ${status}`,
    });
  };

  // Delete an item
  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: 'Item Deleted',
      description: 'Item has been removed',
    });
  };

  return {
    items,
    isLoading,
    createItem,
    updateItem,
    updateItemStatus,
    deleteItem,
  };
};
