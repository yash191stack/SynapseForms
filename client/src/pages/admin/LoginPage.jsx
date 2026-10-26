import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Layers,
  Lock,
  Mail,
  ShieldCheck,
  ArrowRight,
  Info,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@synapseforms.org');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your admin email.');
      toast.error('Email required');
      return;
    }
    setError('');
    setLoading(true);

    toast.loading('Authenticating session...', { id: 'login-toast' });

    // Mock navigation for Frontend Foundation phase
    setTimeout(() => {
      setLoading(false);
      toast.success('Welcome back, Administrator!', { id: 'login-toast' });
      navigate('/admin/dashboard');
    }, 500);
  };

  const fillDemoCredentials = () => {
    setEmail('admin@synapseforms.org');
    setPassword('SynapseSecure2026!');
    setError('');
    toast.info('Demo administrator credentials populated', { duration: 2000 });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[340px] bg-gradient-to-tr from-indigo-500/15 to-sky-500/15 blur-3xl -z-10 rounded-full pointer-events-none" />

      {/* Brand & Title */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 group-hover:scale-105 active:scale-95 transition-transform duration-150">
            <Layers className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Synapse<span className="text-indigo-600">Forms</span>
          </span>
        </Link>
        <h2 className="text-lg font-bold text-foreground tracking-tight">
          Admin Portal Authentication
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Enter administrative credentials to access forms and verification tools.
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full sm:max-w-md">
        <Card className="border-border/80 shadow-lg bg-card/95 backdrop-blur-xs">
          <CardHeader className="p-6 pb-4">
            <div className="rounded-lg bg-muted/60 border border-border/70 p-3 flex items-start gap-2.5 text-xs text-foreground">
              <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Frontend Foundation Mock</span>
                <span className="text-muted-foreground text-[11px]">
                  Authentication APIs are decoupled. Submitting simulates successful authentication and routes to the Dashboard.
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 pt-0 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-foreground uppercase tracking-wider block">
                  Admin Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@synapseforms.org"
                    className="pl-9 text-xs h-9"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-foreground uppercase tracking-wider block">
                    Passphrase / Secret Key
                  </label>
                  <button
                    type="button"
                    onClick={fillDemoCredentials}
                    className="text-[11px] text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
                  >
                    Auto-fill Demo
                  </button>
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin passphrase"
                    className="pl-9 text-xs h-9"
                  />
                </div>
                {error && <p className="text-[11px] text-destructive font-medium">{error}</p>}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-border text-indigo-600 focus:ring-ring"
                  />
                  <span className="text-[11px]">Remember session</span>
                </label>
                <span className="text-[11px] text-muted-foreground">Session: 24h</span>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs h-9 text-xs font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Console</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="p-6 pt-0 border-t border-border/70 flex items-center justify-between text-xs text-muted-foreground">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors text-[11px]"
            >
              ← Back to Public Site
            </Link>
            <div className="flex items-center gap-1.5 text-emerald-600 font-medium text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TLS / Secure Mock</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
