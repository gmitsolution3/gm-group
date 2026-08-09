import { cn } from '@/lib/utils';
import { ventureAccentMap, type Venture } from '@/content/ventures';

interface VentureLogoProps {
  venture: Venture;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Abstract typographic venture mark.
 * Uses the venture's accent color with overlapping forms.
 */
export function VentureLogo({ venture, size = 'md', className }: VentureLogoProps) {
  const accent = ventureAccentMap[venture.accent];
  const sizes = {
    sm: { box: 'h-9 w-9', text: 'text-[10px]' },
    md: { box: 'h-12 w-12', text: 'text-xs' },
    lg: { box: 'h-16 w-16', text: 'text-sm' },
  };
  const s = sizes[size];

  const initials = venture.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-xl',
        s.box,
        className
      )}
      style={{ backgroundColor: `${accent.hex}15` }}
      aria-hidden="true"
    >
      <div
        className="absolute -right-1 -top-1 h-6 w-6 rounded-full opacity-60"
        style={{ backgroundColor: accent.hex, mixBlendMode: 'screen' }}
      />
      <div
        className="absolute -left-1 -bottom-1 h-5 w-5 rounded-full opacity-40"
        style={{ backgroundColor: accent.hex, mixBlendMode: 'screen' }}
      />
      <span className={cn('relative font-display font-extrabold tracking-tighter', s.text)} style={{ color: accent.hex }}>
        {initials}
      </span>
    </div>
  );
}
