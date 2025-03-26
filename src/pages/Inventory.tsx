
import { Header } from '@/components/header';
import { useItems } from '@/hooks/use-items';
import { ItemGrid } from '@/components/item-grid';
import { ItemStatus } from '@/types';
import { motion } from 'framer-motion';

const Inventory = () => {
  const { items, isLoading, updateItemStatus } = useItems();
  
  const handleStatusChange = (id: string, status: ItemStatus) => {
    updateItemStatus(id, status);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2 mb-8"
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-2">
              Inventory Management
            </h1>
            <p className="text-muted-foreground text-lg">
              View, search, and manage all recycled items
            </p>
          </motion.div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse text-center">
                <p className="text-muted-foreground">Loading inventory...</p>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border">
              <h3 className="text-xl font-medium mb-2">No Items Found</h3>
              <p className="text-muted-foreground mb-4">
                Your inventory is currently empty. Add some items to get started.
              </p>
              <a href="/add-item" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Add New Item
              </a>
            </div>
          ) : (
            <div className="bg-card rounded-xl border shadow-sm p-6">
              <ItemGrid 
                items={items}
                onStatusChange={handleStatusChange}
              />
            </div>
          )}
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

export default Inventory;
