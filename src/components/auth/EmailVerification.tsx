import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export interface EmailVerificationProps {
  email: string;
  onVerify?: (code: string) => void;
  onResend?: () => void;
  isLoading?: boolean;
  error?: string;
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  onVerify,
  onResend,
  isLoading = false,
  error,
}) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify?.(code);
  };

  return (
    <div className="w-full space-y-6">
      {/* Icon & Message */}
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-teal-100">
            <Mail size={32} className="text-teal-600" />
          </div>
        </div>
        <h2 className="text-2xl font-serif font-semibold text-foreground">Verify Your Email</h2>
        <p className="text-sm text-text-secondary">
          We've sent a verification code to <strong className="text-foreground">{email}</strong>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Code Input */}
        <div className="space-y-2">
          <label htmlFor="code" className="block text-sm font-medium text-foreground">
            Verification Code
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="000000"
            maxLength={6}
            required
            className="w-full px-4 py-3 rounded-lg bg-glass-100 border border-white/15 text-center text-lg font-mono text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-smooth"
          />
          <p className="text-xs text-text-secondary">Check your email for the 6-digit code</p>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={code.length !== 6 || isLoading}
          className="w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>

      {/* Resend Link */}
      <div className="text-center">
        <p className="text-sm text-text-secondary">
          Didn't receive the code?{' '}
          <button
            type="button"
            onClick={onResend}
            className="font-medium text-amber-600 hover:text-amber-700 transition-smooth"
          >
            Resend Code
          </button>
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
