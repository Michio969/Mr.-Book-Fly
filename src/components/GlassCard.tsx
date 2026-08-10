import React from 'react';

export interface GlassCardProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`backdrop-blur-lg bg-white/30 border border-white/10 rounded-2xl p-6 shadow-lg ${className}`}>
      {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
      <div className="text-slate-700">{children}</div>
    </div>
  );
};

export default GlassCard;
