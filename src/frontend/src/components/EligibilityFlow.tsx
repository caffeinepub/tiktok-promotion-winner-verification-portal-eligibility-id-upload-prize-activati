import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { PrizeData } from '../App';

interface EligibilityFlowProps {
  prizeData: PrizeData;
  onComplete: (eligible: boolean) => void;
}

const eligibilityRequirements = [
  'I am 18 years of age or older',
  'I am a legal resident of an eligible country/region',
  'I participated in the TikTok promotion during the valid period',
  'I have not previously claimed a prize from this promotion',
  'I agree to provide valid identification documents for verification',
  'I understand that false information may result in disqualification'
];

export default function EligibilityFlow({ prizeData, onComplete }: EligibilityFlowProps) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(eligibilityRequirements.length).fill(false)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const allChecked = checkedItems.every(item => item);

  const handleCheckChange = (index: number, checked: boolean) => {
    const newChecked = [...checkedItems];
    newChecked[index] = checked;
    setCheckedItems(newChecked);
  };

  const handleSubmit = async () => {
    if (!allChecked) {
      setError('Please confirm all eligibility requirements');
      return;
    }

    setError('');
    setIsSubmitting(true);

    // Simulate backend call - replace with actual backend integration
    setTimeout(() => {
      onComplete(true);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-primary/20 shadow-glow-md bg-card/95 backdrop-blur">
        <CardHeader className="text-center space-y-3 pb-4">
          <CardTitle className="text-xl md:text-2xl lg:text-3xl font-display font-bold tracking-tight">
            Eligibility Verification
          </CardTitle>
          <CardDescription className="text-sm md:text-base text-muted-foreground">
            Please confirm you meet all requirements to claim your prize
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="p-3 md:p-4 bg-muted/30 border border-primary/10 rounded-lg">
            <p className="text-xs md:text-sm">
              <span className="font-semibold">Prize Number:</span> {prizeData.prizeNumber}
            </p>
            <p className="text-xs md:text-sm mt-1">
              <span className="font-semibold">Prize:</span> {prizeData.description}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-base md:text-lg">Eligibility Requirements</h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Please read and confirm each requirement below:
            </p>
            
            <div className="space-y-3">
              {eligibilityRequirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all">
                  <Checkbox
                    id={`requirement-${index}`}
                    checked={checkedItems[index]}
                    onCheckedChange={(checked) => handleCheckChange(index, checked as boolean)}
                    className="mt-0.5 border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label
                    htmlFor={`requirement-${index}`}
                    className="text-xs md:text-sm leading-relaxed cursor-pointer flex-1"
                  >
                    {requirement}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="border-destructive/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          {allChecked && (
            <Alert className="border-primary/40 bg-primary/5">
              <CheckCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm">
                All requirements confirmed. You may proceed to identity verification.
              </AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleSubmit}
            className="w-full h-11 md:h-12 text-sm md:text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-sm hover:shadow-glow-md transition-all"
            disabled={!allChecked || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Eligibility'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
