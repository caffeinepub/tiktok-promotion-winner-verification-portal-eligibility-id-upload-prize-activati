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

    setError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      const preview = reader.result as string;
      if (type === 'face') {
        setFacePhoto(file);
        setFacePhotoPreview(preview);
      } else {
        setIdCard(file);
        setIdCardPreview(preview);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (type: 'face' | 'id') => {
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
    if (!facePhoto || !idCard) {
      setError('Please upload both required documents');
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

  const canSubmit = facePhoto && idCard;

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-border shadow-premium-md bg-card">
        <CardHeader className="text-center space-y-3 pb-4">
          <div className="flex justify-center mb-1">
            <img 
              src="/assets/generated/face-verify-icon-prize.dim_150x150.png" 
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
          <div className="p-3 md:p-4 bg-muted/50 border border-border rounded-lg">
            <p className="text-xs md:text-sm">
              <span className="font-semibold">Prize Number:</span> {prizeData.prizeNumber}
            </p>
          </div>

          <Alert className="border-primary/40 bg-primary/5">
            <CheckCircle className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              Your information is secure and will only be used for prize verification purposes.
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {/* Face Photo Upload */}
            <div className="space-y-3">
              <Label className="text-sm md:text-base font-semibold flex items-center gap-2">
                <Camera className="h-4 w-4 text-primary" />
                Face Photo
              </Label>
              <div className="space-y-2">
                {!facePhotoPreview ? (
                  <div
                    onClick={() => facePhotoInputRef.current?.click()}
                    className="border-2 border-dashed border-border hover:border-primary/50 rounded-lg p-6 md:p-8 text-center cursor-pointer transition-all hover:bg-muted/30"
                  >
                    <Upload className="h-8 w-8 md:h-10 md:w-10 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Click to upload
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Clear photo of your face
                    </p>
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden border border-border">
                    <img
                      src={facePhotoPreview}
                      alt="Face preview"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => handleRemove('face')}
                      className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
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
            </div>

            {/* ID Card Upload */}
            <div className="space-y-3">
              <Label className="text-sm md:text-base font-semibold flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                ID Document
              </Label>
              <div className="space-y-2">
                {!idCardPreview ? (
                  <div
                    onClick={() => idCardInputRef.current?.click()}
                    className="border-2 border-dashed border-border hover:border-primary/50 rounded-lg p-6 md:p-8 text-center cursor-pointer transition-all hover:bg-muted/30"
                  >
                    <Upload className="h-8 w-8 md:h-10 md:w-10 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Click to upload
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Government-issued ID
                    </p>
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden border border-border">
                    <img
                      src={idCardPreview}
                      alt="ID preview"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => handleRemove('id')}
                      className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
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
            </div>
          </div>

          <div className="p-3 md:p-4 bg-muted/30 border border-border rounded-lg">
            <h3 className="font-semibold mb-2 text-xs md:text-sm">Document Requirements:</h3>
            <ul className="space-y-1 text-xs md:text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold">•</span> Clear, well-lit photos
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold">•</span> All text must be readable
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold">•</span> Valid government-issued ID (passport, driver's license, etc.)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold">•</span> Maximum file size: 5MB per image
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
            onClick={handleSubmit}
            className="w-full h-11 md:h-12 text-sm md:text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-premium-sm hover:shadow-premium-md transition-all"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Documents'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
