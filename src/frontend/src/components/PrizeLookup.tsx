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
      <div className="mb-8 md:mb-12">
        <img 
          src="/assets/generated/hero-cover.dim_1600x600.png" 
          alt="Winner Verification" 
          className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg"
        />
      </div>

      <Card className="shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <img 
              src="/assets/generated/trophy-icon-transparent.dim_200x200.png" 
              alt="Trophy" 
              className="h-16 w-16 md:h-20 md:w-20"
            />
          </div>
          <CardTitle className="text-2xl md:text-3xl">Verify Your Winning</CardTitle>
          <CardDescription className="text-base">
            Enter your prize number to begin the verification process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="prizeNumber" className="text-base font-medium">
                Prize Number
              </Label>
              <Input
                id="prizeNumber"
                type="text"
                placeholder="Enter your prize number (e.g., WIN-2026-12345)"
                value={prizeNumber}
                onChange={(e) => setPrizeNumber(e.target.value)}
                className="h-12 text-base"
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground">
                Your prize number can be found in your winning notification
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>Verifying...</>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Verify Prize Number
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2 text-sm">What happens next?</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>• Activate your prize number</li>
              <li>• Complete eligibility verification</li>
              <li>• Submit identity documents</li>
              <li>• Choose your prize delivery method</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
