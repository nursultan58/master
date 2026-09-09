import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Master,
  ServiceCategory,
  City,
  MasterReview,
  UserRole,
  Language,
  TariffPlan,
  ServiceItem
} from '../types';
import { initialCategories, initialCities, initialMasters, initialReviews } from '../data/initialData';
import { translations } from '../data/translations';

interface FilterState {
  cityId: string;
  district: string;
  categoryId: string;
  query: string;
  sortBy: 'rating' | 'reviews' | 'priceAsc' | 'priceDesc';
  isProOnly: boolean;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.ru;
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentMasterId: string;
  setCurrentMasterId: (id: string) => void;
  currentMaster: Master | undefined;

  // Master modal/page
  viewingMasterId: string | null;
  setViewingMasterId: (id: string | null) => void;

  // Data
  categories: ServiceCategory[];
  cities: City[];
  masters: Master[];
  reviews: MasterReview[];

  // Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredMasters: Master[];

  // Master Actions
  registerMaster: (data: Omit<Master, 'id' | 'rating' | 'reviewsCount' | 'status' | 'tariff' | 'isRecommended' | 'createdAt'>) => string;
  updateMaster: (id: string, data: Partial<Master>) => void;
  addMasterService: (masterId: string, service: Omit<ServiceItem, 'id'>) => void;
  removeMasterService: (masterId: string, serviceId: string) => void;
  addMasterPhoto: (masterId: string, photoUrl: string) => void;
  removeMasterPhoto: (masterId: string, photoIndex: number) => void;
  changeMasterTariff: (masterId: string, tariff: TariffPlan) => void;

  // Review Actions
  addReview: (review: Omit<MasterReview, 'id' | 'date' | 'approved'>) => void;
  approveReview: (id: string) => void;
  deleteReview: (id: string) => void;

  // Admin Actions
  approveMaster: (id: string) => void;
  rejectMaster: (id: string) => void;
  toggleMasterBlock: (id: string) => void;
  toggleMasterPro: (id: string) => void;
  deleteMaster: (id: string) => void;
  addCategory: (category: Omit<ServiceCategory, 'id'>) => void;
  deleteCategory: (id: string) => void;
  addCity: (city: Omit<City, 'id'>) => void;

