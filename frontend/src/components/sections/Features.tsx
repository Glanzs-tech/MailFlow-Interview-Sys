import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  BarChart3, 
  Users, 
  Palette, 
  Shield, 
  Globe,
  Mail,
  Brain,
  Target
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Content",
    description: "Generate compelling email content with advanced AI that understands your brand voice and audience."
  },
  {
    icon: Palette,
    title: "Drag & Drop Editor",
    description: "Create beautiful emails with our intuitive visual editor. No coding required."
  },
  {
    icon: Target,
    title: "Smart Segmentation",
    description: "AI-driven audience segmentation for personalized campaigns that convert better."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Get detailed insights on opens, clicks, conversions, and subscriber behavior."
  },
  {
    icon: Zap,
    title: "Automation Workflows",
    description: "Set up sophisticated email sequences that trigger based on user actions."
  },
  {
    icon: Shield,
    title: "Deliverability First",
    description: "Industry-leading deliverability rates with built-in spam testing and optimization."
  },
  {
    icon: Users,
    title: "Contact Management",
    description: "Organize and manage your contacts with powerful segmentation and tagging tools."
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Send millions of emails with confidence using our enterprise-grade infrastructure."
  },
  {
    icon: Mail,
    title: "Template Library",
    description: "Choose from hundreds of professionally designed templates for every industry."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need to
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            MailFlow combines powerful features with AI intelligence to help you create, 
            send, and optimize email campaigns that drive real results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:shadow-primary/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;