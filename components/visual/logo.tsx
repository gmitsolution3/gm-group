import { cn } from '@/lib/utils';

interface LogoMarkProps {
  className?: string;
  /** Whether to animate the forms (for hero/footer contexts) */
  animated?: boolean;
}

/**
 * GM Group brand mark — overlapping fluid forms.
 * SVG-based so it scales perfectly and inherits color context.
 */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn('h-8 w-8', className)}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="19" cy="20" r="14" fill="#5B5FEF" opacity="0.88" />
      <circle cx="29" cy="28" r="13" fill="#00BFA6" opacity="0.82" style={{ mixBlendMode: 'screen' }} />
      <circle cx="24" cy="16" r="8" fill="#FFD23F" opacity="0.78" style={{ mixBlendMode: 'screen' }} />
      <circle cx="31" cy="22" r="6" fill="#F43F5E" opacity="0.7" style={{ mixBlendMode: 'screen' }} />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  markClassName?: string;
  variant?: 'light' | 'dark';
}

export function Logo({ className, markClassName, variant = 'light' }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className={cn('h-7 w-7', markClassName)} />
      <span
        className={cn(
          'font-display text-lg font-extrabold tracking-tightest',
          variant === 'light' ? 'text-white' : 'text-ink'
        )}
      >
        GM<span className="font-medium text-mutedText"> Group</span>
      </span>
    </span>
  );
}
