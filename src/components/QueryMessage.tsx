import { User, Bot, Lock, FileText, Gauge } from 'lucide-react';
import { QueryMessage as QueryMessageType } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface QueryMessageProps {
  message: QueryMessageType;
}

export function QueryMessage({ message }: QueryMessageProps) {
  const isUser = message.type === 'user';
  const isSystem = message.type === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center animate-fade-in">
        <div className="flex items-center gap-2 text-sm text-primary bg-primary/5 border border-primary/20 rounded-full px-4 py-2">
          <Lock size={14} className="animate-pulse" />
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex gap-3 animate-slide-up',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center',
          isUser
            ? 'bg-primary/10 text-primary'
            : 'bg-secondary/10 text-secondary gradient-border'
        )}
      >
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl p-4',
          isUser
            ? 'bg-primary text-primary-foreground rounded-tr-none'
            : 'glass-card rounded-tl-none'
        )}
      >
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </div>

        {/* AI Response Metadata */}
        {!isUser && message.sources && (
          <div className="mt-4 pt-3 border-t border-border/50 space-y-2">
            {/* Sources */}
            <div className="flex items-start gap-2">
              <FileText size={14} className="text-muted-foreground mt-0.5" />
              <div className="flex flex-wrap gap-1.5">
                {message.sources.map((source, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-muted/50 text-muted-foreground px-2 py-0.5 rounded-full"
                  >
                    {source}
                  </span>
                ))}
              </div>
            </div>

            {/* Confidence & Encryption */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {message.confidence && (
                <span className="flex items-center gap-1">
                  <Gauge size={12} />
                  Confidence: {Math.round(message.confidence * 100)}%
                </span>
              )}
              {message.encryptionMetadata && (
                <>
                  <span className="flex items-center gap-1">
                    <Lock size={12} className="text-success" />
                    {message.encryptionMetadata.vectorsSearched} vectors searched
                  </span>
                  <span>
                    Decryption: {message.encryptionMetadata.decryptionTime}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}