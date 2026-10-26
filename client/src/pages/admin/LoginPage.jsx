import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Layers,
  Lock,
  Mail,
  ShieldCheck,
  ArrowRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

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
      return;
    }
    setError('');
    setLoading(true);

    // Mock navigation for Frontend Foundation phase
    setTimeout(() => {
      setLoading(false);
      navigate('/admin/dashboard');
    }, 600);
  };

  const fillDemoCredentials = () => {
    setEmail('admin@synapseforms.org');
    setPassword('SynapseSecure2026!');
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-gradient-to-tr from-indigo-200/50 to-sky-200/40 blur-3xl -z-10 rounded-full pointer-events-none" />

      {/* Brand & Title */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Layers className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Synapse<span className="text-indigo-600">Forms</span>
          </span>
        </Link>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Admin Portal Authentication
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Enter administrative credentials to access forms and verification tools.
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full sm:max-w-md">
        <Card className="shadow-lg border-slate-200/80">
          {/* Mock banner */}
          <div className="mb-5 rounded-lg bg-indigo-50 border border-indigo-200/70 p-3 flex items-start gap-2.5 text-xs text-indigo-900">
            <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">Frontend Foundation Mock</span>
              <span>
                Authentication APIs are decoupled. Submitting will simulate a successful login and route to the Admin Dashboard.
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Admin Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@synapseforms.org"
              icon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Secret Key / Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your admin passphrase"
              icon={<Lock className="w-4 h-4" />}
              error={error}
            />

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Remember session</span>
              </label>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
              >
                Auto-fill Demo
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              loading={loading}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="mt-2"
            >
              Sign In to Console
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link
              to="/"
              className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
            >
              ← Back to Public Site
            </Link>
            <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TLS / Secure Mock</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
