import { useState, useMemo } from "react";
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
  Bus,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const destinations = [
  {
    id: 1,
    name: "Rishikesh",
    state: "Uttarakhand",
    ecoScore: 92,
    basePrice: 2500,
    travelTime: 6,
    description: "Yoga capital with pristine Ganges views",
  },
  {
    id: 2,
    name: "Munnar",
    state: "Kerala",
    ecoScore: 95,
    basePrice: 4500,
    travelTime: 12,
    description: "Lush tea gardens and misty mountains",
  },
  {
    id: 3,
    name: "Coorg",
    state: "Karnataka",
    ecoScore: 90,
    basePrice: 3500,
    travelTime: 8,
    description: "Coffee plantations and waterfalls",
  },
  {
    id: 4,
    name: "Ladakh",
    state: "Jammu & Kashmir",
    ecoScore: 88,
    basePrice: 8000,
    travelTime: 24,
    description: "High-altitude desert with Buddhist monasteries",
  },
  {
    id: 5,
    name: "Kaziranga",
    state: "Assam",
    ecoScore: 94,
    basePrice: 5500,
    travelTime: 14,
    description: "UNESCO site with one-horned rhinos",
  },
  {
    id: 6,
    name: "Sundarbans",
    state: "West Bengal",
    ecoScore: 91,
    basePrice: 4000,
    travelTime: 10,
    description: "Largest mangrove forest & Royal Bengal Tigers",
  },
];

const budgetRanges = {
  low: { min: 0, max: 3000, label: "Budget (Under ₹3,000)" },
  medium: { min: 3000, max: 5000, label: "Moderate (₹3,000 - ₹5,000)" },
  high: { min: 5000, max: 8000, label: "Comfortable (₹5,000 - ₹8,000)" },
  luxury: { min: 8000, max: Infinity, label: "Premium (₹8,000+)" },
};

const timeRanges = {
  short: { max: 8, label: "Short Trip (Under 8 hrs)" },
  medium: { max: 14, label: "Medium Trip (8-14 hrs)" },
  long: { max: Infinity, label: "Long Trip (14+ hrs)" },
};

export function TripPlannerSection() {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");
  const [tripDuration, setTripDuration] = useState("");
  const [showResults, setShowResults] = useState(false);

  const selectedDestination = useMemo(() => {
    return destinations.find((d) => d.name === destination);
  }, [destination]);

  const filteredDestinations = useMemo(() => {
    let filtered = destinations;

    if (budget && budgetRanges[budget as keyof typeof budgetRanges]) {
      const range = budgetRanges[budget as keyof typeof budgetRanges];
      filtered = filtered.filter(
        (d) => d.basePrice >= range.min && d.basePrice <= range.max
      );
    }

    if (tripDuration && timeRanges[tripDuration as keyof typeof timeRanges]) {
      const range = timeRanges[tripDuration as keyof typeof timeRanges];
      filtered = filtered.filter((d) => d.travelTime <= range.max);
    }

    return filtered;
  }, [budget, tripDuration]);

  const getRouteOptions = () => {
    if (!selectedDestination) return [];

    const base = selectedDestination.basePrice;
    const time = selectedDestination.travelTime;

    return [
      {
        icon: Train,
        name: "Train + Local Bus",
        tag: "Recommended",
        duration: `${time}h`,
        cost: `₹${Math.round(base * 0.6)}`,
        co2Saved: "-85%",
      },
      {
        icon: Bus,
        name: "Volvo Bus",
        tag: "Budget-friendly",
        duration: `${Math.round(time * 1.2)}h`,
        cost: `₹${Math.round(base * 0.4)}`,
        co2Saved: "-70%",
      },
      {
        icon: Bike,
        name: "Bike + Train",
        tag: "Adventure",
        duration: `${Math.round(time * 1.4)}h`,
        cost: `₹${Math.round(base * 0.5)}`,
        co2Saved: "-98%",
      },
    ];
  };

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
                <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                      onChange={(e) => {
                        setBudget(e.target.value);
                        setDestination("");
                        setShowResults(false);
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    >
                      <option value="">Select budget</option>
                      {Object.entries(budgetRanges).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Trip Duration */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      Travel Time
                    </label>
                    <select
                      value={tripDuration}
                      onChange={(e) => {
                        setTripDuration(e.target.value);
                        setDestination("");
                        setShowResults(false);
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    >
                      <option value="">Select travel time</option>
                      {Object.entries(timeRanges).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Destination Selection */}
                <div className="space-y-2 mb-6">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    Choose Destination
                    {(budget || tripDuration) && (
                      <span className="text-xs text-muted-foreground ml-2">
                        ({filteredDestinations.length} matching your criteria)
                      </span>
                    )}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(budget || tripDuration
                      ? filteredDestinations
                      : destinations
                    ).map((dest) => (
                      <button
                        key={dest.id}
                        onClick={() => {
                          setDestination(dest.name);
                          setShowResults(false);
                        }}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          destination === dest.name
                            ? "border-primary bg-primary/10"
                            : "border-border bg-muted/50 hover:border-primary/50"
                        }`}
                      >
                        <p className="font-medium text-foreground text-sm">
                          {dest.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {dest.state}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-eco font-medium">
                            Eco: {dest.ecoScore}%
                          </span>
                          <span className="text-xs text-muted-foreground">
                            • ~{dest.travelTime}h
                          </span>
                        </div>
                        <p className="text-xs text-primary mt-1">
                          From ₹{dest.basePrice}
                        </p>
                      </button>
                    ))}
                  </div>
                  {(budget || tripDuration) &&
                    filteredDestinations.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No destinations match your budget and time criteria.
                        Try adjusting your filters.
                      </p>
                    )}
                </div>

                <Button onClick={handlePlan} className="w-full" size="lg">
                  Generate Eco-Route
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Preview */}
          {showResults && selectedDestination && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <Card>
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-foreground">
                        {departure} → {selectedDestination.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {selectedDestination.description}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eco/20 text-eco font-medium whitespace-nowrap">
                      <TreePine className="w-4 h-4" />
                      Eco Score: {selectedDestination.ecoScore}%
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {getRouteOptions().map((route, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <route.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {route.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {route.tag}
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
                              {route.duration}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Cost</span>
                            <span className="text-foreground">{route.cost}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              CO₂ saved
                            </span>
                            <span className="text-eco font-medium">
                              {route.co2Saved}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tips Card */}
                  <div className="mt-6 p-4 rounded-xl bg-sage/20 border border-sage">
                    <h4 className="font-medium text-foreground mb-3">
                      💡 Eco Tips for {selectedDestination.name}
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <li>• Book trains 2 weeks early for best prices</li>
                      <li>• Carry reusable water bottle & bags</li>
                      <li>• Stay at eco-certified accommodations</li>
                      <li>• Support local artisans & eateries</li>
                      <li>• Complete eco-missions for bonus rewards</li>
                      <li>• Avoid single-use plastics</li>
                    </ul>
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
