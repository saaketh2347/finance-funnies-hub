import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

export const BudgetManager = () => {
  const [monthlyBudget, setMonthlyBudget] = useState(1500);
  const [isEditing, setIsEditing] = useState(false);

  const budgetCategories = [
    { name: "Food & Dining", allocated: 400, spent: 350, color: "bg-accent-coral" },
    { name: "Shopping", allocated: 300, spent: 320, color: "bg-accent-teal" },
    { name: "Transportation", allocated: 200, spent: 150, color: "bg-primary" },
    { name: "Housing", allocated: 500, spent: 500, color: "bg-secondary" },
    { name: "Education", allocated: 100, spent: 80, color: "bg-accent-orange" },
  ];

  const totalAllocated = budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = monthlyBudget - totalSpent;

  const getBudgetStatus = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage > 100) return { status: "over", color: "text-destructive", icon: AlertTriangle };
    if (percentage > 80) return { status: "warning", color: "text-warning", icon: AlertTriangle };
    return { status: "good", color: "text-success", icon: CheckCircle };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Budget Manager</h1>
          <p className="text-muted-foreground">Set and track your monthly spending limits</p>
        </div>
        <Button variant="hero">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Monthly Budget Overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-gradient-card shadow-soft">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Monthly Budget Overview</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Budget
            </Button>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="budget">Monthly Budget</Label>
                <Input
                  id="budget"
                  type="number"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-primary/10">
                  <p className="text-2xl font-bold text-primary">${monthlyBudget}</p>
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/10">
                  <p className="text-2xl font-bold text-secondary">${totalSpent}</p>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                </div>
                <div className={`p-4 rounded-lg ${remaining >= 0 ? 'bg-success/10' : 'bg-destructive/10'}`}>
                  <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-success' : 'text-destructive'}`}>
                    ${remaining}
                  </p>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {((totalSpent / monthlyBudget) * 100).toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={(totalSpent / monthlyBudget) * 100} 
                  className="h-3"
                />
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6 bg-gradient-secondary shadow-soft text-white">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <h3 className="font-semibold">Budget Insights</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white/10 rounded-lg">
                <p className="text-sm font-medium">Predicted Monthly Spending</p>
                <p className="text-xl font-bold">${(totalSpent * 1.1).toFixed(0)}</p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg">
                <p className="text-sm font-medium">Savings Potential</p>
                <p className="text-xl font-bold">${Math.max(0, monthlyBudget - totalSpent * 1.1).toFixed(0)}</p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg">
                <p className="text-sm font-medium">Top Spending Day</p>
                <p className="text-lg font-bold">Fridays</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Budget Categories */}
      <Card className="p-6 bg-gradient-card shadow-soft">
        <h3 className="text-xl font-semibold mb-6">Budget Categories</h3>
        <div className="space-y-4">
          {budgetCategories.map((category, index) => {
            const percentage = (category.spent / category.allocated) * 100;
            const status = getBudgetStatus(category.spent, category.allocated);
            
            return (
              <div key={index} className="p-4 rounded-lg border border-border hover:bg-card-hover transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                    <span className="font-medium">{category.name}</span>
                    <Badge 
                      variant={status.status === 'over' ? 'destructive' : status.status === 'warning' ? 'secondary' : 'default'}
                      className="ml-2"
                    >
                      <status.icon className="w-3 h-3 mr-1" />
                      {percentage > 100 ? 'Over Budget' : percentage > 80 ? 'Warning' : 'On Track'}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${category.spent} / ${category.allocated}</p>
                    <p className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</p>
                  </div>
                </div>
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className="h-2"
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Budget Alerts */}
      <Card className="p-6 bg-gradient-card shadow-soft">
        <h3 className="text-xl font-semibold mb-4">Budget Alerts</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <div className="flex-1">
              <p className="font-medium">Shopping budget exceeded</p>
              <p className="text-sm text-muted-foreground">You've spent $320 of your $300 shopping budget</p>
            </div>
            <Button variant="outline" size="sm">Adjust</Button>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
            <CheckCircle className="w-5 h-5 text-success" />
            <div className="flex-1">
              <p className="font-medium">Transportation under budget</p>
              <p className="text-sm text-muted-foreground">Great job! You've saved $50 this month</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};