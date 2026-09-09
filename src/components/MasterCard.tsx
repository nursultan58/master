import React from 'react';
import { Master } from '../types';
import { useApp } from '../context/AppContext';
import { Star, MapPin, Phone, MessageSquare, Award, CheckCircle, ExternalLink } from 'lucide-react';

interface MasterCardProps {
  master: Master;
  onViewDetails: (master: Master) => void;
}

export const MasterCard: React.FC<MasterCardProps> = ({ master, onViewDetails }) => {
  const { language, t, categories, cities } = useApp();

  const category = categories.find((c) => c.id === master.categoryId);
  const city = cities.find((c) => c.id === master.cityId);

  const cityName = city ? (language === 'ru' ? city.nameRu : city.nameKy) : '';
  const categoryName = category ? (language === 'ru' ? category.nameRu : category.nameKy) : '';

  // WhatsApp link preparation
  const cleanWaNumber = master.whatsapp.replace(/\D/g, '');
  const waDefaultText = encodeURIComponent(
    language === 'ru'
      ? `Здравствуйте, ${master.name}! Нашел ваш профиль на сайте Мастер Тап. Нужна ваша консультация/услуга.`
      : `Саламатсызбы, ${master.name}! Сиздин номериңизди Мастер Тап сайтынан таптым. Кызмат боюнча кайрылып жатам.`
  );
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${waDefaultText}`;

  const isPro = master.tariff === 'pro' || master.tariff === 'premium';

  return (
    <div
      id={`master-card-${master.id}`}
      className={`bg-white rounded-2xl border transition-all hover:shadow-xl flex flex-col justify-between overflow-hidden ${
        isPro
          ? 'border-indigo-600 shadow-md ring-1 ring-indigo-600/30'
          : 'border-slate-200 hover:border-indigo-600'
      }`}
    >
      <div>
        {/* Top Header info / Image & badges */}
        <div className="relative p-5 pb-3">
          {/* Pro / Recommended badge */}
          {isPro && (
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-2xs">
              <Award className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{t.recommendedBadge}</span>
            </div>
          )}

          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={master.avatar}
                alt={master.name}
                referrerPolicy="no-referrer"
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 shadow-xs bg-slate-100"
              />
              <div
                className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full ring-2 ring-white"
                title="Проверен модератором"
              >
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Name, Category, Rating */}
            <div className="flex-1 min-w-0 pr-16 sm:pr-0">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-indigo-600 mb-0.5">
                {categoryName}
              </span>
              <h3 className="text-base sm:text-lg font-black uppercase text-slate-900 truncate leading-tight">
                {master.name}
              </h3>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-1.5 mt-1 text-xs">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                  <span className="text-slate-900 font-black">{master.rating.toFixed(1)}</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-medium text-[11px]">
                  {master.reviewsCount}{' '}
                  {language === 'ru'
                    ? master.reviewsCount === 1
                      ? 'отзыв'
                      : master.reviewsCount > 4
                        ? 'отзывов'
                        : 'отзыва'
                    : 'пикир'}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-medium text-[11px]">
                  {master.experienceYears} {t.experienceYears}
                </span>
              </div>
            </div>
          </div>

          {/* Location: City & District */}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="truncate">
              {cityName}
              {master.district && `, ${master.district}`}
            </span>
          </div>

          {/* Bio snippet */}
          <p className="mt-2.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {master.bio}
          </p>

          {/* Quick Work Photos preview if any */}
          {master.workPhotos && master.workPhotos.length > 0 && (
            <div className="mt-3 flex items-center gap-1.5 overflow-hidden">
              {master.workPhotos.slice(0, 3).map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt={`Работа ${i + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-14 h-11 object-cover rounded-lg border border-slate-200 bg-slate-50"
                />
              ))}
              {master.workPhotos.length > 3 && (
                <div className="w-14 h-11 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-600 border border-slate-200">
                  +{master.workPhotos.length - 3}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pricing bar */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
            {language === 'ru' ? 'Стоимость услуг:' : 'Кызмат баасы:'}
          </span>
          <span className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
            {t.fromPrice} <span className="text-indigo-600 text-base">{master.minPrice}</span> {t.som}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="p-4 pt-3 border-t border-slate-100 bg-white grid grid-cols-12 gap-2">
        {/* WhatsApp Direct Action Button */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          id={`master-wa-btn-${master.id}`}
          className="col-span-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider text-[11px] py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-current shrink-0" />
          <span className="truncate">{t.writeWhatsApp}</span>
        </a>

        {/* Direct Call Button */}
        <a
          href={`tel:${master.phone}`}
          id={`master-call-btn-${master.id}`}
          className="col-span-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black uppercase tracking-wider text-[11px] py-2.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-colors"
          title={`Позвонить: ${master.phone}`}
        >
          <Phone className="w-3.5 h-3.5 text-slate-700 shrink-0" />
          <span className="hidden sm:inline text-[10px]">{t.callBtn}</span>
        </a>

        {/* View Full Profile button */}
        <button
          type="button"
          id={`master-details-btn-${master.id}`}
          onClick={() => onViewDetails(master)}
          className="col-span-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-wider text-[11px] py-2.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer shadow-2xs"
        >
          <span>{t.detailsBtn}</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
