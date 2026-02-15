import { CheckCircle, XCircle, Clock, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { PrizeData } from '../App';

interface CompletionScreenProps {
  prizeData: PrizeData;
  onReset: () => void;
}

export default function CompletionScreen({ prizeData, onReset }: CompletionScreenProps) {
  const isIneligible = prizeData.status === 'ineligible';
  const isClaimed = prizeData.status === 'claimed';

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            {isIneligible ? (
              <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
                <XCircle className="h-12 w-12 text-destructive" />
              </div>
            ) : isClaimed ? (
              <img 
                src="/assets/generated/celebration-bg.dim_1200x800.png" 
                alt="Celebration" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-12 w-12 text-primary" />
              </div>
            )}
          </div>
          
          <CardTitle className="text-2xl md:text-3xl">
            {isIneligible ? 'Ineligible for Prize' : isClaimed ? 'Congratulations!' : 'Under Review'}
          </CardTitle>
          
          <CardDescription className="text-base">
            {isIneligible 
              ? 'Unfortunately, you do not meet the eligibility requirements'
              : isClaimed 
              ? 'Your prize claim has been successfully processed'
              : 'Your submission is being reviewed'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm">
              <span className="font-semibold">Prize Number:</span> {prizeData.prizeNumber}
            </p>
            <p className="text-sm mt-1">
              <span className="font-semibold">Prize:</span> {prizeData.description}
            </p>
            <p className="text-sm mt-1">
              <span className="font-semibold">Status:</span>{' '}
              <span className={isIneligible ? 'text-destructive font-semibold' : isClaimed ? 'text-green-600 font-semibold' : 'text-primary font-semibold'}>
                {isIneligible ? 'Ineligible' : isClaimed ? 'Claimed' : 'Pending Review'}
              </span>
            </p>
          </div>

          {isIneligible ? (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                Based on your responses, you do not meet the eligibility requirements for this prize. 
                If you believe this is an error, please contact support.
              </AlertDescription>
            </Alert>
          ) : isClaimed ? (
            <>
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Your prize claim has been approved and processed. You will receive your prize according to the delivery method you selected.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3">
                <h3 className="font-semibold">What's Next?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>You will receive a confirmation email shortly</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Physical prizes will be shipped within 3-7 business days</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Digital prizes will be delivered via email instantly</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Check your email for tracking information</span>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  Your identity documents are being reviewed. This process typically takes 3-5 business days. 
                  You will be notified via email once the review is complete.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3">
                <h3 className="font-semibold">Review Timeline</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Prize number activated</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Eligibility confirmed</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Identity documents submitted</span>
                  </li>
                  <li className="flex gap-2">
                    <Clock className="h-4 w-4 text-primary mt-0.5" />
                    <span>Identity verification in progress (3-5 business days)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-muted-foreground mt-0.5" />
                    <span>Prize delivery</span>
                  </li>
                </ul>
              </div>
            </>
          )}

          <Button 
            onClick={onReset}
            variant="outline"
            className="w-full h-12 text-base font-semibold"
          >
            <Home className="mr-2 h-5 w-5" />
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
