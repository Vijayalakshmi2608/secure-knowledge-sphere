import { Link } from 'react-router-dom';
import {
  FileStack,
  Search,
  Shield,
  Clock,
  Activity,
  ArrowRight,
  FileText,
  Zap,
} from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { MetricCard } from '@/components/MetricCard';
import { DocumentCard } from '@/components/DocumentCard';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { analyticsData } from '@/lib/mockData';

export default function Dashboard() {
  const { documents, stats, user } = useApp();
  const recentDocs = documents.slice(-3).reverse();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="glass-card-elevated p-6 relative overflow-hidden animate-fade-in">
          <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h1 className="text-2xl font-heading font-bold mb-2">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-muted-foreground mb-4">
              Your encrypted knowledge base is secure and ready for queries.
            </p>
            <div className="flex items-center gap-3">
              <Link to="/query">
                <Button size="sm" className="glow-primary">
                  <Search size={16} className="mr-2" />
                  Start Querying
                </Button>
              </Link>
              <Link to="/documents">
                <Button variant="outline" size="sm">
                  <FileText size={16} className="mr-2" />
                  Upload Documents
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Encrypted Documents"
            value={stats.totalDocuments}
            icon={FileStack}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title="Queries Today"
            value={stats.queriesToday}
            icon={Search}
            trend={{ value: 8, isPositive: true }}
          />
          <MetricCard
            title="Avg Response Time"
            value="45ms"
            icon={Clock}
          />
          <MetricCard
            title="Security Status"
            value="Secured"
            icon={Shield}
          />
        </div>

        {/* Charts & Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Query Activity Chart */}
          <div className="glass-card p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading font-semibold">Query Activity</h3>
                <p className="text-sm text-muted-foreground">Encrypted queries this week</p>
              </div>
              <Activity size={20} className="text-primary" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData.weeklyQueries}>
                  <defs>
                    <linearGradient id="queryGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 20%)" />
                  <XAxis dataKey="day" stroke="hsl(215, 20%, 65%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(222, 47%, 8%)',
                      border: '1px solid hsl(217, 33%, 20%)',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="queries"
                    stroke="hsl(217, 91%, 60%)"
                    fill="url(#queryGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Documents */}
          <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading font-semibold">Recent Documents</h3>
                <p className="text-sm text-muted-foreground">Latest encrypted uploads</p>
              </div>
              <Link to="/documents">
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                  <ArrowRight size={14} className="ml-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentDocs.map(doc => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          </div>
        </div>

        {/* CyborgDB Performance */}
        <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2 mb-6">
            <Zap size={20} className="text-primary" />
            <h3 className="font-heading font-semibold">CyborgDB Performance</h3>
            <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full border border-success/20 ml-2">
              Connected
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <p className="text-2xl font-heading font-bold gradient-text">~45ms</p>
              <p className="text-xs text-muted-foreground mt-1">Encrypted Query Latency</p>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <p className="text-2xl font-heading font-bold gradient-text">1000+</p>
              <p className="text-xs text-muted-foreground mt-1">Queries/Second</p>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <p className="text-2xl font-heading font-bold gradient-text">98.5%</p>
              <p className="text-xs text-muted-foreground mt-1">Accuracy vs Plaintext</p>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <p className="text-2xl font-heading font-bold gradient-text">384</p>
              <p className="text-xs text-muted-foreground mt-1">Vector Dimensions</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}