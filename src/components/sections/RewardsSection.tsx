import { motion } from "framer-motion";
import {
  Gift,
  TreeDeciduous,
  Recycle,
  Footprints,
  Award,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ecoActivities = [
  {
    id: 1,
    title: "Beach Cleanup",
    description: "Join local cleanup drives at your destination",
    points: 150,
    icon: Recycle,
    color: "bg-primary/10 text-primary",
  },
  {
    id: 2,
    title: "Plant a Tree",
    description: "Contribute to reforestation programs",
    points: 200,
    icon: TreeDeciduous,
    color: "bg-eco/20 text-eco",
  },
  {
    id: 3,
    title: "Carbon-Free Day",
    description: "Complete a day using only sustainable transport",
    points: 100,
    icon: Footprints,
    color: "bg-sage-dark/20 text-sage-dark",
  },
];

const rewards = [
  {
    id: 1,
    title: "10% off Eco Lodge Stay",
    points: 500,
    partner: "Green Valley Lodges",
    category: "Accommodation",
  },
  {
    id: 2,
    title: "Free Organic Farm Tour",
    points: 350,
    partner: "Local Farms Network",
    category: "Experience",
  },
  {
    id: 3,
    title: "Sustainable Gear Kit",
    points: 800,
    partner: "EcoTravel Shop",
    category: "Products",
  },
];

export function RewardsSection() {
  return (
    <section id="rewards" className="py-24 gradient-earth">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-primary font-medium mb-4">
            <Gift className="w-4 h-4" />
            Earn & Redeem
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Eco-Rewards Program
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete sustainable activities, earn points, and unlock exclusive
            rewards. Your green actions create real impact and real benefits.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Eco Activities */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Award className="w-6 h-6 text-primary" />
              Earn Points
            </h3>

            <div className="space-y-4">
              {ecoActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-elevated transition-shadow cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-xl ${activity.color} flex items-center justify-center`}
                        >
                          <activity.icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">
                            {activity.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-serif text-2xl font-bold text-eco">
                            +{activity.points}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            points
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View All Activities
              </Button>
            </div>
          </motion.div>

          {/* Rewards Catalog */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Gift className="w-6 h-6 text-primary" />
              Redeem Rewards
            </h3>

            <div className="space-y-4">
              {rewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-elevated transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-sand text-earth">
                          {reward.category}
                        </span>
                        <span className="font-serif text-lg font-bold text-primary">
                          {reward.points} pts
                        </span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {reward.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        by {reward.partner}
                      </p>
                      <Button variant="sand" size="sm" className="w-full">
                        Redeem Reward
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Non-transferable notice */}
            <div className="mt-6 p-4 rounded-xl bg-muted border border-border">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Note:</span>{" "}
                Rewards are non-transferable and linked to your EcoPath
                account. Coupons can only be redeemed by the account holder.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
