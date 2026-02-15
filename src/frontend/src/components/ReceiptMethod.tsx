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
      <Card className="shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl md:text-3xl">Prize Delivery Method</CardTitle>
          <CardDescription className="text-base">
            Choose how you'd like to receive your prize
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
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Your identity documents have been submitted for review. Please provide your delivery details.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Delivery Method</Label>
            <RadioGroup value={deliveryMethod} onValueChange={(value) => setDeliveryMethod(value as DeliveryMethod)}>
              <div className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors cursor-pointer">
                <RadioGroupItem value="physical" id="physical" className="mt-1" />
                <Label htmlFor="physical" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Physical Delivery</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Prize will be shipped to your address (3-7 business days)
                  </p>
                </Label>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors cursor-pointer">
                <RadioGroupItem value="digital" id="digital" className="mt-1" />
                <Label htmlFor="digital" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Digital Delivery</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Prize code/voucher will be sent via email (instant)
                  </p>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {deliveryMethod === 'physical' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Shipping Address</h3>
              
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your street address"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="12345"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                />
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleSubmit}
            className="w-full h-12 text-base font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Delivery Details'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