  // Toast / notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('mastertap_lang') as Language) || 'ru';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('mastertap_lang', lang);
  };

  const t = translations[language];

  // User Role & Active Master for Cabinet
  const [role, setRole] = useState<UserRole>('client');
  const [currentMasterId, setCurrentMasterId] = useState<string>('master-1');
  const [viewingMasterId, setViewingMasterId] = useState<string | null>(null);

  // Entities
  const [categories, setCategories] = useState<ServiceCategory[]>(() => {
    const saved = localStorage.getItem('mastertap_categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [cities, setCities] = useState<City[]>(() => {
    const saved = localStorage.getItem('mastertap_cities');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= initialCities.length) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return initialCities;
  });

  const [masters, setMasters] = useState<Master[]>(() => {
    const saved = localStorage.getItem('mastertap_masters');
    return saved ? JSON.parse(saved) : initialMasters;
  });

  const [reviews, setReviews] = useState<MasterReview[]>(() => {
    const saved = localStorage.getItem('mastertap_reviews');
    return saved ? JSON.parse(saved) : initialReviews;
  });

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('mastertap_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('mastertap_cities', JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    localStorage.setItem('mastertap_masters', JSON.stringify(masters));
  }, [masters]);

  useEffect(() => {
    localStorage.setItem('mastertap_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    cityId: 'all',
    district: 'all',
    categoryId: 'all',
    query: '',
    sortBy: 'rating',
    isProOnly: false
  });

  const resetFilters = () => {
    setFilters({
      cityId: 'all',
      district: 'all',
      categoryId: 'all',
      query: '',
      sortBy: 'rating',
      isProOnly: false
    });
  };

  // Current logged in master
  const currentMaster = masters.find((m) => m.id === currentMasterId);

  // Filtered masters calculation
  const filteredMasters = masters
    .filter((master) => {
      // In normal public client view: only approved masters are shown
      if (role !== 'admin' && master.status !== 'approved') {
        return false;
      }
      // City filter
      if (filters.cityId !== 'all' && master.cityId !== filters.cityId) {
        return false;
      }
      // District filter
      if (filters.district !== 'all' && master.district !== filters.district) {
        return false;
      }
      // Category filter
      if (filters.categoryId !== 'all' && master.categoryId !== filters.categoryId) {
        return false;
      }
      // Pro only filter
      if (filters.isProOnly && master.tariff === 'free') {
        return false;
      }
      // Text query
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase().trim();
        const cat = categories.find((c) => c.id === master.categoryId);
        const matchName = master.name.toLowerCase().includes(q);
        const matchBio = master.bio.toLowerCase().includes(q);
        const matchServices = master.services.some((s) => s.title.toLowerCase().includes(q));
        const matchCategory = cat && (cat.nameRu.toLowerCase().includes(q) || cat.nameKy.toLowerCase().includes(q));
        if (!matchName && !matchBio && !matchServices && !matchCategory) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      // Pro/Premium masters get boosted to the top (Section 11 requirement)
      const aWeight = a.tariff === 'premium' ? 2 : a.tariff === 'pro' ? 1 : 0;
      const bWeight = b.tariff === 'premium' ? 2 : b.tariff === 'pro' ? 1 : 0;
      if (aWeight !== bWeight) {
        return bWeight - aWeight;
      }

      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'reviews') {
        return b.reviewsCount - a.reviewsCount;
      }
      if (filters.sortBy === 'priceAsc') {
        return a.minPrice - b.minPrice;
      }
      if (filters.sortBy === 'priceDesc') {
        return b.minPrice - a.minPrice;
      }
      return 0;
    });

  // Master Actions
  const registerMaster = (data: Omit<Master, 'id' | 'rating' | 'reviewsCount' | 'status' | 'tariff' | 'isRecommended' | 'createdAt'>) => {
    const newId = 'master-' + Date.now();
    const newMaster: Master = {
      ...data,
      id: newId,
      rating: 5.0,
      reviewsCount: 0,
      status: 'pending', // Awaiting admin confirmation
      tariff: 'free',
      isRecommended: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setMasters((prev) => [newMaster, ...prev]);
    setCurrentMasterId(newId);
    showToast(t.regSuccessTitle);
    return newId;
  };

  const updateMaster = (id: string, data: Partial<Master>) => {
    setMasters((prev) => prev.map((m) => (m.id === id ? { ...m, ...data } : m)));
    showToast('Данные профиля обновлены');
  };

  const addMasterService = (masterId: string, service: Omit<ServiceItem, 'id'>) => {
    const newItem: ServiceItem = {
      ...service,
      id: 'srv-' + Date.now()
    };
    setMasters((prev) =>
      prev.map((m) =>
        m.id === masterId
          ? {
              ...m,
              services: [...m.services, newItem],
              minPrice: Math.min(m.minPrice, service.price)
            }
          : m
      )
    );
    showToast('Услуга успешно добавлена');
  };

  const removeMasterService = (masterId: string, serviceId: string) => {
    setMasters((prev) =>
      prev.map((m) =>
        m.id === masterId
          ? {
              ...m,
              services: m.services.filter((s) => s.id !== serviceId)
            }
          : m
      )
    );
    showToast('Услуга удалена');
  };

  const addMasterPhoto = (masterId: string, photoUrl: string) => {
    setMasters((prev) =>
      prev.map((m) =>
        m.id === masterId
          ? {
              ...m,
              workPhotos: [...m.workPhotos, photoUrl]
            }
          : m
      )
    );
    showToast('Фотография добавлена в портфолио');
  };

  const removeMasterPhoto = (masterId: string, photoIndex: number) => {
    setMasters((prev) =>
      prev.map((m) =>
        m.id === masterId
          ? {
              ...m,
              workPhotos: m.workPhotos.filter((_, idx) => idx !== photoIndex)
            }
          : m
      )
    );
    showToast('Фотография удалена');
  };

  const changeMasterTariff = (masterId: string, tariff: TariffPlan) => {
    setMasters((prev) =>
      prev.map((m) =>
        m.id === masterId
          ? {
              ...m,
              tariff,
              isRecommended: tariff !== 'free'
            }
          : m
      )
    );
    showToast(`Тариф успешно изменен на ${tariff.toUpperCase()}`);
  };

  // Review Actions
  const addReview = (reviewData: Omit<MasterReview, 'id' | 'date' | 'approved'>) => {
    const newRev: MasterReview = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      approved: true
    };
    setReviews((prev) => [newRev, ...prev]);

    // Recalculate master's rating
    setMasters((prev) =>
      prev.map((m) => {
        if (m.id === reviewData.masterId) {
          const mReviews = reviews.filter((r) => r.masterId === m.id).concat(newRev);
          const avg = mReviews.reduce((sum, r) => sum + r.rating, 0) / mReviews.length;
          return {
            ...m,
            rating: Number(avg.toFixed(1)),
            reviewsCount: mReviews.length
          };
        }
        return m;
      })
    );
    showToast(t.reviewSuccess);
  };

  const approveReview = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved: true } : r)));
    showToast('Отзыв одобрен');
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Отзыв удален');
  };

  // Admin Actions
  const approveMaster = (id: string) => {
    setMasters((prev) => prev.map((m) => (m.id === id ? { ...m, status: 'approved' } : m)));
    showToast('Мастер успешно подтвержден и опубликован');
  };

  const rejectMaster = (id: string) => {
    setMasters((prev) => prev.map((m) => (m.id === id ? { ...m, status: 'rejected' } : m)));
    showToast('Заявка мастера отклонена');
  };

  const toggleMasterBlock = (id: string) => {
    setMasters((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status: m.status === 'blocked' ? 'approved' : 'blocked'
            }
          : m
      )
    );
    showToast('Статус блокировки мастера изменен');
  };

  const toggleMasterPro = (id: string) => {
    setMasters((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              tariff: m.tariff === 'free' ? 'pro' : 'free',
              isRecommended: m.tariff === 'free'
            }
          : m
      )
    );
    showToast('PRO статус обновлен');
  };

  const deleteMaster = (id: string) => {
    setMasters((prev) => prev.filter((m) => m.id !== id));
    showToast('Мастер удален из базы');
  };

  const addCategory = (cat: Omit<ServiceCategory, 'id'>) => {
    const newCat: ServiceCategory = {
      ...cat,
      id: 'cat-' + Date.now()
    };
    setCategories((prev) => [...prev, newCat]);
    showToast('Категория успешно добавлена');
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Категория удалена');
  };

  const addCity = (city: Omit<City, 'id'>) => {
    const newCity: City = {
      ...city,
      id: 'city-' + Date.now()
    };
    setCities((prev) => [...prev, newCity]);
    showToast('Город добавлен');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        role,
        setRole,
        currentMasterId,
        setCurrentMasterId,
        currentMaster,
        viewingMasterId,
        setViewingMasterId,
        categories,
        cities,
        masters,
        reviews,
        filters,
        setFilters,
        resetFilters,
        filteredMasters,
        registerMaster,
        updateMaster,
        addMasterService,
        removeMasterService,
        addMasterPhoto,
        removeMasterPhoto,
        changeMasterTariff,
        addReview,
        approveReview,
        deleteReview,
        approveMaster,
        rejectMaster,
        toggleMasterBlock,
        toggleMasterPro,
        deleteMaster,
        addCategory,
        deleteCategory,
        addCity,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
