import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Document,
  QueryMessage,
  AuditLog,
  User,
  initialDocuments,
  initialAuditLogs,
  demoUser,
  generateEncryptedHash,
} from '@/lib/mockData';

interface AppContextType {
  // Auth
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  
  // Documents
  documents: Document[];
  addDocument: (name: string, namespace: Document['namespace']) => Promise<void>;
  
  // Queries
  queryHistory: QueryMessage[];
  addQuery: (message: QueryMessage) => void;
  clearQueryHistory: () => void;
  
  // Audit logs
  auditLogs: AuditLog[];
  addAuditLog: (log: Omit<AuditLog, 'id'>) => void;
  
  // Stats
  stats: {
    totalDocuments: number;
    queriesToday: number;
    storageUsed: string;
    securityStatus: 'secure' | 'warning' | 'critical';
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [queryHistory, setQueryHistory] = useState<QueryMessage[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);

  const login = (email: string, password: string): boolean => {
    // Simulate authentication
    if (email && password.length >= 4) {
      setIsAuthenticated(true);
      setUser(demoUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setQueryHistory([]);
  };

  const addDocument = async (name: string, namespace: Document['namespace']): Promise<void> => {
    const newDoc: Document = {
      id: Date.now().toString(),
      name,
      uploadDate: new Date(),
      namespace,
      encryptionStatus: 'pending',
      encryptedHash: '',
      fileSize: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
      chunks: 0,
    };

    setDocuments(prev => [...prev, newDoc]);

    // Simulate encryption process
    await new Promise(resolve => setTimeout(resolve, 800));
    setDocuments(prev =>
      prev.map(d =>
        d.id === newDoc.id ? { ...d, encryptionStatus: 'processing' as const } : d
      )
    );

    await new Promise(resolve => setTimeout(resolve, 1200));
    setDocuments(prev =>
      prev.map(d =>
        d.id === newDoc.id
          ? {
              ...d,
              encryptionStatus: 'encrypted' as const,
              encryptedHash: generateEncryptedHash(),
              chunks: Math.floor(Math.random() * 200 + 50),
            }
          : d
      )
    );
  };

  const addQuery = (message: QueryMessage) => {
    setQueryHistory(prev => [...prev, message]);
  };

  const clearQueryHistory = () => {
    setQueryHistory([]);
  };

  const addAuditLog = (log: Omit<AuditLog, 'id'>) => {
    const newLog: AuditLog = {
      ...log,
      id: `al_${Date.now()}`,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const stats = {
    totalDocuments: documents.filter(d => d.encryptionStatus === 'encrypted').length,
    queriesToday: Math.floor(Math.random() * 50 + 20),
    storageUsed: '12.4 GB',
    securityStatus: 'secure' as const,
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        documents,
        addDocument,
        queryHistory,
        addQuery,
        clearQueryHistory,
        auditLogs,
        addAuditLog,
        stats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}