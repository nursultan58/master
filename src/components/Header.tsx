import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wrench,
  MapPin,
  Globe,
  UserPlus,
  Briefcase,
  Shield,
  Menu,
  X,
  Search,
  CheckCircle2
} from 'lucide-react';

interface HeaderProps {
  activeView: 'home' | 'catalog' | 'cabinet' | 'admin';
  setActiveView: (view: 'home' | 'catalog' | 'cabinet' | 'admin') => void;
  openRegisterModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView, openRegisterModal }) => {
  const {
    language,
    setLanguage,
    t,
    role,
    setRole,
    cities,
    filters,
    setFilters,
    masters
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Count pending masters for admin badge
  const pendingCount = masters.filter((m) => m.status === 'pending').length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro bar with country highlight and quick role demo switch */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-200">
              {language === 'ru' ? 'Кыргызстан • Сервис поиска мастеров' : 'Кыргызстан • Усталарды издөө кызматы'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switch */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                type="button"
                onClick={() => setLanguage('ru')}
                className={`px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider transition-colors ${
                  language === 'ru' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                РУС
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ky')}
                className={`px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider transition-colors ${
                  language === 'ky' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                КЫР
              </button>
            </div>

            {/* Quick Role Switcher for seamless testing */}
            <div className="hidden md:flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-0.5 rounded-lg border border-slate-700 text-[11px]">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">{t.switchRole}:</span>
              <button
                type="button"
                onClick={() => {
                  setRole('client');
                  setActiveView('home');
                }}
                className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px] transition-colors ${
                  role === 'client' && activeView !== 'cabinet' && activeView !== 'admin'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {t.clientMode}
              </button>
              <span className="text-slate-600">|</span>
              <button
                type="button"
                onClick={() => {
                  setRole('master');
                  setActiveView('cabinet');
                }}
                className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px] transition-colors ${
                  activeView === 'cabinet'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Мастер
              </button>
              <span className="text-slate-600">|</span>
              <button
                type="button"
                onClick={() => {
                  setRole('admin');
                  setActiveView('admin');
                }}
                className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 transition-colors ${
                  activeView === 'admin'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Админ
                {pendingCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {pendingCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setActiveView('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xl italic shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight uppercase text-slate-900">
                  Мастер <span className="text-indigo-600">Тап</span>
                </span>
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-black uppercase px-1.5 py-0.2 rounded">
                  KG
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider -mt-0.5 line-clamp-1">
                {language === 'ru' ? 'Поиск мастеров в Кыргызстане' : 'Кыргызстандагы усталар'}
              </p>
            </div>
          </button>

          {/* City selector dropdown */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200/80 px-3 py-2 rounded-xl border border-slate-200 transition-colors">
            <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <select
              value={filters.cityId}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  cityId: e.target.value,
                  district: 'all'
                }));
              }}
              className="bg-transparent font-bold uppercase tracking-wider text-slate-800 cursor-pointer focus:outline-none text-[11px]"
            >
              <option value="all">{t.allCities}</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {language === 'ru' ? c.nameRu : c.nameKy}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveView('catalog')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-widest transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeView === 'catalog'
                ? 'bg-indigo-50 text-indigo-600 font-black'
                : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t.viewCatalog}</span>
          </button>

          <button
            type="button"
            onClick={openRegisterModal}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-widest text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.becomeMaster}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('cabinet')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-widest transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeView === 'cabinet'
                ? 'bg-indigo-50 text-indigo-600 font-black'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
            <span>{t.masterCabinet}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('admin')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-widest transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeView === 'admin'
                ? 'bg-slate-900 text-white font-black'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.adminPanel}</span>
            {pendingCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>

          {/* Quick Enter / Register Primary Pill Button matching design */}
          <button
            type="button"
            onClick={openRegisterModal}
            className="ml-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-indigo-600 transition-colors shadow-xs cursor-pointer"
          >
            {language === 'ru' ? 'Регистрация' : 'Катталуу'}
          </button>
        </nav>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={openRegisterModal}
            className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-wider px-3 py-2 rounded-xl shadow-xs"
          >
            + {language === 'ru' ? 'Мастер' : 'Уста'}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          {/* City selector on mobile */}
          <div className="flex items-center gap-2 bg-slate-100 p-3 rounded-xl text-sm">
            <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.selectCity}:</span>
            <select
              value={filters.cityId}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  cityId: e.target.value,
                  district: 'all'
                }));
              }}
              className="bg-transparent font-bold uppercase tracking-wider text-slate-800 text-xs flex-1 focus:outline-none"
            >
              <option value="all">{t.allCities}</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {language === 'ru' ? c.nameRu : c.nameKy}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            <button
              type="button"
              onClick={() => {
                setActiveView('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                activeView === 'home' ? 'bg-indigo-50 text-indigo-600 font-black' : 'text-slate-700'
              }`}
            >
              {language === 'ru' ? 'Главная страница' : 'Башкы бет'}
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveView('catalog');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                activeView === 'catalog' ? 'bg-indigo-50 text-indigo-600 font-black' : 'text-slate-700'
              }`}
            >
              {t.viewCatalog}
            </button>

            <button
              type="button"
              onClick={() => {
                openRegisterModal();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                {t.becomeMaster}
              </span>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-black">
                {language === 'ru' ? 'Бесплатно' : 'Акысыз'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveView('cabinet');
                setRole('master');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                activeView === 'cabinet' ? 'bg-indigo-50 text-indigo-600 font-black' : 'text-slate-700'
              }`}
            >
              <Briefcase className="w-4 h-4 text-indigo-600" />
              {t.masterCabinet}
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveView('admin');
                setRole('admin');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between ${
                activeView === 'admin' ? 'bg-slate-900 text-white font-black' : 'text-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                {t.adminPanel}
              </span>
              {pendingCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-black">
                  {pendingCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
