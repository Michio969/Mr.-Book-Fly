import React from 'react';

export interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  toggleText?: string;
  toggleLink?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children, toggleText, toggleLink }) => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-parchment-50 via-white to-glass-50">
      {/* Background Glass Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md">
        <div className="glass-effect rounded-3xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-serif font-bold text-foreground">{title}</h1>
            {subtitle && <p className="text-sm text-text-secondary">{subtitle}</p>}
          </div>

          {/* Content */}
          <div>{children}</div>

          {/* Toggle Link */}
          {toggleText && toggleLink && (
            <div className="text-center pt-4 border-t border-border">
              <p className="text-sm text-text-secondary">
                {toggleText}{' '}
                <a href={toggleLink} className="font-medium text-amber-600 hover:text-amber-700 transition-smooth">
                  Click here
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Accent Elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-amber-200 opacity-30 blur-lg" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-teal-200 opacity-30 blur-lg" />
      </div>
    </div>
  );
};

export default AuthLayout;
