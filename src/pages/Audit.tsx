import { useState } from 'react';
import { Download, Filter, CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Audit() {
  const { auditLogs } = useApp();
  const { toast } = useToast();
  const [showFullQuery, setShowFullQuery] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredLogs = auditLogs.filter(log => {
    if (filterStatus === 'all') return true;
    return log.status === filterStatus;
  });

  const maskQuery = (query: string, logId: string) => {
    if (showFullQuery === logId) return query;
    if (query.length > 30) {
      return query.substring(0, 20) + '•••' + query.substring(query.length - 5);
    }
    return query;
  };

  const handleExport = () => {
    toast({
      title: 'Export initiated',
      description: 'Audit logs will be exported as encrypted CSV.',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Audit Trail</h1>
            <p className="text-muted-foreground text-sm">
              Complete visibility into all encrypted query operations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32 bg-muted/30">
                <Filter size={14} className="mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download size={14} className="mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-4 animate-fade-in">
            <p className="text-sm text-muted-foreground">Total Queries</p>
            <p className="text-2xl font-heading font-bold mt-1">{auditLogs.length}</p>
          </div>
          <div className="glass-card p-4 animate-fade-in" style={{ animationDelay: '0.05s' }}>
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <p className="text-2xl font-heading font-bold text-success mt-1">
              {((auditLogs.filter(l => l.status === 'success').length / auditLogs.length) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="glass-card p-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <p className="text-sm text-muted-foreground">Avg Response Time</p>
            <p className="text-2xl font-heading font-bold mt-1">44ms</p>
          </div>
          <div className="glass-card p-4 animate-fade-in" style={{ animationDelay: '0.15s' }}>
            <p className="text-sm text-muted-foreground">Encryption Method</p>
            <p className="text-lg font-heading font-bold mt-1">AES-256-GCM</p>
          </div>
        </div>

        {/* Audit Table */}
        <div className="glass-card overflow-hidden animate-slide-up">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Timestamp</TableHead>
                  <TableHead className="text-muted-foreground">User</TableHead>
                  <TableHead className="text-muted-foreground">Query</TableHead>
                  <TableHead className="text-muted-foreground">Documents</TableHead>
                  <TableHead className="text-muted-foreground">Encryption</TableHead>
                  <TableHead className="text-muted-foreground">Response</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log, idx) => (
                  <TableRow
                    key={log.id}
                    className="border-border/30 hover:bg-muted/10 animate-fade-in"
                    style={{ animationDelay: `${idx * 0.03}s` }}
                  >
                    <TableCell className="text-sm">
                      <div className="space-y-0.5">
                        <p>{log.timestamp.toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">
                          {log.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <code className="text-xs bg-muted/30 px-1.5 py-0.5 rounded">
                        {log.user}
                      </code>
                    </TableCell>
                    <TableCell className="text-sm max-w-[200px]">
                      <div className="flex items-center gap-2">
                        <span className="truncate">{maskQuery(log.queryText, log.id)}</span>
                        <button
                          onClick={() =>
                            setShowFullQuery(showFullQuery === log.id ? null : log.id)
                          }
                          className="text-muted-foreground hover:text-foreground flex-shrink-0"
                        >
                          {showFullQuery === log.id ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="flex flex-wrap gap-1">
                        {log.documentsAccessed.map((doc, i) => (
                          <span
                            key={i}
                            className="text-xs bg-muted/30 px-2 py-0.5 rounded-full"
                          >
                            {doc.split('.')[0].substring(0, 15)}...
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {log.encryptionMethod}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm font-mono">{log.responseTime}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full',
                          log.status === 'success'
                            ? 'bg-success/10 text-success'
                            : 'bg-destructive/10 text-destructive'
                        )}
                      >
                        {log.status === 'success' ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}
                        {log.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}