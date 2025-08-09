import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Users, BarChart3 } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

const Hero = () => {
  return (
    <section className="pt-16 pb-20 px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-secondary opacity-50" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                AI-Powered Email Marketing
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Email Marketing
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Reimagined</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Create, send, and optimize email campaigns with the power of AI. 
                MailFlow helps you connect with your audience like never before.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">10M+</div>
                <div className="text-sm text-muted-foreground">Emails Sent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Delivery Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">50k+</div>
                <div className="text-sm text-muted-foreground">Happy Users</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Trusted by 50,000+ companies</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={heroImage} 
                alt="MailFlow Dashboard Preview" 
                className="w-full h-auto"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-card border rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-success" />
                  <div>
                    <div className="text-sm font-medium">Open Rate</div>
                    <div className="text-lg font-bold text-success">42.8%</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-card border rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm font-medium">New Subscribers</div>
                    <div className="text-lg font-bold text-primary">+1,247</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;