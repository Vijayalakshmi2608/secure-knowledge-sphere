import { useState } from 'react';
import { Shield, Key, Database, Users, Check, Plus, Trash2 } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Namespace {
  id: string;
  name: string;
  accessLevel: 'public' | 'restricted' | 'private';
}

export default function Settings() {
  const { toast } = useToast();
  const [encryptionAlgorithm, setEncryptionAlgorithm] = useState('aes-256-gcm');
  const [vectorDimension, setVectorDimension] = useState('384');
  const [homomorphicEnabled, setHomomorphicEnabled] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);
  const [namespaces, setNamespaces] = useState<Namespace[]>([
    { id: '1', name: 'HR', accessLevel: 'restricted' },
    { id: '2', name: 'Finance', accessLevel: 'private' },
    { id: '3', name: 'Engineering', accessLevel: 'restricted' },
    { id: '4', name: 'Legal', accessLevel: 'private' },
    { id: '5', name: 'R&D', accessLevel: 'restricted' },
  ]);
  const [newNamespace, setNewNamespace] = useState('');

  const handleSave = () => {
    toast({
      title: 'Settings saved',
      description: 'Your encryption settings have been updated.',
    });
  };

  const addNamespace = () => {
    if (!newNamespace.trim()) return;
    setNamespaces(prev => [
      ...prev,
      { id: Date.now().toString(), name: newNamespace, accessLevel: 'restricted' },
    ]);
    setNewNamespace('');
    toast({
      title: 'Namespace created',
      description: `${newNamespace} has been added.`,
    });
  };

  const removeNamespace = (id: string) => {
    setNamespaces(prev => prev.filter(n => n.id !== id));
    toast({
      title: 'Namespace removed',
      description: 'The namespace has been deleted.',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-bold">Settings</h1>
          <p className="text-muted-foreground text-sm">
            Configure encryption, namespaces, and security preferences
          </p>
        </div>

        {/* Connection Status */}
        <div className="glass-card p-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10 glow-success">
                <Database size={24} className="text-success" />
              </div>
              <div>
                <h3 className="font-heading font-semibold">CyborgDB Connection</h3>
                <p className="text-sm text-muted-foreground">
                  Connected to encrypted vector database
                </p>
              </div>
            </div>
            <span className="flex items-center gap-2 text-sm text-success font-medium bg-success/10 px-4 py-2 rounded-full border border-success/20">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Connected
            </span>
          </div>
        </div>

        {/* Encryption Settings */}
        <div className="glass-card p-6 space-y-6 animate-slide-up">
          <div className="flex items-center gap-3">
            <Key size={20} className="text-primary" />
            <h3 className="font-heading font-semibold">Encryption Settings</h3>
          </div>

          <div className="grid gap-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Encryption Algorithm</Label>
                <Select value={encryptionAlgorithm} onValueChange={setEncryptionAlgorithm}>
                  <SelectTrigger className="bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aes-256-gcm">AES-256-GCM (Recommended)</SelectItem>
                    <SelectItem value="aes-128-gcm">AES-128-GCM</SelectItem>
                    <SelectItem value="chacha20">ChaCha20-Poly1305</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Vector Dimension</Label>
                <Select value={vectorDimension} onValueChange={setVectorDimension}>
                  <SelectTrigger className="bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="384">384 (Balanced)</SelectItem>
                    <SelectItem value="768">768 (High Accuracy)</SelectItem>
                    <SelectItem value="1536">1536 (Maximum)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-primary" />
                <div>
                  <p className="font-medium text-sm">Homomorphic Encryption</p>
                  <p className="text-xs text-muted-foreground">
                    Enable computation on encrypted data
                  </p>
                </div>
              </div>
              <Switch
                checked={homomorphicEnabled}
                onCheckedChange={setHomomorphicEnabled}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-primary" />
                <div>
                  <p className="font-medium text-sm">Full Audit Logging</p>
                  <p className="text-xs text-muted-foreground">
                    Log all query operations for compliance
                  </p>
                </div>
              </div>
              <Switch checked={auditLogging} onCheckedChange={setAuditLogging} />
            </div>
          </div>

          <Button onClick={handleSave} className="glow-primary">
            <Check size={16} className="mr-2" />
            Save Settings
          </Button>
        </div>

        {/* Namespace Management */}
        <div className="glass-card p-6 space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-primary" />
              <h3 className="font-heading font-semibold">Namespace Management</h3>
            </div>
          </div>

          {/* Add Namespace */}
          <div className="flex gap-3">
            <Input
              placeholder="New namespace name..."
              value={newNamespace}
              onChange={e => setNewNamespace(e.target.value)}
              className="bg-muted/30"
              onKeyDown={e => e.key === 'Enter' && addNamespace()}
            />
            <Button onClick={addNamespace} variant="outline">
              <Plus size={16} className="mr-2" />
              Add
            </Button>
          </div>

          {/* Namespace List */}
          <div className="space-y-2">
            {namespaces.map(ns => (
              <div
                key={ns.id}
                className="flex items-center justify-between p-3 bg-muted/10 rounded-lg border border-border/30"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full',
                      ns.accessLevel === 'private'
                        ? 'bg-destructive'
                        : ns.accessLevel === 'restricted'
                        ? 'bg-amber-500'
                        : 'bg-success'
                    )}
                  />
                  <span className="font-medium">{ns.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={ns.accessLevel}
                    onValueChange={v =>
                      setNamespaces(prev =>
                        prev.map(n =>
                          n.id === ns.id
                            ? { ...n, accessLevel: v as Namespace['accessLevel'] }
                            : n
                        )
                      )
                    }
                  >
                    <SelectTrigger className="w-32 h-8 text-xs bg-muted/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="restricted">Restricted</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                  <button
                    onClick={() => removeNamespace(ns.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Info */}
        <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-4">
            <Shield size={20} className="text-success" />
            <h3 className="font-heading font-semibold">Security Overview</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Check size={14} className="text-success" />
              SOC 2 Type II
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Check size={14} className="text-success" />
              GDPR Compliant
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Check size={14} className="text-success" />
              End-to-End Encryption
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Check size={14} className="text-success" />
              Zero-Knowledge
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}