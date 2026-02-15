import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PrizeLookup from './components/PrizeLookup';
import ActivationFlow from './components/ActivationFlow';
import EligibilityFlow from './components/EligibilityFlow';
import IdentityVerification from './components/IdentityVerification';
import ReceiptMethod from './components/ReceiptMethod';
import CompletionScreen from './components/CompletionScreen';

export type FlowStep = 'lookup' | 'activation' | 'eligibility' | 'identity' | 'receipt' | 'complete';

export interface PrizeData {
  prizeNumber: string;
  description: string;
  status: 'not-found' | 'valid' | 'activated' | 'eligible' | 'ineligible' | 'pending-review' | 'approved' | 'claimed';
}

function App() {
  const [currentStep, setCurrentStep] = useState<FlowStep>('lookup');
  const [prizeData, setPrizeData] = useState<PrizeData | null>(null);

  const handlePrizeLookup = (data: PrizeData) => {
    setPrizeData(data);
    if (data.status === 'valid') {
      setCurrentStep('activation');
    } else if (data.status === 'activated') {
      setCurrentStep('eligibility');
    } else if (data.status === 'eligible') {
      setCurrentStep('identity');
    } else if (data.status === 'pending-review' || data.status === 'approved') {
      setCurrentStep('receipt');
    } else if (data.status === 'claimed') {
      setCurrentStep('complete');
    }
  };

  const handleActivation = () => {
    if (prizeData) {
      setPrizeData({ ...prizeData, status: 'activated' });
      setCurrentStep('eligibility');
    }
  };

  const handleEligibility = (eligible: boolean) => {
    if (prizeData) {
      setPrizeData({ ...prizeData, status: eligible ? 'eligible' : 'ineligible' });
      if (eligible) {
        setCurrentStep('identity');
      } else {
        setCurrentStep('complete');
      }
    }
  };

  const handleIdentitySubmit = () => {
    if (prizeData) {
      setPrizeData({ ...prizeData, status: 'pending-review' });
      setCurrentStep('receipt');
    }
  };

  const handleReceiptSubmit = () => {
    if (prizeData) {
      setPrizeData({ ...prizeData, status: 'claimed' });
      setCurrentStep('complete');
    }
  };

  const handleReset = () => {
    setPrizeData(null);
    setCurrentStep('lookup');
  };

  const getCompletionStatus = (): 'claimed' | 'under-review' | 'ineligible' => {
    if (!prizeData) return 'under-review';
    if (prizeData.status === 'claimed') return 'claimed';
    if (prizeData.status === 'ineligible') return 'ineligible';
    return 'under-review';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-3 py-4 md:py-6">
        {currentStep === 'lookup' && <PrizeLookup onSuccess={handlePrizeLookup} />}
        {currentStep === 'activation' && prizeData && (
          <ActivationFlow prizeData={prizeData} onActivate={handleActivation} />
        )}
        {currentStep === 'eligibility' && prizeData && (
          <EligibilityFlow prizeData={prizeData} onComplete={handleEligibility} />
        )}
        {currentStep === 'identity' && prizeData && (
          <IdentityVerification prizeData={prizeData} onSubmit={handleIdentitySubmit} />
        )}
        {currentStep === 'receipt' && prizeData && (
          <ReceiptMethod prizeData={prizeData} onSubmit={handleReceiptSubmit} />
        )}
        {currentStep === 'complete' && prizeData && (
          <CompletionScreen 
            prizeData={prizeData} 
            status={getCompletionStatus()} 
            onReset={handleReset} 
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
