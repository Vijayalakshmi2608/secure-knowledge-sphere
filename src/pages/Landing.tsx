import { Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  FileSearch,
  Activity,
  ArrowRight,
  CheckCircle2,
  Zap,
  Server,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Shield,
    title: 'Encryption-in-Use Technology',
    description: 'Query your data while it remains fully encrypted. No decryption needed during search.',
  },
  {
    icon: Lock,
    title: 'Zero-Trust Architecture',
    description: 'Your data is never exposed, not even to the AI models processing your queries.',
  },
  {
    icon: FileSearch,
    title: 'Encrypted Vector Search',
    description: 'Semantic search over encrypted embeddings with 98.5% accuracy vs plaintext.',
  },
  {
    icon: Activity,
    title: 'Full Audit Trail',
    description: 'Complete visibility into every query, access, and data operation.',
  },
];

const stats = [
  { value: '45ms', label: 'Average Query Latency' },
  { value: '98.5%', label: 'Accuracy vs Plaintext' },
  { value: '1000+', label: 'Queries/Second' },
  { value: 'AES-256', label: 'Encryption Standard' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg gradient-text">CipherLearn AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button size="sm" className="glow-primary">Try Demo</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-sm text-primary animate-fade-in">
              <Zap size={14} />
              Powered by CyborgDB Encryption Engine
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight animate-slide-up">
              Enterprise AI{' '}
              <span className="gradient-text">Without Data Exposure</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Query your knowledge base while your data stays encrypted. 
              Full semantic search, zero plaintext exposure, enterprise-grade security.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/login">
                <Button size="lg" className="glow-primary group text-base px-8">
                  Try Demo
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg" className="text-base px-8">
                  Learn More
                </Button>
              </a>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="glass-card p-5 text-center animate-fade-in"
                style={{ animationDelay: `${idx * 0.1 + 0.3}s` }}
              >
                <p className="text-2xl md:text-3xl font-heading font-bold gradient-text">{stat.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Privacy-First <span className="gradient-text">AI Architecture</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for enterprises that can't compromise on data security. 
              Our technology ensures your sensitive data never leaves its encrypted state.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className="glass-card-elevated p-6 group hover:border-primary/30 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-border/30 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              How <span className="gradient-text">CipherLearn</span> Works
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Upload & Encrypt',
                  description: 'Documents are encrypted client-side before being processed into semantic embeddings.',
                  icon: Lock,
                },
                {
                  step: '02',
                  title: 'Encrypted Search',
                  description: 'Queries are processed over encrypted vectors using homomorphic encryption.',
                  icon: FileSearch,
                },
                {
                  step: '03',
                  title: 'Secure Results',
                  description: 'Results are decrypted only on your device. Zero plaintext on servers.',
                  icon: Shield,
                },
              ].map((item, idx) => (
                <div
                  key={item.step}
                  className="relative text-center animate-slide-up"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                    <item.icon size={28} />
                  </div>
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-xs font-bold text-primary/60">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-heading font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card-elevated p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold">
                    Enterprise-Ready <span className="gradient-text">Security</span>
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'SOC 2 Type II Compliant',
                      'GDPR & CCPA Ready',
                      'End-to-End Encryption',
                      'On-Premise Deployment Available',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                    <Server size={32} className="text-muted-foreground" />
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                    <Globe size={32} className="text-muted-foreground" />
                  </div>
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 glow-primary">
                    <Shield size={32} className="text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Secure Your <span className="gradient-text">Enterprise Knowledge?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Start querying your data with complete privacy. No credit card required for demo.
          </p>
          <Link to="/login">
            <Button size="lg" className="glow-primary text-base px-8">
              Get Started Free
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold gradient-text">CipherLearn AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Powered by <span className="font-semibold text-foreground">CyborgDB</span> • Zero-Knowledge Architecture
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}