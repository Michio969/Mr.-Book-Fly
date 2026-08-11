import React from 'react';

export interface GlassCardProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`glass-effect rounded-2xl p-6 ${className}`}>
      {title && <h3 className="text-xl font-serif font-semibold mb-2 text-amber-700">{title}</h3>}
      <div className="text-foreground">{children}</div>
    </div>
  );
};

export default GlassCard;
