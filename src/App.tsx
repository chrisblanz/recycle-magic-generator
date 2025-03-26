
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Inventory from "./pages/Inventory";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";
import NotFound from "./pages/NotFound";

// Add framer-motion
import("framer-motion");

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AnimatePresence mode="wait">
              <Index />
            </AnimatePresence>
          } />
          <Route path="/inventory" element={
            <AnimatePresence mode="wait">
              <Inventory />
            </AnimatePresence>
          } />
          <Route path="/add-item" element={
            <AnimatePresence mode="wait">
              <AddItem />
            </AnimatePresence>
          } />
          <Route path="/items/:id" element={
            <AnimatePresence mode="wait">
              <ItemDetails />
            </AnimatePresence>
          } />
          <Route path="*" element={
            <AnimatePresence mode="wait">
              <NotFound />
            </AnimatePresence>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
