import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Shield, Target } from "lucide-react";
import heroImage from "@/assets/hero-finance.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-accent-coral" />
              <span className="text-accent-coral font-semibold">Smart Student Finance</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Make Money Management 
              <span className="block bg-gradient-to-r from-accent-coral to-accent-orange bg-clip-text text-transparent">
                Fun & Easy
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Finance Funnies helps students worldwide take control of their finances with automated 
              expense tracking, predictive analytics, and personalized goal setting. Turn budgeting 
              into an engaging, rewarding experience!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                variant="warm" 
                size="lg" 
                onClick={onGetStarted}
                className="text-lg px-8 py-4"
              >
                Start Managing Money
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary"
              >
                Watch Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-white/90">Predictive Analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-white/90">Goal Tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-white/90">Secure & Private</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 to-accent-teal/20 rounded-3xl blur-3xl"></div>
            <img 
              src={heroImage} 
              alt="Finance Funnies Dashboard Preview" 
              className="relative rounded-3xl shadow-strong w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};