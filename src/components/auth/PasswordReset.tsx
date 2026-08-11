import React, { useState } from 'react';
import { Lock } from 'lucide-react';

export type PasswordResetStep = 'request' | 'verify' | 'reset' | 'success';

export interface PasswordResetProps {
  onRequest?: (email: string) => void;
  onVerify?: (code: string) => void;
  onReset?: (password: string) => void;
  isLoading?: boolean;
  error?: string;
  step?: PasswordResetStep;
  email?: string;
}

export const PasswordReset: React.FC<PasswordResetProps> = ({
  onRequest,
  onVerify,
  onReset,
  isLoading = false,
  error,
  step = 'request',
  email: initialEmail,
}) => {
  const [email, setEmail] = useState(initialEmail || '');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRequest?.(email);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify?.(code);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      onReset?.(password);
    }
  };

  const handleSuccessSubmit = () => {
    window.location.href = '/login';
  };

  return (
    <div className="w-full space-y-6">
      {step === 'request' && (
        <>
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-amber-100">
                <Lock size={32} className="text-amber-600" />
              </div>
            </div>
            <h2 className="text-2xl font-serif font-semibold text-foreground">Reset Password</h2>
            <p className="text-sm text-text-secondary">Enter your email address and we'll send you a reset link</p>
          </div>

          <form onSubmit={handleRequestSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-lg bg-glass-100 border border-white/15 text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-smooth"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        </>
      )}

      {step === 'verify' && (
        <>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-serif font-semibold text-foreground">Verify Reset Code</h2>
            <p className="text-sm text-text-secondary">Check your email for the verification code</p>
          </div>

          <form onSubmit={handleVerifySubmit} className="space-y-4">
            <div className="space-y-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="000000"
                maxLength={6}
                required
                className="w-full px-4 py-3 rounded-lg bg-glass-100 border border-white/15 text-center text-lg font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-smooth"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={code.length !== 6 || isLoading}
              className="w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>
        </>
      )}

      {step === 'reset' && (
        <>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-serif font-semibold text-foreground">Create New Password</h2>
            <p className="text-sm text-text-secondary">Enter your new password below</p>
          </div>

          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                New Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-lg bg-glass-100 border border-white/15 text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-smooth"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-lg bg-glass-100 border border-white/15 text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-smooth"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!password || password !== confirmPassword || isLoading}
              className="w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </>
      )}

      {step === 'success' && (
        <>
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-teal-100">
                <Lock size={32} className="text-teal-600" />
              </div>
            </div>
            <h2 className="text-2xl font-serif font-semibold text-foreground">Password Reset</h2>
            <p className="text-sm text-text-secondary">Your password has been successfully reset. You can now sign in with your new password.</p>
          </div>

          <button
            onClick={handleSuccessSubmit}
            className="w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 transition-smooth"
          >
            Return to Login
          </button>
        </>
      )}
    </div>
  );
};

export default PasswordReset;
