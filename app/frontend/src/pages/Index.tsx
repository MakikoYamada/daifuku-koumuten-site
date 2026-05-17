import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturesSection from "@/components/FeaturesSection";
import VoiceSection from "@/components/VoiceSection";
import CompanySection from "@/components/CompanySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FeaturesSection />
      <VoiceSection />
      <CompanySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;