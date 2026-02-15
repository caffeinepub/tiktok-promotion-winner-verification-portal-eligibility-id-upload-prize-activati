import { useState } from 'react';
import { Package, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { PrizeData } from '../App';

interface ReceiptMethodProps {
  prizeData: PrizeData;
  onSubmit: () => void;
}

type DeliveryMethod = 'physical' | 'digital';

export default function ReceiptMethod({ prizeData, onSubmit }: ReceiptMethodProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('physical');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!fullName.trim()) return 'Full name is required';
    if (!email.trim()) return 'Email is required';
    if (!phone.trim()) return 'Phone number is required';
    
    if (deliveryMethod === 'physical') {
      if (!address.trim()) return 'Address is required';
      if (!city.trim()) return 'City is required';
      if (!postalCode.trim()) return 'Postal code is required';
      if (!country.trim()) return 'Country is required';
    }
    
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setIsSubmitting(true);

    // Simulate backend call - replace with actual backend integration
    setTimeout(() => {
      onSubmit();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-primary/20 shadow-glow-md bg-card/95 backdrop-blur">
        <CardHeader className="text-center space-y-3 pb-4">
          <CardTitle className="text-xl md:text-2xl lg:text-3xl font-display font-bold tracking-tight">
            Prize Delivery Method
          </CardTitle>
          <CardDescription className="text-sm md:text-base text-muted-foreground">
            Choose how you'd like to receive your prize
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

          <Alert className="border-primary/40 bg-primary/5">
            <CheckCircle className="h-4 w-4 text-primary" />
            <AlertDescription className="text-xs md:text-sm">
              Your identity documents have been submitted for review. Please provide your delivery details.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Label className="text-sm md:text-base font-semibold">Delivery Method</Label>
            <RadioGroup value={deliveryMethod} onValueChange={(value) => setDeliveryMethod(value as DeliveryMethod)}>
              <div className="flex items-start gap-3 p-3 md:p-4 rounded-lg border border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all cursor-pointer">
                <RadioGroupItem value="physical" id="physical" className="mt-1 border-primary/50 text-primary" />
                <Label htmlFor="physical" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    <span className="font-semibold text-sm md:text-base">Physical Delivery</span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Prize will be shipped to your address (3-7 business days)
                  </p>
                </Label>
              </div>
              
              <div className="flex items-start gap-3 p-3 md:p-4 rounded-lg border border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all cursor-pointer">
                <RadioGroupItem value="digital" id="digital" className="mt-1 border-primary/50 text-primary" />
                <Label htmlFor="digital" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    <span className="font-semibold text-sm md:text-base">Digital Delivery</span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Prize code/voucher will be sent via email (instant)
                  </p>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-base md:text-lg">Contact Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-xs md:text-sm">Full Name *</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="h-10 md:h-11 text-sm bg-background/50 border-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs md:text-sm">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="h-10 md:h-11 text-sm bg-background/50 border-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs md:text-sm">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="h-10 md:h-11 text-sm bg-background/50 border-primary/30 focus:border-primary"
              />
            </div>
          </div>

          {deliveryMethod === 'physical' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-base md:text-lg">Shipping Address</h3>
              
              <div className="space-y-2">
                <Label htmlFor="address" className="text-xs md:text-sm">Street Address *</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your street address"
                  rows={2}
                  className="text-sm bg-background/50 border-primary/30 focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-xs md:text-sm">City *</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="h-10 md:h-11 text-sm bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode" className="text-xs md:text-sm">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="12345"
                    className="h-10 md:h-11 text-sm bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-xs md:text-sm">Country *</Label>
                <Input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                  className="h-10 md:h-11 text-sm bg-background/50 border-primary/30 focus:border-primary"
                />
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="border-destructive/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleSubmit}
            className="w-full h-11 md:h-12 text-sm md:text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-sm hover:shadow-glow-md transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Delivery Details'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
