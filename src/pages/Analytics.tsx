import { Zap, TrendingUp, Clock, Database } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { MetricCard } from '@/components/MetricCard';
import { analyticsData } from '@/lib/mockData';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const chartStyles = {
  backgroundColor: 'hsl(222, 47%, 8%)',
  border: '1px solid hsl(217, 33%, 20%)',
  borderRadius: '8px',
};

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Performance metrics and usage statistics for your encrypted knowledge base
          </p>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Queries This Week"
            value="310"
            icon={TrendingUp}
            trend={{ value: 15, isPositive: true }}
          />
          <MetricCard
            title="Avg Query Latency"
            value="45ms"
            icon={Clock}
          />
          <MetricCard
            title="Documents Indexed"
            value="7"
            icon={Database}
          />
          <MetricCard
            title="Throughput"
            value="1000/s"
            icon={Zap}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Queries */}
          <div className="glass-card p-6 animate-slide-up">
            <h3 className="font-heading font-semibold mb-6">Queries This Week</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData.weeklyQueries}>
                  <defs>
                    <linearGradient id="queryGradient2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 20%)" />
                  <XAxis dataKey="day" stroke="hsl(215, 20%, 65%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
                  <Tooltip contentStyle={chartStyles} />
                  <Area
                    type="monotone"
                    dataKey="queries"
                    stroke="hsl(217, 91%, 60%)"
                    fill="url(#queryGradient2)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Document Access */}
          <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-heading font-semibold mb-6">Most Accessed Documents</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.documentAccess} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 20%)" />
                  <XAxis type="number" stroke="hsl(215, 20%, 65%)" fontSize={12} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="hsl(215, 20%, 65%)"
                    fontSize={11}
                    width={100}
                    tickFormatter={v => v.substring(0, 12) + '...'}
                  />
                  <Tooltip contentStyle={chartStyles} />
                  <Bar
                    dataKey="count"
                    fill="hsl(263, 70%, 60%)"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Response Time */}
          <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-heading font-semibold mb-6">Query Response Time (24h)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.responseTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 20%)" />
                  <XAxis dataKey="time" stroke="hsl(215, 20%, 65%)" fontSize={12} />
                  <YAxis
                    stroke="hsl(215, 20%, 65%)"
                    fontSize={12}
                    tickFormatter={v => `${v}ms`}
                  />
                  <Tooltip
                    contentStyle={chartStyles}
                    formatter={(value: number) => [`${value}ms`, 'Latency']}
                  />
                  <Line
                    type="monotone"
                    dataKey="latency"
                    stroke="hsl(142, 76%, 45%)"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(142, 76%, 45%)', strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: 'hsl(142, 76%, 45%)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Encryption Overhead */}
          <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-heading font-semibold mb-6">Encrypted vs Plaintext Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.encryptionOverhead}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 20%)" />
                  <XAxis dataKey="metric" stroke="hsl(215, 20%, 65%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
                  <Tooltip contentStyle={chartStyles} />
                  <Legend />
                  <Bar
                    dataKey="encrypted"
                    name="Encrypted"
                    fill="hsl(217, 91%, 60%)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="plaintext"
                    name="Plaintext"
                    fill="hsl(215, 20%, 45%)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* CyborgDB Performance Banner */}
        <div className="glass-card-elevated p-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 glow-primary">
              <Zap size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg">CyborgDB Performance Metrics</h3>
              <p className="text-sm text-muted-foreground">Real-time encrypted vector database statistics</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-muted/10 rounded-xl border border-border/30">
              <p className="text-3xl font-heading font-bold gradient-text">~45ms</p>
              <p className="text-sm text-muted-foreground mt-1">Avg Encrypted Query</p>
            </div>
            <div className="text-center p-4 bg-muted/10 rounded-xl border border-border/30">
              <p className="text-3xl font-heading font-bold gradient-text">1000+</p>
              <p className="text-sm text-muted-foreground mt-1">Queries/Second</p>
            </div>
            <div className="text-center p-4 bg-muted/10 rounded-xl border border-border/30">
              <p className="text-3xl font-heading font-bold gradient-text">98.5%</p>
              <p className="text-sm text-muted-foreground mt-1">Accuracy vs Plaintext</p>
            </div>
            <div className="text-center p-4 bg-muted/10 rounded-xl border border-border/30">
              <p className="text-3xl font-heading font-bold gradient-text">3.2x</p>
              <p className="text-sm text-muted-foreground mt-1">Overhead vs Unencrypted</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}