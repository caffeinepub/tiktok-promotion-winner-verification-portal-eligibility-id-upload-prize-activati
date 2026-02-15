import { useState, useRef } from 'react';
import { Upload, Camera, CreditCard, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import type { PrizeData } from '../App';

interface IdentityVerificationProps {
  prizeData: PrizeData;
  onSubmit: () => void;
}

export default function IdentityVerification({ prizeData, onSubmit }: IdentityVerificationProps) {
  const [facePhoto, setFacePhoto] = useState<File | null>(null);
  const [idCard, setIdCard] = useState<File | null>(null);
  const [facePhotoPreview, setFacePhotoPreview] = useState<string>('');
  const [idCardPreview, setIdCardPreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const facePhotoInputRef = useRef<HTMLInputElement>(null);
  const idCardInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'face' | 'id'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'face') {
        setFacePhoto(file);
        setFacePhotoPreview(reader.result as string);
      } else {
        setIdCard(file);
        setIdCardPreview(reader.result as string);
      }
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (type: 'face' | 'id') => {
    if (type === 'face') {
      setFacePhoto(null);
      setFacePhotoPreview('');
      if (facePhotoInputRef.current) facePhotoInputRef.current.value = '';
    } else {
      setIdCard(null);
      setIdCardPreview('');
      if (idCardInputRef.current) idCardInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!facePhoto && !idCard) {
      setError('Please upload at least one document (face photo or ID card)');
      return;
    }

    setError('');
    setIsSubmitting(true);

    // Simulate backend call - replace with actual backend integration
    setTimeout(() => {
      onSubmit();
      setIsSubmitting(false);
    }, 2000);
  };

  const canSubmit = (facePhoto || idCard) && !isSubmitting;

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-primary/20 shadow-glow-md bg-card/95 backdrop-blur">
        <CardHeader className="text-center space-y-3 pb-4">
          <div className="flex justify-center mb-1">
            <img 
              src="/assets/generated/face-verify-icon-neon.dim_150x150.png" 
              alt="Identity Verification" 
              className="h-14 w-14 md:h-16 md:w-16"
            />
          </div>
          <CardTitle className="text-xl md:text-2xl lg:text-3xl font-display font-bold tracking-tight">
            Identity Verification
          </CardTitle>
          <CardDescription className="text-sm md:text-base text-muted-foreground">
            Upload your documents to verify your identity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="p-3 md:p-4 bg-muted/30 border border-primary/10 rounded-lg">
            <p className="text-xs md:text-sm">
              <span className="font-semibold">Prize Number:</span> {prizeData.prizeNumber}
            </p>
          </div>

          <Alert className="border-primary/40 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertDescription className="text-xs md:text-sm">
              Please upload at least one form of identification. Both documents are recommended for faster processing.
            </AlertDescription>
          </Alert>

          {/* Face Photo Upload */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              <Label className="text-sm md:text-base font-semibold">Face Photo</Label>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Upload a clear photo of your face. Ensure good lighting and that your face is clearly visible.
            </p>
            
            {facePhotoPreview ? (
              <div className="relative">
                <img 
                  src={facePhotoPreview} 
                  alt="Face preview" 
                  className="w-full h-48 md:h-64 object-cover rounded-lg border-2 border-primary/30"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => removeFile('face')}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-2 left-2 bg-background/90 px-2 py-1 rounded-full text-xs font-medium">
                  {facePhoto?.name}
                </div>
              </div>
            ) : (
              <div
                onClick={() => facePhotoInputRef.current?.click()}
                className="border-2 border-dashed border-primary/30 rounded-lg p-6 md:p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Upload className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-2 text-primary/70" />
                <p className="text-xs md:text-sm font-medium mb-1">Click to upload face photo</p>
                <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
              </div>
            )}
            <input
              ref={facePhotoInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'face')}
              className="hidden"
            />
          </div>

          {/* ID Card Upload */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              <Label className="text-sm md:text-base font-semibold">ID Card / Government ID</Label>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Upload a photo of your government-issued ID (passport, driver's license, national ID card).
            </p>
            
            {idCardPreview ? (
              <div className="relative">
                <img 
                  src={idCardPreview} 
                  alt="ID card preview" 
                  className="w-full h-48 md:h-64 object-cover rounded-lg border-2 border-primary/30"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => removeFile('id')}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-2 left-2 bg-background/90 px-2 py-1 rounded-full text-xs font-medium">
                  {idCard?.name}
                </div>
              </div>
            ) : (
              <div
                onClick={() => idCardInputRef.current?.click()}
                className="border-2 border-dashed border-primary/30 rounded-lg p-6 md:p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Upload className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-2 text-primary/70" />
                <p className="text-xs md:text-sm font-medium mb-1">Click to upload ID card</p>
                <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
              </div>
            )}
            <input
              ref={idCardInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'id')}
              className="hidden"
            />
          </div>

          {error && (
            <Alert variant="destructive" className="border-destructive/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          {canSubmit && (
            <Alert className="border-primary/40 bg-primary/5">
              <CheckCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-xs md:text-sm">
                Documents ready for submission. Your identity will be reviewed within 3-5 business days.
              </AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleSubmit}
            className="w-full h-11 md:h-12 text-sm md:text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-sm hover:shadow-glow-md transition-all"
            disabled={!canSubmit}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Identity Documents'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
