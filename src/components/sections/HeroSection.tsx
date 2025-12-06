import { motion } from "framer-motion";
import { ArrowRight, Leaf, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-forest.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Serene forest path with morning sunlight"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/50 backdrop-blur-sm mb-6"
          >
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Travel Sustainably
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
          >
            Journey with{" "}
            <span className="text-primary italic">Nature</span>,<br />
            Not Against It
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Discover eco-friendly destinations, plan carbon-conscious trips, and
            earn rewards for making sustainable choices. Every journey leaves a
            positive footprint.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="hero" className="group">
              Plan an Eco-Trip
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline">
              <MapPin className="w-5 h-5" />
              Explore Places
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 pt-8 border-t border-border/50"
          >
            <div className="text-center">
              <p className="font-serif text-3xl md:text-4xl font-bold text-primary">
                12k+
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Eco Travelers
              </p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl md:text-4xl font-bold text-primary">
                500+
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Destinations
              </p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl md:text-4xl font-bold text-primary">
                2.5M
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                kg CO₂ Saved
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
