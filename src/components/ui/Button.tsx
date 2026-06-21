import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline-light';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-grad-brand text-white shadow-glow-green hover:brightness-105 active:brightness-95 focus-visible:outline-brand-700',
  secondary:
    'bg-grad-sun text-ink-900 shadow-glow-orange hover:brightness-105 active:brightness-95',
  ghost:
    'bg-transparent text-brand-700 hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-white/5',
  'outline-light':
    'bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-5 py-3 text-[15px] gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      fullWidth,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center font-display font-semibold rounded-full
          transition-all duration-200 ease-out
          min-h-[44px]
          ${fullWidth ? 'w-full' : ''}
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${disabled ? 'opacity-50 cursor-not-allowed hover:brightness-100 active:brightness-100' : 'hover:-translate-y-0.5 active:translate-y-0'}
          ${className}
        `}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="text-lg">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="text-lg">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
