import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger';
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800'
};

export const Badge: React.FC<BadgeProps> = ({ 
  variant = 'default',
  children,
  className
}) => {
  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variantStyles[variant],
      className
    )}>
      {children}
    </span>
  );
};