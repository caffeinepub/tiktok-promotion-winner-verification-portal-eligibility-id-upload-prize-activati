import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { PrizeData } from '../App';

interface ActivationFlowProps {
  prizeData: PrizeData;
  onActivate: () => void;
}

export default function ActivationFlow({ prizeData, onActivate }: ActivationFlowProps) {
  const [isActivating, setIsActivating] = useState(false);
  const [error, setError] = useState('');

  const handleActivate = async () => {
    setError('');
    setIsActivating(true);

    // Simulate backend call - replace with actual backend integration
    setTimeout(() => {
      onActivate();
      setIsActivating(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-primary/20 shadow-glow-md bg-card/95 backdrop-blur">
        <CardHeader className="text-center space-y-3 pb-4">
          <div className="flex justify-center mb-1">
            <img 
              src="/assets/generated/verification-badge-neon.dim_100x100.png" 
              alt="Verification Badge" 
              className="h-14 w-14 md:h-16 md:w-16"
            />
          </div>
          <CardTitle className="text-xl md:text-2xl lg:text-3xl font-display font-bold tracking-tight">
            Activate Your Prize
          </CardTitle>
          <CardDescription className="text-sm md:text-base text-muted-foreground">
            Prize Number: <span className="font-semibold text-primary">{prizeData.prizeNumber}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="p-4 md:p-5 bg-primary/10 border border-primary/30 rounded-lg">
            <h3 className="font-semibold text-base md:text-lg mb-2">Prize Details</h3>
            <p className="text-sm md:text-base text-muted-foreground">{prizeData.description}</p>
          </div>

          <Alert className="border-primary/40 bg-primary/5">
            <CheckCircle className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              Your prize number has been verified and is ready for activation. This is a one-time action.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm md:text-base">Important Information:</h3>
            <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Prize activation can only be done once</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>After activation, you'll need to complete eligibility verification</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Identity documents will be required for final approval</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>The entire process typically takes 3-5 business days</span>
              </li>
            </ul>
          </div>

          {error && (
            <Alert variant="destructive" className="border-destructive/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleActivate}
            className="w-full h-11 md:h-12 text-sm md:text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-sm hover:shadow-glow-md transition-all"
            disabled={isActivating}
          >
            {isActivating ? 'Activating...' : 'Activate Prize Number'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
