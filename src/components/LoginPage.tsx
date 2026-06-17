import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, User, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { ROLES } from '../auth/types';

const LoginPage: React.FC = () => {
  const { login, selectedRole, setSelectedRole } = useAuth();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedRole) {
      setError('Please select your role first.');
      return;
    }

    if (!userId.trim() || !password) {
      setError('Please enter both User ID and password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = login(userId, password);
      setLoading(false);

      if (!result.success) {
        setError(result.error || 'Login failed.');
      }
    }, 600);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setUserId('');
    setPassword('');
    setError('');
  };

  const renderRoleSelection = () => (
    <div className="flex-1 flex flex-col">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl shadow-blue-500/20 mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900">Welcome to UDHRS</h1>
        <p className="text-slate-500 mt-3 text-lg">Unified Digital Health Record System</p>
        <p className="text-slate-400 mt-1 text-sm">Cloud-Based · Role-Based Access Control · Multi-Device · Audit Logged</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(ROLES).map((roleConfig) => (
          <button
            key={roleConfig.role}
            type="button"
            onClick={() => setSelectedRole(roleConfig.role)}
            className="group rounded-3xl border border-slate-200 bg-white p-6 text-left transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-100/50"
          >
            <div className="text-4xl mb-4">{roleConfig.icon}</div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{roleConfig.label}</h3>
            <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{roleConfig.description}</p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">{roleConfig.idFormat}</span>
              <span className={`text-xs font-semibold ${roleConfig.textColor} group-hover:translate-x-1 transition-transform`}>Login →</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-3xl p-5 max-w-2xl mx-auto">
        <h4 className="text-sm font-semibold text-blue-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Demo Credentials
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs text-blue-800">
          <div><strong>Doctor:</strong> UDHRS-DOC-20001 / doctor123</div>
          <div><strong>Patient:</strong> UDHRS-PAT-10001 / patient123</div>
          <div><strong>Laboratory:</strong> UDHRS-LAB-30001 / lab123</div>
          <div><strong>Pharmacy:</strong> UDHRS-PHM-40001 / pharm123</div>
          <div><strong>Records:</strong> UDHRS-MRC-50001 / records123</div>
          <div><strong>Admin:</strong> UDHRS-ADM-90001 / admin123</div>
        </div>
      </div>
    </div>
  );

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
        <header className="bg-white border-b-4 border-orange-500 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-green-600 flex items-center justify-center">
                  <span className="text-white text-xl">🇮🇳</span>
                </div>
                <div>
                  <h1 className="text-sm font-bold text-slate-900">भारत सरकार | Government of India</h1>
                  <p className="text-xs text-slate-600">Ministry of Health & Family Welfare</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>Secured by AES-256 & RSA Encryption</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-5xl">{renderRoleSelection()}</div>
        </div>

        <footer className="bg-white border-t border-slate-200 py-4 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span>© 2024 UDHRS - Government of India</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">Helpline: 1800-XXX-XXXX</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>|</span>
              <span>Terms of Service</span>
              <span>|</span>
              <span>GIGW Compliance</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  const roleConfig = ROLES[selectedRole];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <header className="bg-white border-b-4 border-orange-500 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-green-600 flex items-center justify-center">
                <span className="text-white text-xl">🇮🇳</span>
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-900">भारत सरकार | Government of India</h1>
                <p className="text-xs text-slate-600">Ministry of Health & Family Welfare</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Secured by AES-256 & RSA Encryption</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <button
            type="button"
            onClick={handleBack}
            className="mb-6 inline-flex items-center gap-1 text-sm text-slate-600 hover:text-blue-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Role Selection
          </button>

          <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-200/80">
            <div className={`bg-gradient-to-r ${roleConfig.bgGradient} px-6 py-5`}>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 text-3xl">
                  {roleConfig.icon}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{roleConfig.label} Login</h2>
                  <p className="text-sm text-white/80">{roleConfig.description}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleLogin} className="p-6 space-y-5">
              {error && (
                <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-slate-900">User ID</label>
                <div className="mt-3 rounded-3xl bg-white/10 px-4 py-3 shadow-sm ring-1 ring-slate-200/80">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-slate-200" />
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder={roleConfig.idFormat}
                      className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-900">Password</label>
                <div className="mt-3 rounded-3xl bg-white/10 px-4 py-3 shadow-sm ring-1 ring-slate-200/80">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-slate-200" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400">
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>

              <p className="text-xs text-slate-500">
                Demo IDs: UDHRS-PAT-10001, UDHRS-DOC-20001, UDHRS-ADM-90001
              </p>
            </form>
          </div>

          <p className="text-center text-slate-500 text-sm mt-6">© 2024 UDHRS - Universal Digital Health Records System</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
