import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
