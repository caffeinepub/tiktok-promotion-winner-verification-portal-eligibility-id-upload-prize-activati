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
      <Card className="border-primary/20 shadow-glow-md bg-card/95 backdrop-blur">
        <CardHeader className="text-center space-y-4 pb-4">
          <div className="flex justify-center">
            {isIneligible ? (
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-destructive/20 flex items-center justify-center">
                <XCircle className="h-10 w-10 md:h-12 md:w-12 text-destructive" />
              </div>
            ) : isClaimed ? (
              <div className="relative">
                <img 
                  src="/assets/generated/celebration-bg-tiktok.dim_1200x800.png" 
                  alt="Celebration" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-full"
                />
                <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
                  <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-primary" />
                </div>
              </div>
            ) : (
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-secondary/20 flex items-center justify-center">
                <Clock className="h-10 w-10 md:h-12 md:w-12 text-secondary" />
              </div>
            )}
          </div>
          
          <CardTitle className="text-xl md:text-2xl lg:text-3xl font-display font-bold tracking-tight">
            {isIneligible ? 'Ineligible for Prize' : isClaimed ? 'Prize Claimed!' : 'Under Review'}
          </CardTitle>
          
          <CardDescription className="text-sm md:text-base text-muted-foreground">
            {isIneligible 
              ? 'Unfortunately, you do not meet the eligibility requirements'
              : isClaimed 
              ? 'Your prize claim has been successfully processed'
              : 'Your submission is being reviewed by our team'
            }
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
            <p className="text-xs md:text-sm mt-1">
              <span className="font-semibold">Status:</span>{' '}
              <span className={
                isIneligible ? 'text-destructive' : 
                isClaimed ? 'text-primary' : 
                'text-secondary'
              }>
                {isIneligible ? 'Ineligible' : isClaimed ? 'Claimed' : 'Pending Review'}
              </span>
            </p>
          </div>

          {isIneligible && (
            <Alert variant="destructive" className="border-destructive/50">
              <XCircle className="h-4 w-4" />
              <AlertDescription className="text-xs md:text-sm">
                You did not meet all eligibility requirements. If you believe this is an error, please contact support.
              </AlertDescription>
            </Alert>
          )}

          {isClaimed && (
            <>
              <Alert className="border-primary/40 bg-primary/5">
                <CheckCircle className="h-4 w-4 text-primary" />
                <AlertDescription className="text-xs md:text-sm">
                  Congratulations! Your prize will be delivered according to your selected method.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-sm md:text-base">What's Next?</h3>
                <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>You will receive a confirmation email shortly</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Physical prizes will be shipped within 3-7 business days</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Digital prizes will be sent to your email immediately</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Track your delivery status via the confirmation email</span>
                  </li>
                </ul>
              </div>
            </>
          )}

          {!isIneligible && !isClaimed && (
            <>
              <Alert className="border-secondary/40 bg-secondary/5">
                <Clock className="h-4 w-4 text-secondary" />
                <AlertDescription className="text-xs md:text-sm">
                  Your documents are being reviewed. This typically takes 3-5 business days.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-sm md:text-base">Review Timeline</h3>
                <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-secondary">•</span>
                    <span>Identity verification: 1-2 business days</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">•</span>
                    <span>Eligibility confirmation: 1-2 business days</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">•</span>
                    <span>Final approval: 1 business day</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">•</span>
                    <span>You'll receive email updates at each stage</span>
                  </li>
                </ul>
              </div>
            </>
          )}

          <Button 
            onClick={onReset}
            variant="outline"
            className="w-full h-11 md:h-12 text-sm md:text-base font-semibold border-primary/30 hover:bg-primary/10 hover:border-primary"
          >
            <Home className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
