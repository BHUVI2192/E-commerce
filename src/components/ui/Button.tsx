import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'text';
  theme?: 'light' | 'dark';
  arrow?: 'right' | 'upRight' | 'none';
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  theme = 'light',
  arrow = 'none',
  children,
  className = '',
  onClick,
  ...rest
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center gap-2 rounded-none text-[11px] uppercase tracking-[0.14em] font-medium transition-colors duration-200 select-none cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#B4532A] focus-visible:outline-offset-2';

  let variantClasses = '';

  if (variant === 'solid') {
    if (theme === 'light') {
      variantClasses =
        'bg-[#25231F] text-[#F2EFE9] px-6 py-3.5 hover:bg-[#3B3833] active:bg-[#1A1815]';
    } else {
      variantClasses =
        'bg-[#F2EFE9] text-[#25231F] px-6 py-3.5 hover:bg-[#E7E2D8] active:bg-[#D5CEBF]';
    }
  } else if (variant === 'outline') {
    if (theme === 'light') {
      variantClasses =
        'bg-transparent border border-[#25231F] text-[#25231F] px-5 py-3 hover:bg-[#25231F] hover:text-[#F2EFE9]';
    } else {
      variantClasses =
        'bg-transparent border border-[#F2EFE9]/30 text-[#F2EFE9] px-5 py-3 hover:border-[#F2EFE9] hover:bg-[#F2EFE9]/10';
    }
  } else if (variant === 'text') {
    if (theme === 'light') {
      variantClasses =
        'bg-transparent px-0 py-1 text-[#25231F] link-draw hover:text-[#B4532A]';
    } else {
      variantClasses =
        'bg-transparent px-0 py-1 text-[#F2EFE9] link-draw hover:text-[#B4532A]';
    }
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      {...rest}
    >
      <span>{children}</span>
      {arrow === 'right' && (
        <ArrowRight className="w-3.5 h-3.5 stroke-[1.25] transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
      {arrow === 'upRight' && (
        <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.25] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </button>
  );
};
