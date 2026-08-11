import React, { useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export interface SignupFormProps {
  onSubmit?: (data: { email: string; password: string; confirmPassword: string }) => void;
  isLoading?: boolean;
  error?: string;
}

const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
  <div className="flex items-center gap-2 text-xs">
    {met ? <Check size={14} className="text-teal-600" /> : <X size={14} className="text-text-muted" />}
    <span className={met ? 'text-text-secondary' : 'text-text-muted'}>{text}</span>
  </div>
);

export const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, isLoading = false, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });

  const passwordRequirements = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
    match: formData.password && formData.password === formData.confirmPassword,
  };

  const isValid =
    formData.email &&
    passwordRequirements.length &&
    passwordRequirements.uppercase &&
    passwordRequirements.lowercase &&
    passwordRequirements.number &&
    passwordRequirements.match;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit?.(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-3 rounded-lg bg-glass-100 border border-white/15 text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-smooth"
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-foreground">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full px-4 py-3 pr-10 rounded-lg bg-glass-100 border border-white/15 text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-smooth"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground transition-smooth"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Password Requirements */}
        <div className="space-y-1.5 pt-2 pb-3 px-3 rounded-lg bg-parchment-50 border border-parchment-200">
          <PasswordRequirement met={passwordRequirements.length} text="At least 8 characters" />
          <PasswordRequirement met={passwordRequirements.uppercase} text="One uppercase letter" />
          <PasswordRequirement met={passwordRequirements.lowercase} text="One lowercase letter" />
          <PasswordRequirement met={passwordRequirements.number} text="One number" />
        </div>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full px-4 py-3 pr-10 rounded-lg bg-glass-100 border border-white/15 text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-smooth"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground transition-smooth"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {formData.confirmPassword && !passwordRequirements.match && (
          <p className="text-xs text-red-600">Passwords do not match</p>
        )}
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
        disabled={!isValid || isLoading}
        className="w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>

      {/* Terms */}
      <p className="text-xs text-text-secondary text-center">
        By signing up, you agree to our{' '}
        <a href="#terms" className="text-amber-600 hover:text-amber-700 transition-smooth">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#privacy" className="text-amber-600 hover:text-amber-700 transition-smooth">
          Privacy Policy
        </a>
      </p>
    </form>
  );
};

export default SignupForm;
