import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target,
  AlertCircle,
  Coffee,
  ShoppingBag,
  Car,
  Home,
  BookOpen,
  MoreHorizontal
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Tooltip,
  Legend
} from "recharts";

export const Dashboard = () => {
  const monthlyData = [
    { month: 'Jan', spent: 1200, budget: 1500 },
    { month: 'Feb', spent: 1350, budget: 1500 },
    { month: 'Mar', spent: 1100, budget: 1500 },
    { month: 'Apr', spent: 1600, budget: 1500 },
    { month: 'May', spent: 1250, budget: 1500 },
    { month: 'Jun', spent: 1400, budget: 1500 },
  ];

  const expenseCategories = [
    { name: 'Food', value: 450, color: '#FF6B6B', icon: Coffee },
    { name: 'Shopping', value: 320, color: '#4ECDC4', icon: ShoppingBag },
    { name: 'Transportation', value: 200, color: '#45B7D1', icon: Car },
    { name: 'Housing', value: 800, color: '#96CEB4', icon: Home },
    { name: 'Education', value: 150, color: '#FFEAA7', icon: BookOpen },
    { name: 'Other', value: 80, color: '#DDA0DD', icon: MoreHorizontal },
  ];

  const recentTransactions = [
    { id: 1, description: "Starbucks Coffee", amount: -5.50, category: "Food", date: "Today", icon: Coffee },
    { id: 2, description: "Amazon Purchase", amount: -29.99, category: "Shopping", date: "Yesterday", icon: ShoppingBag },
    { id: 3, description: "Bus Pass", amount: -15.00, category: "Transportation", date: "2 days ago", icon: Car },
    { id: 4, description: "Scholarship Deposit", amount: +500.00, category: "Income", date: "3 days ago", icon: TrendingUp },
  ];

  const goals = [
    { name: "Emergency Fund", current: 750, target: 1000, progress: 75 },
    { name: "New Laptop", current: 400, target: 1200, progress: 33 },
    { name: "Spring Break Trip", current: 200, target: 800, progress: 25 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Track your spending and reach your financial goals</p>
        </div>
        <Button variant="hero">Add Expense</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Monthly Budget</p>
              <p className="text-2xl font-bold text-foreground">$1,500</p>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                On track
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Spent This Month</p>
              <p className="text-2xl font-bold text-foreground">$1,250</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingDown className="w-3 h-3" />
                $250 remaining
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Goals</p>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-xs text-accent-purple flex items-center gap-1 mt-1">
                <Target className="w-3 h-3" />
                2 on track
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-warm rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Budget Alerts</p>
              <p className="text-2xl font-bold text-foreground">2</p>
              <p className="text-xs text-warning flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                Action needed
              </p>
            </div>
            <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Monthly Spending vs Budget */}
        <Card className="p-6 bg-gradient-card shadow-soft">
          <h3 className="text-lg font-semibold mb-4">Monthly Spending vs Budget</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="budget" fill="hsl(var(--primary-light))" name="Budget" />
              <Bar dataKey="spent" fill="hsl(var(--primary))" name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Expense Categories */}
        <Card className="p-6 bg-gradient-card shadow-soft">
          <h3 className="text-lg font-semibold mb-4">Expense Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseCategories}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {expenseCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Transactions and Goals */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <Card className="p-6 bg-gradient-card shadow-soft">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.amount > 0 ? 'bg-success/20' : 'bg-primary/20'
                  }`}>
                    <transaction.icon className={`w-5 h-5 ${
                      transaction.amount > 0 ? 'text-success' : 'text-primary'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <p className={`font-semibold ${
                  transaction.amount > 0 ? 'text-success' : 'text-foreground'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Goals Progress */}
        <Card className="p-6 bg-gradient-card shadow-soft">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Goal Progress</h3>
            <Button variant="ghost" size="sm">Manage Goals</Button>
          </div>
          <div className="space-y-4">
            {goals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-sm text-muted-foreground">
                    ${goal.current} / ${goal.target}
                  </span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">{goal.progress}% complete</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};