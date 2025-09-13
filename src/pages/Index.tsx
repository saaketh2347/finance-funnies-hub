import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Dashboard } from "@/components/Dashboard";
import { BudgetManager } from "@/components/BudgetManager";
import { GoalTracker } from "@/components/GoalTracker";
import { ExpenseTracker } from "@/components/ExpenseTracker";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "budget":
        return <BudgetManager />;
      case "goals":
        return <GoalTracker />;
      case "expenses":
        return <ExpenseTracker />;
      default:
        return <Hero onGetStarted={() => setActiveSection("dashboard")} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {activeSection === "hero" ? (
        renderContent()
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>
      )}
    </div>
  );
};

export default Index;
