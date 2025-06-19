import React, { useState } from 'react';
import ProfileSelector from './components/ProfileSelector';
import HouseholdProfile from './components/HouseholdProfile';
import SocialWorkerProfile from './components/SocialWorkerProfile';
import AssociationProfile from './components/AssociationProfile';
import BeneficiaryProfile from './components/BeneficiaryProfile';

type ProfileType = 'household' | 'social_worker' | 'association' | 'beneficiary' | null;

function App() {
  const [selectedProfile, setSelectedProfile] = useState<ProfileType>(null);

  const handleSelectProfile = (profile: ProfileType) => {
    setSelectedProfile(profile);
  };

  const handleBackToSelector = () => {
    setSelectedProfile(null);
  };

  const renderProfile = () => {
    switch (selectedProfile) {
      case 'household':
        return <HouseholdProfile onBack={handleBackToSelector} />;
      case 'social_worker':
        return <SocialWorkerProfile onBack={handleBackToSelector} />;
      case 'association':
        return <AssociationProfile onBack={handleBackToSelector} />;
      case 'beneficiary':
        return <BeneficiaryProfile onBack={handleBackToSelector} />;
      default:
        return <ProfileSelector onSelectProfile={handleSelectProfile} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderProfile()}
    </div>
  );
}

export default App;