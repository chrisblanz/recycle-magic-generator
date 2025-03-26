
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface QRCodeGeneratorProps {
  qrCodeUrl: string;
  onPrint?: () => void;
}

export function QRCodeGenerator({ qrCodeUrl, onPrint }: QRCodeGeneratorProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrint = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      if (onPrint) onPrint();
    }, 800);
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardContent className="p-6 flex flex-col items-center space-y-4">
        <div className="relative">
          <motion.div
            animate={isAnimating ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="p-3 bg-white rounded-lg shadow-sm border">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-48 h-48 object-contain"
              />
            </div>
          </motion.div>
          {isAnimating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.2, 1.4] }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-primary/20 rounded-lg z-0 flex items-center justify-center"
            />
          )}
        </div>
        
        <div className="flex flex-col w-full gap-2">
          <Button variant="default" onClick={handlePrint}>
            Print QR Code
          </Button>
          <Button variant="outline" onClick={() => window.open(qrCodeUrl, '_blank')}>
            Download QR Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
