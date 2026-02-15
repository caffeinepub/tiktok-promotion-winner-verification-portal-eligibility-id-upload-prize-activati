import { useState } from 'react';
import { Mail, MapPin, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { PrizeData } from '../App';

interface ReceiptMethodProps {
  prizeData: PrizeData;
  onSubmit: () => void;
}

type DeliveryMethod = 'email' | 'physical';

export default function ReceiptMethod({ prizeData, onSubmit }: ReceiptMethodProps) {
  const [method, setMethod] = useState<DeliveryMethod>('email');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (method === 'email' && !email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (method === 'physical' && !address.trim()) {
      setError('Please enter your mailing address');
      return;
    }

    // Basic email validation
    if (method === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate backend call - replace with actual backend integration
    setTimeout(() => {
      onSubmit();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-border shadow-premium-md bg-card">
        <CardHeader className="text-center space-y-3 pb-4">
          <CardTitle className="text-xl md:text-2xl lg:text-3xl font-display font-bold tracking-tight">
            Prize Delivery Method
          </CardTitle>
          <CardDescription className="text-sm md:text-base text-muted-foreground">
            Choose how you'd like to receive your prize
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <Label className="text-sm md:text-base font-semibold">Delivery Method</Label>
              <RadioGroup value={method} onValueChange={(value) => setMethod(value as DeliveryMethod)}>
                <div className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-muted/30 hover:border-primary/40 transition-all cursor-pointer">
                  <RadioGroupItem value="email" id="email" className="mt-0.5" />
                  <div className="flex-1">
                    <Label htmlFor="email" className="cursor-pointer flex items-center gap-2 font-semibold text-sm md:text-base">
                      <Mail className="h-4 w-4 text-primary" />
                      Email Delivery
                    </Label>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">
                      Receive your prize details via email (fastest option)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-muted/30 hover:border-primary/40 transition-all cursor-pointer">
                  <RadioGroupItem value="physical" id="physical" className="mt-0.5" />
                  <div className="flex-1">
                    <Label htmlFor="physical" className="cursor-pointer flex items-center gap-2 font-semibold text-sm md:text-base">
                      <MapPin className="h-4 w-4 text-primary" />
                      Physical Mail
                    </Label>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">
                      Receive your prize via postal mail (may take 7-14 business days)
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {method === 'email' && (
              <div className="space-y-2">
                <Label htmlFor="emailInput" className="text-sm md:text-base font-semibold">
                  Email Address
                </Label>
                <Input
                  id="emailInput"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 md:h-12 text-sm md:text-base bg-background border-input focus:border-primary focus:ring-primary/30"
                  disabled={isSubmitting}
                />
              </div>
            )}

            {method === 'physical' && (
              <div className="space-y-2">
                <Label htmlFor="addressInput" className="text-sm md:text-base font-semibold">
                  Mailing Address
                </Label>
                <Textarea
                  id="addressInput"
                  placeholder="Enter your complete mailing address including street, city, state/province, postal code, and country"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="min-h-[120px] text-sm md:text-base bg-background border-input focus:border-primary focus:ring-primary/30"
                  disabled={isSubmitting}
                />
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="border-destructive/50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit"
              className="w-full h-11 md:h-12 text-sm md:text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-premium-sm hover:shadow-premium-md transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Confirm Delivery Method'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
