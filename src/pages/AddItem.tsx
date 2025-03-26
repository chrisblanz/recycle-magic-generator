
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/header';
import { QRCodeGenerator } from '@/components/qr-code-generator';
import { useItems } from '@/hooks/use-items';
import { motion } from 'framer-motion';

const AddItem = () => {
  const { createItem } = useItems();
  const navigate = useNavigate();
  
  // Create a new item when the component mounts
  useEffect(() => {
    const newItem = createItem();
    
    // Set up print handler
    const handlePrint = () => {
      // In a real app, we would handle printing here
      // For this demo, we'll just wait a bit and then redirect
      setTimeout(() => {
        navigate(`/items/${newItem.id}`);
      }, 500);
    };

    // Setup print handler for QR code
    window.onafterprint = handlePrint;
    
    return () => {
      window.onafterprint = null;
    };
  }, [createItem, navigate]);

  const handlePrintClick = () => {
    // Trigger print dialog
    window.print();
  };

  const handleContinue = (id: string) => {
    navigate(`/items/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-2">
              New Item Created
            </h1>
            <p className="text-muted-foreground text-lg">
              Print the QR code and attach it to the item
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-card shadow-sm rounded-xl p-6 border max-w-md mx-auto"
          >
            <div className="mb-6">
              <QRCodeGenerator 
                qrCodeUrl="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=example" 
                onPrint={handlePrintClick}
              />
            </div>
            
            <div className="text-center text-sm text-muted-foreground mt-4">
              <p>Use this QR code to identify and track this item through the recycling process.</p>
            </div>
          </motion.div>
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

export default AddItem;
