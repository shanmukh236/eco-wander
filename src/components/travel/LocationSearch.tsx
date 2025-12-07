import { useState, useEffect, useRef } from 'react';
import { MapPin, X, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

// Popular Indian cities/locations for suggestions
const popularLocations = [
  "New Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad",
  "Jaipur", "Udaipur", "Goa", "Kerala", "Rishikesh", "Varanasi",
  "Agra", "Shimla", "Manali", "Darjeeling", "Munnar", "Coorg",
  "Ladakh", "Kaziranga", "Sundarbans", "Andaman Islands", "Hampi",
  "Rann of Kutch", "Jodhpur", "Mysore", "Ooty", "Pondicherry",
  "Amritsar", "Leh", "Gangtok", "Shillong", "Jim Corbett"
];

interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon?: 'from' | 'to';
}

const LocationSearch = ({ value, onChange, placeholder, icon = 'from' }: LocationSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = popularLocations.filter(loc =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered.slice(0, 6));
    } else {
      setFilteredLocations(popularLocations.slice(0, 6));
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <MapPin className={`absolute left-3 top-3 h-5 w-5 ${icon === 'from' ? 'text-primary' : 'text-accent'}`} />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      <AnimatePresence>
        {isOpen && filteredLocations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
          >
            {filteredLocations.map((location) => (
              <button
                key={location}
                type="button"
                onClick={() => {
                  onChange(location);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-3 transition-colors"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
                <span>{location}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationSearch;
