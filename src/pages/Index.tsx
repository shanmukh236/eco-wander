import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { DestinationsSection } from "@/components/sections/DestinationsSection";
import { TripPlannerSection } from "@/components/sections/TripPlannerSection";
import { RewardsSection } from "@/components/sections/RewardsSection";
import { AlertsSection } from "@/components/sections/AlertsSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { ARVRSection } from "@/components/sections/ARVRSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DestinationsSection />
      <TripPlannerSection />
      <AlertsSection />
      <RewardsSection />
      <ARVRSection />
      <CommunitySection />
      <Footer />
    </main>
  );
};

export default Index;
