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
      <Card className="shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <img 
              src="/assets/generated/verification-badge.dim_100x100.png" 
              alt="Verification Badge" 
              className="h-16 w-16"
            />
          </div>
          <CardTitle className="text-2xl md:text-3xl">Activate Your Prize</CardTitle>
          <CardDescription className="text-base">
            Prize Number: <span className="font-semibold text-foreground">{prizeData.prizeNumber}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Prize Details</h3>
            <p className="text-muted-foreground">{prizeData.description}</p>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Your prize number has been verified and is ready for activation. This is a one-time action.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h3 className="font-semibold">Important Information:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
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
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleActivate}
            className="w-full h-12 text-base font-semibold"
            disabled={isActivating}
          >
            {isActivating ? 'Activating...' : 'Activate Prize Number'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
