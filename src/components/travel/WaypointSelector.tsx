import { useState } from 'react';
import { Plus, X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LocationSearch from './LocationSearch';
import { motion, AnimatePresence } from 'framer-motion';

interface WaypointSelectorProps {
  waypoints: string[];
  onChange: (waypoints: string[]) => void;
  maxWaypoints?: number;
}

const WaypointSelector = ({ waypoints, onChange, maxWaypoints = 6 }: WaypointSelectorProps) => {
  const [newWaypoint, setNewWaypoint] = useState('');

  const addWaypoint = () => {
    if (newWaypoint.trim() && waypoints.length < maxWaypoints) {
      onChange([...waypoints, newWaypoint.trim()]);
      setNewWaypoint('');
    }
  };

  const removeWaypoint = (index: number) => {
    onChange(waypoints.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-accent" />
        <span className="text-sm font-medium">Add stops along the way (up to {maxWaypoints})</span>
      </div>
      
      <div className="flex gap-2">
        <div className="flex-1">
          <LocationSearch
            value={newWaypoint}
            onChange={setNewWaypoint}
            placeholder="Add a waypoint..."
            icon="to"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={addWaypoint}
          disabled={!newWaypoint.trim() || waypoints.length >= maxWaypoints}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <AnimatePresence>
        {waypoints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2"
          >
            {waypoints.map((waypoint, index) => (
              <motion.div
                key={waypoint + index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Badge variant="secondary" className="py-2 px-3 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">#{index + 1}</span>
                  <span>{waypoint}</span>
                  <button
                    type="button"
                    onClick={() => removeWaypoint(index)}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WaypointSelector;
