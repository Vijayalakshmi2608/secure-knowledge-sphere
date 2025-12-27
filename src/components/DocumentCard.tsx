import { FileText, Clock, Database } from 'lucide-react';
import { Document } from '@/lib/mockData';
import { EncryptionBadge } from './EncryptionBadge';
import { cn } from '@/lib/utils';

interface DocumentCardProps {
  document: Document;
}

const namespaceColors: Record<Document['namespace'], string> = {
  HR: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Finance: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Engineering: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Legal: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'R&D': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export function DocumentCard({ document }: DocumentCardProps) {
  return (
    <div className="glass-card p-4 hover:border-primary/30 transition-all duration-300 group animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          <FileText size={24} />
        </div>
        
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-medium truncate max-w-[200px]">{document.name}</h3>
            <EncryptionBadge status={document.encryptionStatus} size="sm" />
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {document.uploadDate.toLocaleDateString()}
            </span>
            <span>{document.fileSize}</span>
            {document.encryptionStatus === 'encrypted' && (
              <span className="flex items-center gap-1">
                <Database size={12} />
                {document.chunks} chunks
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'text-xs px-2 py-0.5 rounded-full border font-medium',
                namespaceColors[document.namespace]
              )}
            >
              {document.namespace}
            </span>
            {document.encryptedHash && (
              <code className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded font-mono">
                {document.encryptedHash}
              </code>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}