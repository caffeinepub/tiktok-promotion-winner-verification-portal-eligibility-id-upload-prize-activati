import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { PrizeData } from '../App';

interface PrizeLookupProps {
  onSuccess: (data: PrizeData) => void;
}

export default function PrizeLookup({ onSuccess }: PrizeLookupProps) {
  const [prizeNumber, setPrizeNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!prizeNumber.trim()) {
      setError('Please enter a prize number');
      return;
    }

    setIsLoading(true);
    
    // Simulate backend call - replace with actual backend integration
    setTimeout(() => {
      // Mock response - in production, call backend actor
      const mockData: PrizeData = {
        prizeNumber: prizeNumber.trim(),
        description: 'Premium Prize Package - $500 Value',
        status: 'valid'
      };
      
      onSuccess(mockData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 md:mb-8 overflow-hidden rounded-lg shadow-md">
        <img 
          src="/assets/generated/hero-cover-prize-portal.dim_1600x600.png" 
          alt="Prize Portal Hero" 
          className="w-full h-40 md:h-56 object-cover"
        />
      </div>

      <Card className="border-border shadow-premium-md bg-card">
        <CardHeader className="text-center space-y-3 pb-4">
          <div className="flex justify-center mb-1">
            <img 
              src="/assets/generated/trophy-icon-prize.dim_200x200.png" 
              alt="Prize Trophy" 
              className="h-14 w-14 md:h-16 md:w-16"
            />
          </div>
          <CardTitle className="text-xl md:text-2xl lg:text-3xl font-display font-bold tracking-tight">
            Verify Your Prize
          </CardTitle>
          <CardDescription className="text-sm md:text-base text-muted-foreground">
            Enter your prize number to begin the verification process
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="prizeNumber" className="text-sm md:text-base font-semibold">
                Prize Number
              </Label>
              <Input
                id="prizeNumber"
                type="text"
                placeholder="Enter your prize number (e.g., WIN-2026-12345)"
                value={prizeNumber}
                onChange={(e) => setPrizeNumber(e.target.value)}
                className="h-11 md:h-12 text-sm md:text-base bg-background border-input focus:border-primary focus:ring-primary/30"
                disabled={isLoading}
              />
              <p className="text-xs md:text-sm text-muted-foreground">
                Your prize number can be found in your winning notification
              </p>
            </div>

            {error && (
              <Alert variant="destructive" className="border-destructive/50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full h-11 md:h-12 text-sm md:text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-premium-sm hover:shadow-premium-md transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>Verifying...</>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Verify Prize Number
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 p-3 md:p-4 bg-muted/50 border border-border rounded-lg">
            <h3 className="font-semibold mb-2 text-xs md:text-sm">What happens next?</h3>
            <ul className="space-y-1 text-xs md:text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold">•</span> Activate your prize number
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold">•</span> Complete eligibility verification
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold">•</span> Submit identity documents
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold">•</span> Choose your prize delivery method
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
