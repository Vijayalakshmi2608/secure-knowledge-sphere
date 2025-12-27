import { useState, useCallback } from 'react';
import { Upload, FileText, X, Loader2, CheckCircle2 } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { DocumentCard } from '@/components/DocumentCard';
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
import type { Document } from '@/lib/mockData';

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'encrypting' | 'complete';

interface PendingUpload {
  name: string;
  status: UploadStatus;
  namespace: Document['namespace'];
}

const namespaces: Document['namespace'][] = ['HR', 'Finance', 'Engineering', 'Legal', 'R&D'];

export default function Documents() {
  const { documents, addDocument } = useApp();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [selectedNamespace, setSelectedNamespace] = useState<Document['namespace']>('HR');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const simulateUpload = async (fileName: string) => {
    const uploadId = Date.now().toString();
    const upload: PendingUpload = {
      name: fileName,
      status: 'uploading',
      namespace: selectedNamespace,
    };

    setPendingUploads(prev => [...prev, upload]);

    // Simulate upload stages
    await new Promise(r => setTimeout(r, 500));
    setPendingUploads(prev =>
      prev.map(u => (u.name === fileName ? { ...u, status: 'processing' } : u))
    );

    await new Promise(r => setTimeout(r, 800));
    setPendingUploads(prev =>
      prev.map(u => (u.name === fileName ? { ...u, status: 'encrypting' } : u))
    );

    await addDocument(fileName, selectedNamespace);

    setPendingUploads(prev =>
      prev.map(u => (u.name === fileName ? { ...u, status: 'complete' } : u))
    );

    await new Promise(r => setTimeout(r, 1000));
    setPendingUploads(prev => prev.filter(u => u.name !== fileName));

    toast({
      title: 'Document encrypted successfully',
      description: `${fileName} has been securely encrypted and indexed.`,
    });
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      files.forEach(file => {
        if (file.type.match(/text|pdf|document|markdown/)) {
          simulateUpload(file.name);
        }
      });
    },
    [selectedNamespace]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => simulateUpload(file.name));
  };

  const getStatusIcon = (status: UploadStatus) => {
    switch (status) {
      case 'uploading':
      case 'processing':
      case 'encrypting':
        return <Loader2 size={16} className="animate-spin text-primary" />;
      case 'complete':
        return <CheckCircle2 size={16} className="text-success" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: UploadStatus) => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'Generating embeddings...';
      case 'encrypting':
        return 'Encrypting vectors...';
      case 'complete':
        return 'Stored securely';
      default:
        return '';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Document Management</h1>
            <p className="text-muted-foreground text-sm">
              Upload and manage your encrypted enterprise documents
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select
              value={selectedNamespace}
              onValueChange={v => setSelectedNamespace(v as Document['namespace'])}
            >
              <SelectTrigger className="w-32 bg-muted/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {namespaces.map(ns => (
                  <SelectItem key={ns} value={ns}>
                    {ns}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Upload Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300',
            isDragging
              ? 'border-primary bg-primary/5 scale-[1.02]'
              : 'border-border hover:border-primary/50 bg-muted/10'
          )}
        >
          <div className="flex flex-col items-center gap-4">
            <div
              className={cn(
                'w-16 h-16 rounded-xl flex items-center justify-center transition-all',
                isDragging ? 'bg-primary/20 text-primary scale-110' : 'bg-muted/50 text-muted-foreground'
              )}
            >
              <Upload size={28} />
            </div>
            <div>
              <p className="font-medium mb-1">
                {isDragging ? 'Drop files to encrypt' : 'Drag and drop files here'}
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse (.txt, .pdf, .docx, .md)
              </p>
            </div>
            <input
              type="file"
              multiple
              accept=".txt,.pdf,.docx,.md"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="outline" asChild className="cursor-pointer">
                <span>Browse Files</span>
              </Button>
            </label>
          </div>
        </div>

        {/* Pending Uploads */}
        {pendingUploads.length > 0 && (
          <div className="space-y-2 animate-fade-in">
            <h3 className="text-sm font-medium text-muted-foreground">Processing</h3>
            {pendingUploads.map(upload => (
              <div
                key={upload.name}
                className="glass-card p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{upload.name}</p>
                    <p className="text-xs text-muted-foreground">{upload.namespace}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(upload.status)}
                  <span className="text-sm text-muted-foreground">
                    {getStatusText(upload.status)}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/20 rounded-b-xl overflow-hidden">
                  <div
                    className={cn(
                      'h-full bg-primary transition-all duration-500',
                      upload.status === 'uploading' && 'w-1/4',
                      upload.status === 'processing' && 'w-1/2',
                      upload.status === 'encrypting' && 'w-3/4',
                      upload.status === 'complete' && 'w-full'
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Documents List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold">Encrypted Documents ({documents.length})</h3>
          </div>
          <div className="grid gap-3">
            {documents.map(doc => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}