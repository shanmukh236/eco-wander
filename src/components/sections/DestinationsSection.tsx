import { motion } from "framer-motion";
import { MapPin, Star, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import riverImage from "@/assets/destination-river.jpg";
import lodgeImage from "@/assets/destination-lodge.jpg";
import coastImage from "@/assets/destination-coast.jpg";

const destinations = [
  {
    id: 1,
    name: "Costa Rican Rainforest",
    location: "Costa Rica",
    image: riverImage,
    rating: 4.9,
    ecoScore: 95,
    note: "Found a hidden waterfall here. The locals call it 'Cascada Secreta'. Best at sunrise.",
    description:
      "Pristine rainforest with incredible biodiversity. Perfect for wildlife watching and sustainable tours.",
  },
  {
    id: 2,
    name: "Alpine Eco Lodge",
    location: "Swiss Alps",
    image: lodgeImage,
    rating: 4.8,
    ecoScore: 92,
    note: "Stayed three nights. Solar-powered, farm-to-table meals. The owner's grandmother makes the best apple strudel.",
    description:
      "Carbon-neutral mountain retreat with renewable energy and organic farming.",
  },
  {
    id: 3,
    name: "Coastal Dunes Reserve",
    location: "Netherlands",
    image: coastImage,
    rating: 4.7,
    ecoScore: 88,
    note: "Cycling trails connect all the villages. Watched seals at sunset. Unexpected magic.",
    description:
      "Protected natural area with sustainable tourism practices and local wildlife.",
  },
];

export function DestinationsSection() {
  return (
    <section id="explore" className="py-24 gradient-earth">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-primary font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Discover Places
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Stories & Hidden Gems
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Personal notes from fellow travelers who found magic in sustainable
            journeys. Each place holds a memory waiting to be shared.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group cursor-pointer h-full">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-sm font-medium">
                      <Star className="w-3 h-3 text-warning fill-warning" />
                      {destination.rating}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-eco/90 backdrop-blur-sm text-primary-foreground text-sm font-medium">
                      <Leaf className="w-3 h-3" />
                      {destination.ecoScore}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    {destination.location}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {destination.description}
                  </p>

                  {/* Personal Note */}
                  <div className="p-4 rounded-lg bg-sage/30 border border-sage/50 italic">
                    <p className="text-sm text-earth-light">
                      "{destination.note}"
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      — A fellow traveler
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg">
            View All Destinations
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
