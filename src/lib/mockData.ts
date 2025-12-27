// CipherLearn AI Mock Data and Types

export interface Document {
  id: string;
  name: string;
  uploadDate: Date;
  namespace: 'HR' | 'Finance' | 'Engineering' | 'Legal' | 'R&D';
  encryptionStatus: 'pending' | 'processing' | 'encrypted';
  encryptedHash: string;
  fileSize: string;
  chunks: number;
}

export interface QueryMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  sources?: string[];
  confidence?: number;
  encryptionMetadata?: {
    queryHash: string;
    vectorsSearched: number;
    decryptionTime: string;
  };
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  user: string;
  queryText: string;
  documentsAccessed: string[];
  encryptionMethod: string;
  status: 'success' | 'failed';
  responseTime: string;
}

export interface User {
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

// Generate random encrypted hash
export const generateEncryptedHash = (): string => {
  const chars = 'abcdef0123456789';
  let hash = 'enc_';
  for (let i = 0; i < 8; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

// Initial sample documents
export const initialDocuments: Document[] = [
  {
    id: '1',
    name: 'Company_Handbook_2025.pdf',
    uploadDate: new Date('2025-01-10'),
    namespace: 'HR',
    encryptionStatus: 'encrypted',
    encryptedHash: 'enc_7f4a2b3c',
    fileSize: '2.4 MB',
    chunks: 156,
  },
  {
    id: '2',
    name: 'Q4_Financial_Report.pdf',
    uploadDate: new Date('2025-01-08'),
    namespace: 'Finance',
    encryptionStatus: 'encrypted',
    encryptedHash: 'enc_9d8e7f6a',
    fileSize: '1.8 MB',
    chunks: 89,
  },
  {
    id: '3',
    name: 'Product_Roadmap_2025.pdf',
    uploadDate: new Date('2025-01-05'),
    namespace: 'Engineering',
    encryptionStatus: 'encrypted',
    encryptedHash: 'enc_3b2c1d0e',
    fileSize: '3.2 MB',
    chunks: 234,
  },
  {
    id: '4',
    name: 'Legal_Compliance_Guide.pdf',
    uploadDate: new Date('2025-01-03'),
    namespace: 'Legal',
    encryptionStatus: 'encrypted',
    encryptedHash: 'enc_5a4b3c2d',
    fileSize: '4.1 MB',
    chunks: 312,
  },
  {
    id: '5',
    name: 'Remote_Work_Policy.pdf',
    uploadDate: new Date('2025-01-15'),
    namespace: 'HR',
    encryptionStatus: 'encrypted',
    encryptedHash: 'enc_1e2f3a4b',
    fileSize: '856 KB',
    chunks: 42,
  },
  {
    id: '6',
    name: 'Security_Protocols_v2.pdf',
    uploadDate: new Date('2025-01-12'),
    namespace: 'Engineering',
    encryptionStatus: 'encrypted',
    encryptedHash: 'enc_8c9d0e1f',
    fileSize: '1.2 MB',
    chunks: 78,
  },
  {
    id: '7',
    name: 'Employee_Benefits_2025.pdf',
    uploadDate: new Date('2025-01-14'),
    namespace: 'HR',
    encryptionStatus: 'encrypted',
    encryptedHash: 'enc_2a3b4c5d',
    fileSize: '1.5 MB',
    chunks: 95,
  },
];

// Sample audit logs
export const initialAuditLogs: AuditLog[] = [
  {
    id: 'al1',
    timestamp: new Date('2025-01-27T10:30:00'),
    user: 'admin@company.com',
    queryText: 'What is the remote work policy?',
    documentsAccessed: ['Remote_Work_Policy.pdf', 'Company_Handbook_2025.pdf'],
    encryptionMethod: 'AES-256-GCM + FHE',
    status: 'success',
    responseTime: '42ms',
  },
  {
    id: 'al2',
    timestamp: new Date('2025-01-27T09:15:00'),
    user: 'admin@company.com',
    queryText: 'Q4 financial projections',
    documentsAccessed: ['Q4_Financial_Report.pdf'],
    encryptionMethod: 'AES-256-GCM + FHE',
    status: 'success',
    responseTime: '38ms',
  },
  {
    id: 'al3',
    timestamp: new Date('2025-01-26T16:45:00'),
    user: 'admin@company.com',
    queryText: 'Legal compliance requirements',
    documentsAccessed: ['Legal_Compliance_Guide.pdf'],
    encryptionMethod: 'AES-256-GCM + FHE',
    status: 'success',
    responseTime: '51ms',
  },
  {
    id: 'al4',
    timestamp: new Date('2025-01-26T14:20:00'),
    user: 'admin@company.com',
    queryText: 'Product roadmap timeline',
    documentsAccessed: ['Product_Roadmap_2025.pdf'],
    encryptionMethod: 'AES-256-GCM + FHE',
    status: 'success',
    responseTime: '45ms',
  },
  {
    id: 'al5',
    timestamp: new Date('2025-01-26T11:00:00'),
    user: 'admin@company.com',
    queryText: 'Employee benefits overview',
    documentsAccessed: ['Employee_Benefits_2025.pdf', 'Company_Handbook_2025.pdf'],
    encryptionMethod: 'AES-256-GCM + FHE',
    status: 'success',
    responseTime: '47ms',
  },
];

// AI Response templates
export const queryResponses: Record<string, { response: string; sources: string[]; confidence: number }> = {
  'remote work': {
    response: `Based on the encrypted document analysis, our company's Remote Work Policy allows employees to work remotely up to 3 days per week with prior manager approval. Key requirements include:

• Minimum 2 days in-office per week for collaboration
• Core hours availability: 10 AM - 3 PM local time
• Secure VPN connection mandatory for remote access
• Equipment provided: laptop, monitor, and ergonomic accessories

This policy was last updated on January 15, 2025, and applies to all full-time employees.`,
    sources: ['Remote_Work_Policy.pdf', 'Company_Handbook_2025.pdf'],
    confidence: 0.94,
  },
  'financial': {
    response: `Q4 2024 Financial Projections (Encrypted Analysis):

• Revenue Target: $48.5M (+12% YoY)
• Gross Margin: 72.3%
• Operating Expenses: $28.2M
• EBITDA Projection: $14.8M
• Cash Position: $125M

Key Growth Drivers:
1. Enterprise segment expansion (+18%)
2. New product line launch (contributing $4.2M)
3. International market penetration (EU +22%)

Note: All financial data was processed through encrypted vector search with zero plaintext exposure.`,
    sources: ['Q4_Financial_Report.pdf'],
    confidence: 0.97,
  },
  'legal': {
    response: `Legal Compliance Requirements Summary:

**Data Protection:**
• GDPR compliance for EU operations (mandatory)
• CCPA compliance for California customers
• SOC 2 Type II certification (renewed annually)

**Industry Regulations:**
• PCI DSS for payment processing
• HIPAA considerations for healthcare clients
• Export control compliance (EAR/ITAR)

**Key Deadlines:**
• Q1 2025: Annual compliance audit
• Q2 2025: Security certification renewal
• Ongoing: Monthly vulnerability assessments

All compliance documents are encrypted at rest and in transit using enterprise-grade encryption.`,
    sources: ['Legal_Compliance_Guide.pdf'],
    confidence: 0.92,
  },
  'benefits': {
    response: `2025 Employee Benefits Overview:

**Health & Wellness:**
• Medical: PPO/HMO options with company covering 90% of premiums
• Dental & Vision: Fully covered for employees
• Mental Health: Unlimited therapy sessions through BetterHelp
• Gym Membership: $100/month stipend

**Financial Benefits:**
• 401(k) with 6% company match
• Stock options (vesting over 4 years)
• Annual bonus: 10-20% of base salary

**Time Off:**
• Unlimited PTO (minimum 15 days encouraged)
• 12 paid holidays
• 16 weeks parental leave

Contact HR for personalized benefits enrollment assistance.`,
    sources: ['Employee_Benefits_2025.pdf', 'Company_Handbook_2025.pdf'],
    confidence: 0.96,
  },
  'product': {
    response: `2025 Product Roadmap Highlights:

**Q1 2025:**
• CipherLearn AI v2.0 launch
• Enhanced encryption protocols
• Multi-tenant architecture rollout

**Q2 2025:**
• Mobile SDK release (iOS/Android)
• Real-time collaboration features
• Advanced analytics dashboard

**Q3 2025:**
• AI model fine-tuning capabilities
• Custom embedding support
• Enterprise SSO integration

**Q4 2025:**
• On-premise deployment option
• Multi-cloud support (AWS, GCP, Azure)
• Compliance automation tools

Technical stack: Built on CyborgDB for encrypted vector operations.`,
    sources: ['Product_Roadmap_2025.pdf'],
    confidence: 0.91,
  },
  'security': {
    response: `Security Protocols v2 Summary:

**Encryption Standards:**
• AES-256-GCM for data at rest
• TLS 1.3 for data in transit
• Homomorphic encryption for computation

**Access Control:**
• Zero-trust architecture
• Role-based access (RBAC)
• Multi-factor authentication required
• Session timeout: 30 minutes

**Monitoring:**
• 24/7 SOC monitoring
• Automated threat detection
• Incident response SLA: 15 minutes

**Compliance:**
• Weekly vulnerability scans
• Quarterly penetration testing
• Annual third-party audits

All security protocols are enforced at the infrastructure level.`,
    sources: ['Security_Protocols_v2.pdf'],
    confidence: 0.95,
  },
};

// Helper to find matching response
export const getAIResponse = (query: string): { response: string; sources: string[]; confidence: number } => {
  const lowerQuery = query.toLowerCase();
  
  for (const [keyword, data] of Object.entries(queryResponses)) {
    if (lowerQuery.includes(keyword)) {
      return data;
    }
  }
  
  // Default response for unmatched queries
  return {
    response: `Based on encrypted document search across your knowledge base, I found relevant information related to your query. The search processed ${Math.floor(Math.random() * 500 + 200)} encrypted vector embeddings with zero plaintext exposure.

For more specific results, try queries related to:
• Remote work policies
• Financial reports and projections
• Legal compliance requirements
• Employee benefits
• Product roadmap
• Security protocols

All searches are conducted using homomorphic encryption, ensuring your data remains encrypted even during query processing.`,
    sources: ['Company_Handbook_2025.pdf'],
    confidence: 0.78,
  };
};

// Analytics data
export const analyticsData = {
  weeklyQueries: [
    { day: 'Mon', queries: 45 },
    { day: 'Tue', queries: 62 },
    { day: 'Wed', queries: 58 },
    { day: 'Thu', queries: 71 },
    { day: 'Fri', queries: 54 },
    { day: 'Sat', queries: 12 },
    { day: 'Sun', queries: 8 },
  ],
  documentAccess: [
    { name: 'Company Handbook', count: 156 },
    { name: 'Financial Report', count: 134 },
    { name: 'Remote Work Policy', count: 98 },
    { name: 'Legal Guide', count: 87 },
    { name: 'Product Roadmap', count: 76 },
  ],
  responseTime: [
    { time: '00:00', latency: 42 },
    { time: '04:00', latency: 38 },
    { time: '08:00', latency: 51 },
    { time: '12:00', latency: 67 },
    { time: '16:00', latency: 58 },
    { time: '20:00', latency: 44 },
  ],
  encryptionOverhead: [
    { metric: 'Query Time', encrypted: 45, plaintext: 12 },
    { metric: 'Index Build', encrypted: 120, plaintext: 35 },
    { metric: 'Storage', encrypted: 1.2, plaintext: 1.0 },
  ],
};

// Demo user
export const demoUser: User = {
  email: 'admin@cipherlearn.ai',
  name: 'Alex Chen',
  role: 'Administrator',
};