import { useState, useRef, useEffect } from 'react';
import { Send, Lock, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { QueryMessage as QueryMessageComponent } from '@/components/QueryMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { getAIResponse, generateEncryptedHash, QueryMessage } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const sampleQueries = [
  "What is our company's remote work policy?",
  'Show me Q4 financial projections',
  'What are the legal compliance requirements?',
  'Summarize employee benefits for 2025',
  'What is on the product roadmap?',
];

type ProcessingStep = 'idle' | 'encrypting' | 'searching' | 'decrypting' | 'complete';

export default function Query() {
  const { queryHistory, addQuery, clearQueryHistory, addAuditLog, documents } = useApp();
  const [inputValue, setInputValue] = useState('');
  const [processingStep, setProcessingStep] = useState<ProcessingStep>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [queryHistory, processingStep]);

  const processQuery = async (query: string) => {
    if (!query.trim() || processingStep !== 'idle') return;

    // Add user message
    const userMessage: QueryMessage = {
      id: `q_${Date.now()}`,
      type: 'user',
      content: query,
      timestamp: new Date(),
    };
    addQuery(userMessage);
    setInputValue('');

    // Processing stages
    setProcessingStep('encrypting');
    addQuery({
      id: `s_${Date.now()}_1`,
      type: 'system',
      content: 'Encrypting query with AES-256-GCM...',
      timestamp: new Date(),
    });
    await new Promise(r => setTimeout(r, 800));

    setProcessingStep('searching');
    addQuery({
      id: `s_${Date.now()}_2`,
      type: 'system',
      content: 'Searching encrypted vector embeddings...',
      timestamp: new Date(),
    });
    await new Promise(r => setTimeout(r, 1200));

    setProcessingStep('decrypting');
    addQuery({
      id: `s_${Date.now()}_3`,
      type: 'system',
      content: 'Decrypting matched results...',
      timestamp: new Date(),
    });
    await new Promise(r => setTimeout(r, 600));

    // Get AI response
    const aiResponse = getAIResponse(query);

    const assistantMessage: QueryMessage = {
      id: `a_${Date.now()}`,
      type: 'assistant',
      content: aiResponse.response,
      timestamp: new Date(),
      sources: aiResponse.sources,
      confidence: aiResponse.confidence,
      encryptionMetadata: {
        queryHash: generateEncryptedHash(),
        vectorsSearched: Math.floor(Math.random() * 400 + 100),
        decryptionTime: `${Math.floor(Math.random() * 20 + 10)}ms`,
      },
    };
    addQuery(assistantMessage);

    // Add to audit log
    addAuditLog({
      timestamp: new Date(),
      user: 'admin@company.com',
      queryText: query,
      documentsAccessed: aiResponse.sources,
      encryptionMethod: 'AES-256-GCM + FHE',
      status: 'success',
      responseTime: `${Math.floor(Math.random() * 30 + 30)}ms`,
    });

    setProcessingStep('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processQuery(inputValue);
  };

  const handleSampleQuery = (query: string) => {
    setInputValue(query);
  };

  // Filter out system messages for display
  const displayMessages = queryHistory.filter(m => m.type !== 'system' || processingStep !== 'idle');

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-10rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Encrypted Query</h1>
            <p className="text-muted-foreground text-sm">
              Ask anything about your enterprise knowledge base
            </p>
          </div>
          {queryHistory.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearQueryHistory}>
              <RefreshCw size={14} className="mr-2" />
              Clear Chat
            </Button>
          )}
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto glass-card p-4 mb-4">
          {displayMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 glow-primary animate-float">
                <Sparkles size={36} className="text-primary" />
              </div>
              <h2 className="text-xl font-heading font-semibold mb-2">
                Ask Your Knowledge Base
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mb-8">
                Your queries are encrypted before search, and results are decrypted only on your device. 
                Zero plaintext exposure.
              </p>

              {/* Sample Queries */}
              <div className="w-full max-w-lg space-y-2">
                <p className="text-xs text-muted-foreground mb-3">Try these examples:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {sampleQueries.map((query, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSampleQuery(query)}
                      className="text-xs px-3 py-2 rounded-full bg-muted/30 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all border border-border/50 hover:border-primary/30"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {displayMessages.map(message => (
                <QueryMessageComponent key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Lock
                size={16}
                className={cn(
                  'absolute left-4 top-1/2 -translate-y-1/2 transition-colors',
                  processingStep !== 'idle' ? 'text-primary animate-pulse' : 'text-muted-foreground'
                )}
              />
              <Input
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Ask anything about your enterprise knowledge..."
                className="pl-11 pr-4 bg-muted/30 border-border/50 focus:border-primary h-12"
                disabled={processingStep !== 'idle'}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-12 px-6 glow-primary"
              disabled={!inputValue.trim() || processingStep !== 'idle'}
            >
              {processingStep !== 'idle' ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </Button>
          </div>

          {/* Processing Status */}
          {processingStep !== 'idle' && (
            <div className="mt-3 flex items-center gap-2 text-sm text-primary animate-fade-in">
              <div className="flex gap-1">
                <span
                  className={cn(
                    'w-2 h-2 rounded-full',
                    processingStep === 'encrypting' ? 'bg-primary animate-pulse' : 'bg-success'
                  )}
                />
                <span
                  className={cn(
                    'w-2 h-2 rounded-full',
                    processingStep === 'searching'
                      ? 'bg-primary animate-pulse'
                      : processingStep === 'decrypting' || processingStep === 'complete'
                      ? 'bg-success'
                      : 'bg-muted'
                  )}
                />
                <span
                  className={cn(
                    'w-2 h-2 rounded-full',
                    processingStep === 'decrypting'
                      ? 'bg-primary animate-pulse'
                      : processingStep === 'complete'
                      ? 'bg-success'
                      : 'bg-muted'
                  )}
                />
              </div>
              <span className="text-muted-foreground">
                {processingStep === 'encrypting' && 'Encrypting query...'}
                {processingStep === 'searching' && 'Searching encrypted vectors...'}
                {processingStep === 'decrypting' && 'Decrypting results...'}
              </span>
            </div>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
}