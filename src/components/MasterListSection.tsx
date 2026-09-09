import React from 'react';
import { useApp } from '../context/AppContext';
import { Master } from '../types';
import { MasterCard } from './MasterCard';
import {
  Filter,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  Award,
  Search,
  MapPin,
  Wrench
} from 'lucide-react';

interface MasterListSectionProps {
  onViewDetails: (master: Master) => void;
  title?: string;
  isCatalogView?: boolean;
}

export const MasterListSection: React.FC<MasterListSectionProps> = ({
  onViewDetails,
  title,
  isCatalogView = false
}) => {
  const {
    language,
    t,
    filteredMasters,
    filters,
    setFilters,
    resetFilters,
    categories,
    cities
  } = useApp();

  const selectedCityObj = cities.find((c) => c.id === filters.cityId);
  const availableDistricts = selectedCityObj ? selectedCityObj.districts : [];

  const currentCategory = categories.find((c) => c.id === filters.categoryId);

  return (
    <section id="masters-list-section" className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600 mb-1 inline-block">
              {t.popularMasters}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase leading-none text-slate-900">
              {title ||
                (currentCategory
                  ? language === 'ru'
                    ? `Мастера: ${currentCategory.nameRu}`
                    : `Усталар: ${currentCategory.nameKy}`
                  : language === 'ru'
                    ? 'Проверенные мастера в Кыргызстане'
                    : 'Кыргызстандагы текшерилген усталар')}
            </h2>
            <div className="h-1.5 w-24 bg-indigo-600 mt-3"></div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-2.5">
              {language === 'ru'
                ? `Найдено специалистов: ${filteredMasters.length}`
                : `Табылган адистер: ${filteredMasters.length}`}
            </p>
          </div>

          {/* Filters & Sorting Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Sort by */}
            <div className="flex items-center gap-1.5 bg-white px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-600" />
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: e.target.value as any
                  }))
                }
                className="bg-transparent focus:outline-none cursor-pointer text-[11px]"
              >
                <option value="rating">
                  {language === 'ru' ? 'По рейтингу (высокий)' : 'Рейтинг боюнча'}
                </option>
                <option value="reviews">
                  {language === 'ru' ? 'По количеству отзывов' : 'Пикирлер боюнча'}
                </option>
                <option value="priceAsc">
                  {language === 'ru' ? 'Сначала недорогие' : 'Баасы: арзан'}
                </option>
                <option value="priceDesc">
                  {language === 'ru' ? 'Сначала дорогие' : 'Баасы: кымбат'}
                </option>
              </select>
            </div>

            {/* Pro Only Toggle */}
            <button
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, isProOnly: !prev.isProOnly }))}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                filters.isProOnly
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Только PRO</span>
            </button>

            {/* Reset filters if active */}
            {(filters.cityId !== 'all' ||
              filters.district !== 'all' ||
              filters.categoryId !== 'all' ||
              filters.query ||
              filters.isProOnly) && (
              <button
                type="button"
                onClick={resetFilters}
                className="px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-slate-400" />
                <span>{t.resetFilters}</span>
              </button>
            )}
          </div>
        </div>

        {/* In-Catalog Secondary Quick Filter Toolbar if in Catalog View */}
        {isCatalogView && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 mb-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {/* City filter */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                  {t.selectCity}
                </label>
                <select
                  value={filters.cityId}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      cityId: e.target.value,
                      district: 'all'
                    }))
                  }
                  className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none"
                >
                  <option value="all">{t.allCities}</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {language === 'ru' ? c.nameRu : c.nameKy}
                    </option>
                  ))}
                </select>
              </div>

              {/* District filter */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                  {t.selectDistrict}
                </label>
                <select
                  value={filters.district}
                  onChange={(e) => setFilters((prev) => ({ ...prev, district: e.target.value }))}
                  disabled={filters.cityId === 'all'}
                  className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none disabled:opacity-40"
                >
                  <option value="all">{t.allDistricts}</option>
                  {availableDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category filter */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                  {t.selectCategory}
                </label>
                <select
                  value={filters.categoryId}
                  onChange={(e) => setFilters((prev) => ({ ...prev, categoryId: e.target.value }))}
                  className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none"
                >
                  <option value="all">{t.allCategories}</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {language === 'ru' ? cat.nameRu : cat.nameKy}
                    </option>
                  ))}
                </select>
              </div>

              {/* Text Search */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                  {language === 'ru' ? 'Поиск по ключевым словам' : 'Ачкыч сөз менен издөө'}
                </label>
                <input
                  type="text"
                  value={filters.query}
                  onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
                  placeholder={language === 'ru' ? 'Напр: смеситель, проводка...' : 'Издөө...'}
                  className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Master Cards Grid */}
        {filteredMasters.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black uppercase text-slate-900 mb-1">{t.noMastersFound}</h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">{t.tryChangeFilters}</p>
            <button
              type="button"
              onClick={resetFilters}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-wider text-xs px-6 py-3 rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              {t.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMasters.map((master) => (
              <MasterCard key={master.id} master={master} onViewDetails={onViewDetails} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
