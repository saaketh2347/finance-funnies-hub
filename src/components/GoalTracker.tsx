import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Target, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Award,
  Clock,
  CheckCircle2
} from "lucide-react";

export const GoalTracker = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    deadline: "",
    description: ""
  });

  const goals = [
    {
      id: 1,
      name: "Emergency Fund",
      description: "Build a safety net for unexpected expenses",
      target: 1000,
      current: 750,
      deadline: "2024-12-31",
      category: "Security",
      priority: "High",
      monthlyContribution: 125,
      status: "on-track"
    },
    {
      id: 2,
      name: "New Laptop",
      description: "Save for a new MacBook Pro for university",
      target: 1200,
      current: 400,
      deadline: "2024-11-15",
      category: "Education",
      priority: "Medium",
      monthlyContribution: 200,
      status: "behind"
    },
    {
      id: 3,
      name: "Spring Break Trip",
      description: "Trip to Europe with friends",
      target: 800,
      current: 200,
      deadline: "2024-03-01",
      category: "Travel",
      priority: "Low",
      monthlyContribution: 150,
      status: "ahead"
    },
    {
      id: 4,
      name: "Course Certification",
      description: "Online coding bootcamp certificate",
      target: 300,
      current: 300,
      deadline: "2024-01-31",
      category: "Education",
      priority: "High",
      monthlyContribution: 0,
      status: "completed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-success";
      case "on-track": return "text-primary";
      case "ahead": return "text-accent-teal";
      case "behind": return "text-warning";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed": return { variant: "default" as const, text: "Completed", icon: CheckCircle2 };
      case "on-track": return { variant: "secondary" as const, text: "On Track", icon: Target };
      case "ahead": return { variant: "default" as const, text: "Ahead", icon: TrendingUp };
      case "behind": return { variant: "destructive" as const, text: "Behind", icon: Clock };
      default: return { variant: "secondary" as const, text: "Unknown", icon: Target };
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const calculateTimeToGoal = (current: number, target: number, monthlyContribution: number) => {
    if (monthlyContribution === 0 || current >= target) return 0;
    return Math.ceil((target - current) / monthlyContribution);
  };

  const handleAddGoal = () => {
    // Add goal logic would go here
    setShowAddForm(false);
    setNewGoal({ name: "", target: "", deadline: "", description: "" });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Goal Tracker</h1>
          <p className="text-muted-foreground">Set and achieve your financial goals</p>
        </div>
        <Button variant="hero" onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Goal
        </Button>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <Card className="p-6 bg-gradient-card shadow-soft">
          <h3 className="text-lg font-semibold mb-4">Create New Goal</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="goalName">Goal Name</Label>
              <Input
                id="goalName"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                placeholder="e.g., New Laptop"
              />
            </div>
            <div>
              <Label htmlFor="goalTarget">Target Amount ($)</Label>
              <Input
                id="goalTarget"
                type="number"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                placeholder="1200"
              />
            </div>
            <div>
              <Label htmlFor="goalDeadline">Target Date</Label>
              <Input
                id="goalDeadline"
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="goalDescription">Description</Label>
              <Textarea
                id="goalDescription"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                placeholder="Describe your goal..."
                className="min-h-[80px]"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleAddGoal}>Create Goal</Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      {/* Goals Overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-primary text-white shadow-medium">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6" />
            <h3 className="font-semibold">Active Goals</h3>
          </div>
          <p className="text-3xl font-bold mb-2">{goals.filter(g => g.status !== 'completed').length}</p>
          <p className="text-white/80">Currently tracking</p>
        </Card>

        <Card className="p-6 bg-gradient-secondary text-white shadow-medium">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6" />
            <h3 className="font-semibold">Completed</h3>
          </div>
          <p className="text-3xl font-bold mb-2">{goals.filter(g => g.status === 'completed').length}</p>
          <p className="text-white/80">Goals achieved</p>
        </Card>

        <Card className="p-6 bg-gradient-warm text-white shadow-medium">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-6 h-6" />
            <h3 className="font-semibold">Total Saved</h3>
          </div>
          <p className="text-3xl font-bold mb-2">${goals.reduce((sum, goal) => sum + goal.current, 0)}</p>
          <p className="text-white/80">Across all goals</p>
        </Card>
      </div>

      {/* Goals List */}
      <div className="grid lg:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.current, goal.target);
          const timeToGoal = calculateTimeToGoal(goal.current, goal.target, goal.monthlyContribution);
          const status = getStatusBadge(goal.status);
          
          return (
            <Card key={goal.id} className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{goal.name}</h3>
                      <Badge variant={status.variant}>
                        <status.icon className="w-3 h-3 mr-1" />
                        {status.text}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span>${goal.current} / ${goal.target}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                {goal.status !== 'completed' && (
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Monthly contribution: </span>
                      <span className="font-medium">${goal.monthlyContribution}</span>
                    </div>
                    {timeToGoal > 0 && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Time to goal: </span>
                        <span className="font-medium">{timeToGoal} months</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Add Money
                  </Button>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};