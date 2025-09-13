import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Receipt, 
  Calendar, 
  Tag,
  Camera,
  Upload,
  TrendingUp,
  Filter,
  Coffee,
  ShoppingBag,
  Car,
  Home,
  BookOpen,
  MoreHorizontal,
  Smartphone,
  Utensils
} from "lucide-react";

export const ExpenseTracker = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    notes: ""
  });

  const categories = [
    { id: "food", name: "Food & Dining", icon: Coffee, color: "bg-accent-coral" },
    { id: "shopping", name: "Shopping", icon: ShoppingBag, color: "bg-accent-teal" },
    { id: "transport", name: "Transportation", icon: Car, color: "bg-primary" },
    { id: "housing", name: "Housing", icon: Home, color: "bg-secondary" },
    { id: "education", name: "Education", icon: BookOpen, color: "bg-accent-orange" },
    { id: "entertainment", name: "Entertainment", icon: Smartphone, color: "bg-accent-purple" },
    { id: "health", name: "Health & Fitness", icon: TrendingUp, color: "bg-success" },
    { id: "other", name: "Other", icon: MoreHorizontal, color: "bg-muted" }
  ];

  const recentExpenses = [
    {
      id: 1,
      amount: 5.50,
      category: "food",
      description: "Starbucks Coffee",
      date: "2024-01-15",
      time: "09:30 AM",
      location: "Campus Coffee Shop",
      paymentMethod: "Card",
      recurring: false
    },
    {
      id: 2,
      amount: 29.99,
      category: "shopping",
      description: "Amazon Purchase",
      date: "2024-01-14",
      time: "02:15 PM",
      location: "Online",
      paymentMethod: "Card",
      recurring: false
    },
    {
      id: 3,
      amount: 15.00,
      category: "transport",
      description: "Bus Pass",
      date: "2024-01-13",
      time: "08:00 AM",
      location: "Transit Center",
      paymentMethod: "Cash",
      recurring: true
    },
    {
      id: 4,
      amount: 45.75,
      category: "food",
      description: "Grocery Shopping",
      date: "2024-01-12",
      time: "06:30 PM",
      location: "Walmart",
      paymentMethod: "Card",
      recurring: false
    },
    {
      id: 5,
      amount: 12.99,
      category: "entertainment",
      description: "Netflix Subscription",
      date: "2024-01-11",
      time: "12:00 PM",
      location: "Online",
      paymentMethod: "Card",
      recurring: true
    }
  ];

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category || categories[categories.length - 1];
  };

  const handleAddExpense = () => {
    // Add expense logic would go here
    setShowAddForm(false);
    setNewExpense({
      amount: "",
      category: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      notes: ""
    });
  };

  const todayTotal = recentExpenses
    .filter(expense => expense.date === new Date().toISOString().split('T')[0])
    .reduce((sum, expense) => sum + expense.amount, 0);

  const weekTotal = recentExpenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return expenseDate >= weekAgo && expenseDate <= today;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Expense Tracker</h1>
          <p className="text-muted-foreground">Add and categorize your spending automatically</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="hero" onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-primary text-white shadow-medium">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Today's Spending</span>
          </div>
          <p className="text-3xl font-bold">${todayTotal.toFixed(2)}</p>
        </Card>

        <Card className="p-6 bg-gradient-secondary text-white shadow-medium">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">This Week</span>
          </div>
          <p className="text-3xl font-bold">${weekTotal.toFixed(2)}</p>
        </Card>

        <Card className="p-6 bg-gradient-warm text-white shadow-medium">
          <div className="flex items-center gap-3 mb-2">
            <Receipt className="w-5 h-5" />
            <span className="font-medium">Total Transactions</span>
          </div>
          <p className="text-3xl font-bold">{recentExpenses.length}</p>
        </Card>
      </div>

      {/* Add Expense Form */}
      {showAddForm && (
        <Card className="p-6 bg-gradient-card shadow-soft">
          <h3 className="text-lg font-semibold mb-6">Add New Expense</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  placeholder="0.00"
                  className="text-lg"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <category.icon className="w-4 h-4" />
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  placeholder="What did you spend on?"
                />
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={newExpense.notes}
                  onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
                  placeholder="Additional details..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-3">
                <Label>Upload Receipt (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop a receipt or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    AI will automatically extract details
                  </p>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button onClick={handleAddExpense} className="flex-1">
              Add Expense
            </Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Category Quick Add */}
      <Card className="p-6 bg-gradient-card shadow-soft">
        <h3 className="text-lg font-semibold mb-4">Quick Add by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              className="flex flex-col items-center p-4 h-auto space-y-2 hover:bg-primary/10"
              onClick={() => {
                setNewExpense({ ...newExpense, category: category.id });
                setShowAddForm(true);
              }}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color}`}>
                <category.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-center">{category.name}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Recent Expenses */}
      <Card className="p-6 bg-gradient-card shadow-soft">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Recent Expenses</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>

        <div className="space-y-3">
          {recentExpenses.map((expense) => {
            const categoryInfo = getCategoryIcon(expense.category);
            
            return (
              <div key={expense.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-card-hover transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${categoryInfo.color}`}>
                    <categoryInfo.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{expense.description}</h4>
                      {expense.recurring && (
                        <Badge variant="secondary" className="text-xs">
                          Recurring
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{categoryInfo.name}</span>
                      <span>{expense.date}</span>
                      <span>{expense.time}</span>
                      <span>{expense.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-semibold">-${expense.amount.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">{expense.paymentMethod}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};