
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { useItems } from '@/hooks/use-items';
import { ItemGrid } from '@/components/item-grid';
import { ItemStatus } from '@/types';

const Index = () => {
  const { items, isLoading, updateItemStatus } = useItems();
  const navigate = useNavigate();
  
  const pendingItems = items.filter(item => item.status === 'pending');
  const recentItems = items.slice(0, 8);
  
  const handleStatusChange = (id: string, status: ItemStatus) => {
    updateItemStatus(id, status);
    
    // If marked for sale, navigate to item details to fill in more information
    if (status === 'sell') {
      navigate(`/items/${id}`);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Recycle with Intelligence
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Track, assess, and manage your inventory with precision and ease.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button onClick={() => navigate('/add-item')} size="lg">
                  Add New Item
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/inventory')}
                  size="lg"
                >
                  View Inventory
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2 mb-8"
            >
              <h2 className="text-2xl font-bold tracking-tighter">
                Items Awaiting Assessment
              </h2>
              <p className="text-muted-foreground">
                Decide whether to scrap or sell these items.
              </p>
            </motion.div>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse text-center">
                  <p className="text-muted-foreground">Loading items...</p>
                </div>
              </div>
            ) : pendingItems.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border">
                <h3 className="text-xl font-medium mb-2">No Items Pending</h3>
                <p className="text-muted-foreground mb-4">
                  All items have been assessed. Add new items to get started.
                </p>
                <Button onClick={() => navigate('/add-item')}>
                  Add New Item
                </Button>
              </div>
            ) : (
              <ItemGrid 
                items={pendingItems} 
                onStatusChange={handleStatusChange} 
              />
            )}
          </div>
        </section>
        
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2 mb-8"
            >
              <h2 className="text-2xl font-bold tracking-tighter">
                Recently Added Items
              </h2>
              <p className="text-muted-foreground">
                Track and manage your most recent inventory additions.
              </p>
            </motion.div>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse text-center">
                  <p className="text-muted-foreground">Loading items...</p>
                </div>
              </div>
            ) : recentItems.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border">
                <h3 className="text-xl font-medium mb-2">No Items Added Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by adding your first item to the inventory.
                </p>
                <Button onClick={() => navigate('/add-item')}>
                  Add New Item
                </Button>
              </div>
            ) : (
              <ItemGrid items={recentItems} />
            )}
          </div>
        </section>
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

export default Index;
