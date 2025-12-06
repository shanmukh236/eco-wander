import { motion } from "framer-motion";
import { AlertTriangle, Shield, Droplets, Wind, ThermometerSun, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const alerts = [
  {
    id: 1,
    location: "Yamuna River, Delhi",
    type: "Water Pollution",
    severity: "high",
    icon: Droplets,
    message: "Highly polluted water. Avoid direct contact. Carry safe drinking water.",
    precautions: [
      "Do not swim or wade in the river",
      "Use bottled or filtered water",
      "Wash hands thoroughly after visits",
    ],
  },
  {
    id: 2,
    location: "Industrial Belt, Mumbai",
    type: "Air Quality",
    severity: "medium",
    icon: Wind,
    message: "AQI levels elevated. Sensitive groups should take precautions.",
    precautions: [
      "Wear N95 mask outdoors",
      "Limit outdoor activities",
      "Check AQI before morning walks",
    ],
  },
  {
    id: 3,
    location: "Thar Desert Region",
    type: "Heat Advisory",
    severity: "medium",
    icon: ThermometerSun,
    message: "Extreme heat expected. Plan activities during cooler hours.",
    precautions: [
      "Stay hydrated (3-4L water daily)",
      "Avoid midday sun (11am-4pm)",
      "Wear light, breathable clothing",
    ],
  },
];

const getSeverityStyles = (severity: string) => {
  switch (severity) {
    case "high":
      return {
        badge: "bg-destructive/10 text-destructive",
        border: "border-destructive/30",
        icon: "text-destructive",
      };
    case "medium":
      return {
        badge: "bg-warning/10 text-warning",
        border: "border-warning/30",
        icon: "text-warning",
      };
    default:
      return {
        badge: "bg-muted text-muted-foreground",
        border: "border-border",
        icon: "text-muted-foreground",
      };
  }
};

export function AlertsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-primary font-medium mb-4">
            <Shield className="w-4 h-4" />
            Stay Informed
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Environmental Alerts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time environmental health updates for your destinations. Travel
            informed, travel safe, and know when to take precautions.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {alerts.map((alert, index) => {
            const styles = getSeverityStyles(alert.severity);
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`border-2 ${styles.border} overflow-hidden`}>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Alert Header */}
                      <div className="md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-border bg-muted/30">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-xl ${styles.badge} flex items-center justify-center`}>
                            <alert.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles.badge}`}>
                              {alert.severity.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                          {alert.location}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {alert.type}
                        </p>
                      </div>

                      {/* Alert Details */}
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <AlertTriangle className={`w-5 h-5 mt-0.5 ${styles.icon}`} />
                          <p className="text-foreground">{alert.message}</p>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Info className="w-4 h-4 text-primary" />
                            <h4 className="font-medium text-foreground text-sm">
                              Precautions
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            {alert.precautions.map((precaution, i) => (
                              <li
                                key={i}
                                className="text-sm text-muted-foreground flex items-start gap-2"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                {precaution}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mt-8"
        >
          <div className="p-6 rounded-xl bg-sage/20 border border-sage text-center">
            <p className="text-muted-foreground">
              Environmental data is updated in real-time from trusted sources.
              Always check local conditions before your visit and follow
              official guidelines.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
