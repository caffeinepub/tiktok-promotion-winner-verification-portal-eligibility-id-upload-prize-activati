import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { PrizeData } from '../App';

interface CompletionScreenProps {
  prizeData: PrizeData;
  status: 'claimed' | 'under-review' | 'ineligible';
  onReset: () => void;
}

export default function CompletionScreen({ prizeData, status, onReset }: CompletionScreenProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'claimed':
        return {
          icon: CheckCircle,
          title: 'Prize Claimed Successfully!',
          description: 'Your prize has been processed and will be delivered soon',
          alertVariant: 'default' as const,
          iconColor: 'text-primary',
          bgImage: '/assets/generated/celebration-bg-prize.dim_1200x800.png'
        };
      case 'under-review':
        return {
          icon: Clock,
          title: 'Under Review',
          description: 'Your submission is being reviewed by our team',
          alertVariant: 'default' as const,
          iconColor: 'text-accent',
          bgImage: null
        };
      case 'ineligible':
        return {
          icon: XCircle,
          title: 'Ineligible',
          description: 'Unfortunately, you do not meet the eligibility requirements',
          alertVariant: 'destructive' as const,
          iconColor: 'text-destructive',
          bgImage: null
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-border shadow-premium-md bg-card overflow-hidden">
        {config.bgImage && (
          <div className="relative h-32 md:h-40 overflow-hidden">
            <img 
              src={config.bgImage} 
              alt="Celebration" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
          </div>
        )}
        
        <CardHeader className="text-center space-y-3 pb-4">
          <div className="flex justify-center mb-1">
            <div className={status === 'claimed' ? 'animate-subtle-pulse' : ''}>
              <StatusIcon className={`h-14 w-14 md:h-16 md:w-16 ${config.iconColor}`} />
            </div>
          </div>
          <CardTitle className="text-xl md:text-2xl lg:text-3xl font-display font-bold tracking-tight">
            {config.title}
          </CardTitle>
          <CardDescription className="text-sm md:text-base text-muted-foreground">
            {config.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-5">
          <div className="p-3 md:p-4 bg-muted/50 border border-border rounded-lg">
            <p className="text-xs md:text-sm">
              <span className="font-semibold">Prize Number:</span> {prizeData.prizeNumber}
            </p>
            <p className="text-xs md:text-sm mt-1">
              <span className="font-semibold">Prize:</span> {prizeData.description}
            </p>
          </div>

          {status === 'claimed' && (
            <Alert className="border-primary/40 bg-primary/5">
              <CheckCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm">
                You will receive a confirmation email with tracking details within 24 hours.
              </AlertDescription>
            </Alert>
          )}

          {status === 'under-review' && (
            <Alert className="border-accent/40 bg-accent/5">
              <Clock className="h-4 w-4 text-accent" />
              <AlertDescription className="text-sm">
                We'll notify you via email once the review is complete. This typically takes 3-5 business days.
              </AlertDescription>
            </Alert>
          )}

          {status === 'ineligible' && (
            <Alert variant="destructive" className="border-destructive/50">
              <XCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                If you believe this is an error, please contact our support team with your prize number.
              </AlertDescription>
            </Alert>
          )}

          <div className="pt-2">
            <Button 
              onClick={onReset}
              variant="outline"
              className="w-full h-11 md:h-12 text-sm md:text-base font-semibold border-border hover:bg-muted/50"
            >
              Verify Another Prize
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
