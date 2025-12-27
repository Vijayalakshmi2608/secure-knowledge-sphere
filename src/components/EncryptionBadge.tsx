import { Lock, Loader2, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EncryptionBadgeProps {
  status: 'pending' | 'processing' | 'encrypted';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function EncryptionBadge({ status, size = 'md', showLabel = true }: EncryptionBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-base px-3 py-1.5 gap-2',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  if (status === 'encrypted') {
    return (
      <span
        className={cn(
          'inline-flex items-center rounded-full font-medium',
          'bg-success/10 text-success border border-success/20',
          'glow-success',
          sizeClasses[size]
        )}
      >
        <Shield size={iconSizes[size]} className="fill-success/20" />
        {showLabel && 'Encrypted'}
      </span>
    );
  }

  if (status === 'processing') {
    return (
      <span
        className={cn(
          'inline-flex items-center rounded-full font-medium',
          'bg-primary/10 text-primary border border-primary/20',
          sizeClasses[size]
        )}
      >
        <Loader2 size={iconSizes[size]} className="animate-spin" />
        {showLabel && 'Processing...'}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        'bg-muted text-muted-foreground border border-border',
        sizeClasses[size]
      )}
    >
      <Lock size={iconSizes[size]} />
      {showLabel && 'Pending'}
    </span>
  );
}