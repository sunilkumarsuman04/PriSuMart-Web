import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { buttonClasses, type Variant, type Size } from './buttonStyles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

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
        className={buttonClasses({ variant, size, fullWidth, disabled, className })}
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
