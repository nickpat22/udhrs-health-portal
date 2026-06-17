import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, User } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { ROLES } from '../auth/types';
import { useToast } from '../hooks/useToast';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<keyof typeof ROLES | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !password) {
      showToast('Please enter both ID and password', 'error');
      return;
    }
    setLoading(true);
    const result = login(userId, password);
    setLoading(false);
    if (result.success) {
      showToast('Login successful!', 'success');
    } else {
      showToast(result.error || 'Login failed', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-cyan-600 p-3 rounded-lg">
              <Shield className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">UDHRS Portal</h1>
          <p className="text-gray-600 mt-2">Universal Digital Health Records System</p>
        </div>

        {/* Role Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Your Role</h2>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(ROLES).map(([key, role]) => (
              <button
                key={key}
                onClick={() => setSelectedRole(key as keyof typeof ROLES)}
                className={`p-3 rounded-lg text-center transition-all ${
                  selectedRole === key
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="font-semibold text-sm">{role.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Sign In</h2>

          {/* User ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="e.g., UDHRS-PAT-10001"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Demo IDs: UDHRS-PAT-10001, UDHRS-DOC-20001, UDHRS-ADM-90001</p>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Demo password: patient123, doctor123, admin123, etc.</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          © 2024 UDHRS - Universal Digital Health Records System
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
