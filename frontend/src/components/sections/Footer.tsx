import { Mail, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">MailFlow</span>
            </div>
            <p className="text-background/70">
              The most powerful email marketing platform, enhanced with AI capabilities.
            </p>
            <div className="flex space-x-4">
              <Twitter className="w-5 h-5 text-background/70 hover:text-background cursor-pointer transition-colors" />
              <Github className="w-5 h-5 text-background/70 hover:text-background cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-background/70 hover:text-background cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Features</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Templates</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Automation</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Analytics</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">About</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Blog</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Careers</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Help Center</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Documentation</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">API Reference</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/70 text-sm">
            © 2024 MailFlow. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-background/70 hover:text-background text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-background/70 hover:text-background text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-background/70 hover:text-background text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;