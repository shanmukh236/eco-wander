import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Wallet,
  ArrowRight,
  Train,
  Bike,
  TreePine,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function TripPlannerSection() {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handlePlan = () => {
    if (departure && destination) {
      setShowResults(true);
    }
  };

  return (
    <section id="plan" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-primary font-medium mb-4">
            <TreePine className="w-4 h-4" />
            Smart Planning
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Plan Your Eco-Trip
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get personalized itineraries that minimize your carbon footprint
            while maximizing your experience. Smart routes, green stays, and
            sustainable tips.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {/* Departure */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      From
                    </label>
                    <input
                      type="text"
                      placeholder="Departure city"
                      value={departure}
                      onChange={(e) => setDeparture(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>

                  {/* Destination */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      To
                    </label>
                    <input
                      type="text"
                      placeholder="Destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      When
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Wallet className="w-4 h-4 text-primary" />
                      Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    >
                      <option value="">Select budget</option>
                      <option value="low">Budget-friendly</option>
                      <option value="medium">Moderate</option>
                      <option value="high">Comfortable</option>
                      <option value="luxury">Premium eco</option>
                    </select>
                  </div>
                </div>

                <Button
                  onClick={handlePlan}
                  className="w-full"
                  size="lg"
                >
                  Generate Eco-Route
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Preview */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif text-2xl font-bold text-foreground">
                      Your Eco-Route
                    </h3>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eco/20 text-eco font-medium">
                      <TreePine className="w-4 h-4" />
                      Saves 85kg CO₂
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Route Option 1 */}
                    <div className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary transition-colors cursor-pointer">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Train className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            High-Speed Rail
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Recommended
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Duration
                          </span>
                          <span className="text-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            4h 30m
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cost</span>
                          <span className="text-foreground">~€65</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            CO₂ saved
                          </span>
                          <span className="text-eco font-medium">-85%</span>
                        </div>
                      </div>
                    </div>

                    {/* Route Option 2 */}
                    <div className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary transition-colors cursor-pointer">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bike className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            Bike + Train
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Adventure
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Duration
                          </span>
                          <span className="text-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            6h 15m
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cost</span>
                          <span className="text-foreground">~€45</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            CO₂ saved
                          </span>
                          <span className="text-eco font-medium">-98%</span>
                        </div>
                      </div>
                    </div>

                    {/* Tips Card */}
                    <div className="p-4 rounded-xl bg-sage/20 border border-sage">
                      <h4 className="font-medium text-foreground mb-3">
                        💡 Eco Tips
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Book trains 2 weeks early for best prices</li>
                        <li>• Bring a reusable water bottle</li>
                        <li>• Stay at eco-certified accommodations</li>
                        <li>• Complete eco-missions for bonus rewards</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
