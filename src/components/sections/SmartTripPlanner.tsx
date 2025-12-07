import { useState } from 'react';
import { motion } from 'framer-motion';
import { Route, Calendar, Wallet, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import LocationSearch from '@/components/travel/LocationSearch';
import WaypointSelector from '@/components/travel/WaypointSelector';
import TravelPlanResult from '@/components/travel/TravelPlanResult';
import { useNavigate } from 'react-router-dom';

const budgetRanges = [
  { value: 'budget', label: 'Budget (Under ₹2,000)' },
  { value: 'moderate', label: 'Moderate (₹2,000 - ₹5,000)' },
  { value: 'comfort', label: 'Comfort (₹5,000 - ₹10,000)' },
  { value: 'premium', label: 'Premium (Above ₹10,000)' },
];

const SmartTripPlanner = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [waypoints, setWaypoints] = useState<string[]>([]);
  const [travelDate, setTravelDate] = useState('');
  const [budget, setBudget] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState<any>(null);
  
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePlanTrip = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to plan and save your trips.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (!fromLocation || !toLocation) {
      toast({
        title: "Missing Information",
        description: "Please enter both start and destination locations.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTravelPlan(null);

    try {
      const { data, error } = await supabase.functions.invoke('travel-planner', {
        body: {
          fromLocation,
          toLocation,
          waypoints,
          budget: budget || 'moderate',
          travelDate: travelDate || new Date().toISOString().split('T')[0],
        },
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setTravelPlan(data.travelPlan);

      // Save trip to database
      const { error: saveError } = await supabase.from('trips').insert({
        user_id: user.id,
        from_location: fromLocation,
        to_location: toLocation,
        waypoints: waypoints,
        travel_plan: data.travelPlan,
        budget_range: budget,
        travel_date: travelDate || null,
        distance_km: data.travelPlan.totalDistance,
        eco_score: Math.round(
          data.travelPlan.transportOptions.reduce((acc: number, t: any) => acc + t.ecoRating, 0) / 
          data.travelPlan.transportOptions.length * 20
        ),
      });

      if (saveError) {
        console.error('Failed to save trip:', saveError);
      }

      toast({
        title: "Trip Planned! 🌿",
        description: "Your eco-friendly travel plan is ready.",
      });
    } catch (error: any) {
      console.error('Trip planning error:', error);
      toast({
        title: "Planning Failed",
        description: error.message || "Failed to generate travel plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="trip-planner" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            AI-Powered Trip Planner
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter any location in India and let our AI create the perfect eco-friendly 
            itinerary with transport options, famous places, and environmental alerts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5 text-primary" />
                Plan Your Eco-Journey
              </CardTitle>
              <CardDescription>
                Select locations, add waypoints, and get AI-powered recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* From/To Locations */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <LocationSearch
                    value={fromLocation}
                    onChange={setFromLocation}
                    placeholder="Starting location..."
                    icon="from"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <LocationSearch
                    value={toLocation}
                    onChange={setToLocation}
                    placeholder="Destination..."
                    icon="to"
                  />
                </div>
              </div>

              {/* Waypoints */}
              <WaypointSelector
                waypoints={waypoints}
                onChange={setWaypoints}
                maxWaypoints={6}
              />

              {/* Date and Budget */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Travel Date
                  </label>
                  <Input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    Budget Range
                  </label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Plan Button */}
              <Button
                variant="eco"
                size="lg"
                className="w-full"
                onClick={handlePlanTrip}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    AI is planning your journey...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate AI Travel Plan
                  </>
                )}
              </Button>

              {!user && (
                <p className="text-center text-sm text-muted-foreground">
                  <button 
                    onClick={() => navigate('/auth')} 
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </button>
                  {' '}to save your trips and earn eco-rewards
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        {travelPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <TravelPlanResult
              plan={travelPlan}
              fromLocation={fromLocation}
              toLocation={toLocation}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SmartTripPlanner;
