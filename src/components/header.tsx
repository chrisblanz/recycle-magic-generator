
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border"
    >
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-5 h-5 text-white"
            >
              <path d="M21 8V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1" />
              <path d="M16 12V8" />
              <path d="M8 12V8" />
              <path d="M3 8h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
              <path d="m12 16 4-4" />
              <path d="m12 16-4-4" />
            </svg>
          </div>
          <span className="text-xl font-medium">RecycleMagic</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/inventory" className="text-sm font-medium hover:text-primary transition-colors">
            Inventory
          </Link>
          <Link to="/add-item" className="text-sm font-medium hover:text-primary transition-colors">
            Add Item
          </Link>
        </nav>
        <div className="md:hidden">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted"
            aria-label="Toggle mobile menu"
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
              className="h-5 w-5"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
