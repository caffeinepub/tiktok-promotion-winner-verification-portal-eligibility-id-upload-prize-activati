import { Award } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-3 py-3 md:py-4">
        <div className="flex items-center gap-2 md:gap-3">
          <img 
            src="/assets/generated/logo-prize-portal.dim_512x512.png" 
            alt="Prize Portal Logo" 
            className="h-8 w-8 md:h-10 md:w-10 object-contain"
          />
          <div className="flex items-center gap-1.5 md:gap-2">
            <Award className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            <h1 className="text-base md:text-lg lg:text-xl font-bold text-foreground tracking-tight">
              Prize Portal
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
