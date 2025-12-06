import { motion } from "framer-motion";
import { Users, Heart, Globe, Building2, Award, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const partners = [
  {
    id: 1,
    name: "World Wildlife Fund",
    type: "Conservation",
    contribution: "Tree planting programs",
  },
  {
    id: 2,
    name: "Clean Ocean Initiative",
    type: "Marine Conservation",
    contribution: "Beach cleanup coordination",
  },
  {
    id: 3,
    name: "Local Green Guides",
    type: "Eco Tourism",
    contribution: "Sustainable tour experiences",
  },
];

const impactStats = [
  { value: "2.5M", label: "kg CO₂ Offset", icon: Globe },
  { value: "50k+", label: "Trees Planted", icon: Heart },
  { value: "120", label: "Partner NGOs", icon: Building2 },
];

export function CommunitySection() {
  return (
    <section id="community" className="py-24 gradient-earth">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-primary font-medium mb-4">
            <Users className="w-4 h-4" />
            Together for Earth
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            NGO & Community
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We partner with environmental organizations worldwide. Your travels
            directly support conservation efforts and local sustainable
            initiatives.
          </p>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
        >
          {impactStats.map((stat, index) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <p className="font-serif text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Partner Organizations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Award className="w-6 h-6 text-primary" />
            Partner Organizations
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-elevated transition-shadow">
                  <CardContent className="p-6">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-sage/50 text-primary inline-block mb-4">
                      {partner.type}
                    </span>
                    <h4 className="font-serif text-lg font-semibold text-foreground mb-2">
                      {partner.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {partner.contribution}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                Become a Partner
              </h3>
              <p className="text-muted-foreground mb-6">
                Are you an NGO or eco-tourism organization? Join our network and
                help travelers make a positive impact.
              </p>
              <Button size="lg" className="group">
                Partner With Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
