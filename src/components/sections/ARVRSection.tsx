import { motion } from "framer-motion";
import { Eye, Sparkles, Mountain, Compass, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ARVRSection() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-primary font-medium mb-4">
              <Eye className="w-4 h-4" />
              Immersive Preview
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6">
              Experience Before <br />
              You Travel
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Use AR/VR to explore destinations virtually. See the environmental
              impact, preview eco-lodges, and plan your journey with immersive
              360° experiences.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mountain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    360° Destination Tours
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Virtually walk through forests, beaches, and eco-resorts
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-eco/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-eco" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    Environmental Impact Score
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    See real-time sustainability metrics in AR overlay
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sage/50 flex items-center justify-center">
                  <Compass className="w-6 h-6 text-sage-dark" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    AR Navigation
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Point your phone for eco-friendly route suggestions
                  </p>
                </div>
              </div>
            </div>

            <Button variant="hero" className="group">
              <Play className="w-5 h-5" />
              Try Demo Experience
            </Button>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0 relative">
                {/* Simulated VR Interface */}
                <div className="aspect-[4/3] bg-gradient-to-br from-forest to-forest-light relative overflow-hidden">
                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)",
                      backgroundSize: "50px 50px",
                    }}
                  />

                  {/* Floating elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute top-10 left-10 p-4 rounded-xl bg-background/90 backdrop-blur-sm shadow-elevated"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-eco flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Eco Score
                        </p>
                        <p className="font-serif font-bold text-foreground">
                          92/100
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute bottom-10 right-10 p-4 rounded-xl bg-background/90 backdrop-blur-sm shadow-elevated"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Mountain className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Viewing
                        </p>
                        <p className="font-serif font-bold text-foreground">
                          Alpine Valley
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-4 border-primary-foreground/30 flex items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full border-2 border-primary-foreground/50 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-primary-foreground" />
                    </div>
                  </motion.div>

                  {/* Corner markers */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary-foreground/50" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary-foreground/50" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary-foreground/50" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary-foreground/50" />
                </div>
              </CardContent>
            </Card>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-sage/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
