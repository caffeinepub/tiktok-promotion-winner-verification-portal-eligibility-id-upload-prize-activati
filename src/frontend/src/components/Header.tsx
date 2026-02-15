import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/generated/logo.dim_512x512.png" 
            alt="Logo" 
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
          />
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
              Winner Verification Portal
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
