
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/header';
import { ItemForm } from '@/components/item-form';
import { QRCodeGenerator } from '@/components/qr-code-generator';
import { useItems } from '@/hooks/use-items';
import { StatusBadge } from '@/components/status-badge';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const ItemDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { items, updateItem, deleteItem } = useItems();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [item, setItem] = useState(items.find(item => item.id === id));
  
  useEffect(() => {
    const foundItem = items.find(item => item.id === id);
    if (foundItem) {
      setItem(foundItem);
    } else {
      toast({
        title: 'Item Not Found',
        description: 'The requested item could not be found.',
        variant: 'destructive',
      });
      navigate('/inventory');
    }
  }, [id, items, navigate, toast]);
  
  const handleSave = (updatedItem: any) => {
    updateItem(id!, updatedItem);
    toast({
      title: 'Item Updated',
      description: 'Item details have been successfully saved.',
    });
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(id!);
      toast({
        title: 'Item Deleted',
        description: 'Item has been removed from the inventory.',
      });
      navigate('/inventory');
    }
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  if (!item) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Loading...</h2>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <a 
                href="/inventory" 
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back to Inventory
              </a>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {item.name || item.details?.make || 'Item Details'}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <StatusBadge status={item.status} />
                <span className="text-sm text-muted-foreground">
                  Created: {formatDate(item.timestamp)}
                </span>
                <span className="text-sm text-muted-foreground">
                  ID: {item.id.substring(0, 8)}
                </span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex gap-2"
            >
              <Button
                variant="destructive"
                onClick={handleDelete}
              >
                Delete Item
              </Button>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 space-y-6">
                <div className="bg-card rounded-xl border shadow-sm p-6">
                  <h3 className="text-lg font-medium mb-4">QR Code</h3>
                  <QRCodeGenerator 
                    qrCodeUrl={item.qrCode} 
                    onPrint={handlePrint}
                  />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="bg-card rounded-xl border shadow-sm p-6">
                <ItemForm item={item} onSave={handleSave} />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-24 px-4 md:px-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RecycleMagic. All rights reserved.
          </p>
          <nav className="flex items-center gap-4 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default ItemDetails;
