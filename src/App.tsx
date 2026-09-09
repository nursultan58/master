import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PopularCategories } from './components/PopularCategories';
import { MasterListSection } from './components/MasterListSection';
import { BenefitsSection } from './components/BenefitsSection';
import { ClientReviewsSection } from './components/ClientReviewsSection';
import { Footer } from './components/Footer';
import { MasterDetailModal } from './components/MasterDetailModal';
import { MasterRegistrationModal } from './components/MasterRegistrationModal';
import { MasterCabinet } from './components/MasterCabinet';
import { AdminPanel } from './components/AdminPanel';
import { Master } from './types';
import { CheckCircle2, AlertCircle } from 'lucide-react';

function MainApp() {
  const {
    masters,
    viewingMasterId,
    setViewingMasterId,
    setCurrentMasterId,
    toastMessage,
    setFilters
  } = useApp();

  const [activeView, setActiveView] = useState<'home' | 'catalog' | 'cabinet' | 'admin'>('home');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Selected master for detail modal
  const selectedMaster = masters.find((m) => m.id === viewingMasterId);

  const handleSearchFromHero = () => {
    setActiveView('catalog');
    const catalogEl = document.getElementById('masters-list-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (catId: string) => {
    setFilters((prev) => ({
      ...prev,
      categoryId: catId
    }));
    setActiveView('catalog');
    const catalogEl = document.getElementById('masters-list-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMasterRegistered = (newMasterId: string) => {
    setIsRegisterOpen(false);
    setCurrentMasterId(newMasterId);
    setActiveView('cabinet');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Navigation & Role Switcher */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        openRegisterModal={() => setIsRegisterOpen(true)}
      />

      {/* Main Content Router based on activeView */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            {/* 1. Hero Section with 4-way search */}
            <HeroSection onSearch={handleSearchFromHero} />

            {/* 2. Popular Categories Grid (12 items) */}
            <PopularCategories onSelectCategory={handleSelectCategory} />

            {/* 3. Popular Masters Section */}
            <MasterListSection
              onViewDetails={(m) => setViewingMasterId(m.id)}
              isCatalogView={false}
            />

            {/* 4. Benefits Section */}
            <BenefitsSection />

            {/* 5. Client Reviews Section */}
            <ClientReviewsSection />
          </>
        )}

        {activeView === 'catalog' && (
          <MasterListSection
            onViewDetails={(m) => setViewingMasterId(m.id)}
            isCatalogView={true}
          />
        )}

        {activeView === 'cabinet' && <MasterCabinet />}

        {activeView === 'admin' && <AdminPanel />}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        openRegisterModal={() => setIsRegisterOpen(true)}
      />

      {/* Master Detail Modal (Section 4) */}
      {selectedMaster && (
        <MasterDetailModal
          master={selectedMaster}
          onClose={() => setViewingMasterId(null)}
        />
      )}

      {/* Master Registration Modal (Section 5) */}
      {isRegisterOpen && (
        <MasterRegistrationModal
          onClose={() => setIsRegisterOpen(false)}
          onSuccess={handleMasterRegistered}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
