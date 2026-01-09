import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ExternalLinkProps {
  href: string;
  label: string;
  variant?: 'foreground' | 'primary' | 'secondary' | 'button';
  className?: string;
}

export default function ExternalLink({ href, label, variant = 'foreground', className }: ExternalLinkProps) {
  const variants = {
    // The small pill styles (from previous request)
    foreground: "bg-charcoal text-white hover:bg-charcoal/90 border-transparent px-4 py-2 rounded-full text-sm",
    primary: "text-blue-500 hover:text-blue-600 bg-transparent border-transparent px-4 py-2 rounded-full text-sm",
    secondary: "text-purple-500 hover:text-purple-600 bg-transparent border-transparent px-4 py-2 rounded-full text-sm",
    // The NEW "Book An Appointment" Button Style - Outlined & Smaller
    button: "bg-transparent hover:scale-105 hover:shadow-lg rounded-lg px-4 md:px-6 py-2 md:py-3 font-medium text-xs md:text-sm border-2 transition-all duration-200 ease-in-out"
  };

  return (
    <Link 
      href={href}
      className={cn(
        "inline-flex items-center gap-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500",
        variants[variant],
        className
      )}
      style={variant === 'button' ? { borderColor: '#F50057', color: '#F50057' } : undefined}
    >
      {label}
      <ExternalLinkIcon className={cn("w-3 h-3", variant === 'button' ? "md:w-4 md:h-4" : "w-4 h-4")} />
    </Link>
  );
}