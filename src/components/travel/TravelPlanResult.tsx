import { motion } from 'framer-motion';
import { 
  MapPin, Train, Bus, Car, Plane, Leaf, AlertTriangle, 
  Clock, IndianRupee, Calendar, Star, TreePine
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TravelPlan {
  famousPlaces: Array<{
    name: string;
    description: string;
    ecoScore: number;
    distanceFromRoute: number;
    bestTimeToVisit: string;
    entryFee: string;
  }>;
  transportOptions: Array<{
    mode: string;
    name: string;
    duration: string;
    cost: string;
    carbonFootprint: string;
    ecoRating: number;
    frequency: string;
    bookingTip: string;
  }>;
  ecoTips: string[];
  totalDistance: number;
  estimatedBudget: string;
  suggestedItinerary?: Array<{
    day: number;
    activities: string[];
    transport: string;
    accommodation: string;
  }>;
  environmentalAlerts?: Array<{
    type: string;
    location: string;
    severity: string;
    message: string;
    precautions: string[];
  }>;
}

interface TravelPlanResultProps {
  plan: TravelPlan;
  fromLocation: string;
  toLocation: string;
}

const getTransportIcon = (mode: string) => {
  const modeLC = mode.toLowerCase();
  if (modeLC.includes('train') || modeLC.includes('rail')) return Train;
  if (modeLC.includes('bus')) return Bus;
  if (modeLC.includes('flight') || modeLC.includes('air')) return Plane;
  return Car;
};

const getEcoColor = (rating: number) => {
  if (rating >= 4) return 'text-primary';
  if (rating >= 3) return 'text-accent';
  return 'text-muted-foreground';
};

const TravelPlanResult = ({ plan, fromLocation, toLocation }: TravelPlanResultProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Journey</p>
                <p className="font-semibold">{fromLocation} → {toLocation}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="font-semibold">{plan.totalDistance} km</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <IndianRupee className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Est. Budget</p>
                <p className="font-semibold">{plan.estimatedBudget}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Alerts */}
      {plan.environmentalAlerts && plan.environmentalAlerts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-display font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Environmental Alerts
          </h3>
          <div className="grid gap-4">
            {plan.environmentalAlerts.map((alert, index) => (
              <Card 
                key={index} 
                className={`border-l-4 ${
                  alert.severity === 'high' ? 'border-l-destructive bg-destructive/5' :
                  alert.severity === 'medium' ? 'border-l-yellow-500 bg-yellow-50/50' :
                  'border-l-muted bg-muted/20'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-medium">{alert.location}</span>
                    <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>
                      {alert.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                  {alert.precautions.length > 0 && (
                    <ul className="text-sm space-y-1">
                      {alert.precautions.map((p, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Transport Options */}
      <div className="space-y-4">
        <h3 className="text-lg font-display font-semibold flex items-center gap-2">
          <Train className="h-5 w-5 text-primary" />
          Transport Options
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {plan.transportOptions.map((transport, index) => {
            const Icon = getTransportIcon(transport.mode);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted p-2 rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{transport.name}</p>
                          <p className="text-sm text-muted-foreground">{transport.mode}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Leaf
                            key={i}
                            className={`h-3 w-3 ${
                              i < transport.ecoRating ? 'text-primary' : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{transport.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        <span>{transport.cost}</span>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={getEcoColor(transport.ecoRating)}
                    >
                      {transport.carbonFootprint} Carbon
                    </Badge>
                    {transport.bookingTip && (
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        💡 {transport.bookingTip}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Famous Places */}
      <div className="space-y-4">
        <h3 className="text-lg font-display font-semibold flex items-center gap-2">
          <Star className="h-5 w-5 text-accent" />
          Famous Places Along the Route
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plan.famousPlaces.map((place, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{place.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {place.distanceFromRoute}km away
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{place.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="flex items-center gap-1 text-primary">
                      <Leaf className="h-3 w-3" />
                      Eco: {place.ecoScore}%
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {place.bestTimeToVisit}
                    </span>
                    <span className="flex items-center gap-1">
                      <IndianRupee className="h-3 w-3" />
                      {place.entryFee}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Itinerary */}
      {plan.suggestedItinerary && plan.suggestedItinerary.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-display font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Suggested Itinerary
          </h3>
          <div className="space-y-4">
            {plan.suggestedItinerary.map((day, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Day {day.day}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">Activities:</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {day.activities.map((activity, i) => (
                        <li key={i}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Train className="h-4 w-4" /> {day.transport}
                    </span>
                    <span className="flex items-center gap-1">
                      <TreePine className="h-4 w-4" /> {day.accommodation}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Eco Tips */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            Eco-Friendly Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {plan.ecoTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TravelPlanResult;
