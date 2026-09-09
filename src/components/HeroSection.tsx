import React from 'react';
import { useApp } from '../context/AppContext';
import { City } from '../types';
import { Search, MapPin, Wrench, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onSearch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const { language, t, cities, categories, filters, setFilters } = useApp();

  // Find districts for the currently selected city
  const currentCityObj = cities.find((c) => c.id === filters.cityId);
  const availableDistricts = currentCityObj ? currentCityObj.districts : [];

  // Group cities by administrative region
  const groupedCities = React.useMemo(() => {
    const groups: Record<string, City[]> = {};
    cities.forEach((c) => {
      const region = (language === 'ru' ? c.regionRu : c.regionKy) || (language === 'ru' ? 'Другие города' : 'Башка шаарлар');
      if (!groups[region]) {
        groups[region] = [];
      }
      groups[region].push(c);
    });
    return groups;
  }, [cities, language]);

  const handleCityChange = (cityId: string) => {
    setFilters((prev) => ({
      ...prev,
      cityId,
      district: 'all' // reset district when city changes
    }));
  };

  const handleCategorySelect = (categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      categoryId
    }));
    onSearch();
  };

  return (
    <div className="relative">
      {/* Dark Bold Hero Banner */}
      <div className="bg-slate-900 text-white px-4 sm:px-10 pt-16 pb-24 relative overflow-hidden">
        {/* Subtle geometric background decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-indigo-600 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-indigo-400 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Eyebrow badge */}
          <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400 mb-4 inline-block">
            {language === 'ru' ? 'Сервис мастеров №1 в Кыргызстане' : 'Кыргызстандагы №1 усталар кызматы'}
          </span>

          {/* Main Massive Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-6 tracking-tighter uppercase">
            {language === 'ru' ? (
              <>
                Найдите надежного мастера <span className="text-indigo-400">рядом с вами</span>
              </>
            ) : (
              <>
                Ишенимдүү устаны <span className="text-indigo-400">жаныңыздан табыңыз</span>
              </>
            )}
          </h1>

          <p className="text-slate-400 text-base sm:text-lg font-medium max-w-xl mx-auto">
            {t.heroSubtitle}
          </p>
        </div>
      </div>

      {/* Floating Elevated Search Box matching Bold Typography theme */}
      <div className="max-w-5xl mx-auto -mt-10 sm:-mt-12 px-4 sm:px-6 relative z-10">
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl shadow-2xl border border-slate-200 text-slate-900 text-left">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* 1. City selector */}
            <div className="md:col-span-3 bg-slate-50 hover:bg-slate-100 p-3 rounded-xl border border-slate-200 transition-colors">
              <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-indigo-600" />
                {t.selectCity}
              </label>
              <select
                id="search-city-select"
                value={filters.cityId}
                onChange={(e) => handleCityChange(e.target.value)}
                aria-label={t.selectCity}
                className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none cursor-pointer"
              >
                <option value="all">{t.allCities}</option>
                {Object.keys(groupedCities).map((regionName) => {
                  const cityList = groupedCities[regionName] || [];
                  return (
                    <optgroup key={regionName} label={regionName}>
                      {cityList.map((c) => (
                        <option key={c.id} value={c.id}>
                          {language === 'ru' ? c.nameRu : c.nameKy}
                        </option>
                      ))}
                    </optgroup>
                  );
                })}
              </select>
            </div>

            {/* 2. District selector (conditioned by city) */}
            <div className="md:col-span-3 bg-slate-50 hover:bg-slate-100 p-3 rounded-xl border border-slate-200 transition-colors">
              <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {t.selectDistrict}
              </label>
              <select
                id="search-district-select"
                value={filters.district}
                onChange={(e) => setFilters((prev) => ({ ...prev, district: e.target.value }))}
                disabled={filters.cityId === 'all'}
                aria-label={t.selectDistrict}
                className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none cursor-pointer disabled:opacity-40"
              >
                <option value="all">{t.allDistricts}</option>
                {availableDistricts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Category selector */}
            <div className="md:col-span-3 bg-slate-50 hover:bg-slate-100 p-3 rounded-xl border border-slate-200 transition-colors">
              <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1 flex items-center gap-1">
                <Wrench className="w-3 h-3 text-indigo-600" />
                {t.selectCategory}
              </label>
              <select
                id="search-category-select"
                value={filters.categoryId}
                onChange={(e) => setFilters((prev) => ({ ...prev, categoryId: e.target.value }))}
                aria-label={t.selectCategory}
                className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none cursor-pointer"
              >
                <option value="all">{t.allCategories}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {language === 'ru' ? cat.nameRu : cat.nameKy}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Search submit button */}
            <div className="md:col-span-3 flex items-stretch">
              <button
                type="button"
                id="hero-find-master-btn"
                onClick={onSearch}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3.5 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <Search className="w-4 h-4 stroke-[3]" />
                <span>{t.findMasterBtn}</span>
              </button>
            </div>
          </div>

          {/* Quick text input for service keywords */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2.5 px-1">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              id="hero-keyword-input"
              value={filters.query}
              onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              placeholder={t.searchPlaceholder}
              className="w-full text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Quick popular category pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4 text-xs">
          <span className="text-slate-500 font-black uppercase tracking-wider text-[11px] mr-1">
            {language === 'ru' ? 'Часто ищут:' : 'Көп изделгендер:'}
          </span>
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategorySelect(cat.id)}
              className="bg-white hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 text-slate-700 font-bold uppercase tracking-wider text-[11px] px-3.5 py-1.5 rounded-full border border-slate-200 transition-colors shadow-2xs cursor-pointer"
            >
              {language === 'ru' ? cat.nameRu : cat.nameKy}
            </button>
          ))}
        </div>

        {/* Highlight micro metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 pb-2 max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-100 shadow-2xs">
            <span className="text-2xl sm:text-3xl font-black text-indigo-600">12+</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
              {language === 'ru' ? 'Категорий услуг' : 'Кызмат категориясы'}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-100 shadow-2xs">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">5</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
              {language === 'ru' ? 'Городов КР' : 'КР шаарлары'}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-100 shadow-2xs">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">0 сом</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
              {language === 'ru' ? 'Комиссия клиентам' : 'Кардарга комиссиясыз'}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-100 shadow-2xs">
            <span className="text-2xl sm:text-3xl font-black text-indigo-600">⚡ 30 мин</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
              {language === 'ru' ? 'Средний выезд' : 'Орточо келүү'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
