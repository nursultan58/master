import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Wrench,
  Phone,
  MessageSquare,
  MapPin,
  Mail,
  Send,
  Heart,
  Globe
} from 'lucide-react';

interface FooterProps {
  onSelectCategory: (catId: string) => void;
  openRegisterModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, openRegisterModal }) => {
  const { language, t, categories, cities } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs sm:text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Col 1: Logo & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                <Wrench className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight uppercase">
                МАСТЕР<span className="text-indigo-500">ТАП</span>
              </span>
              <span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                Кыргызстан
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-medium">
              {t.aboutService}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/996700123456"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white flex items-center justify-center border border-emerald-500/30 transition-colors shadow-2xs"
                title="WhatsApp Support"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://t.me/mastertap_kg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white flex items-center justify-center border border-indigo-500/30 transition-colors shadow-2xs"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="tel:+996700123456"
                className="w-10 h-10 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white flex items-center justify-center border border-indigo-500/30 transition-colors shadow-2xs"
                title="Позвонить в поддержку"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-200">
              {language === 'ru' ? 'Популярные услуги' : 'Популярдуу кызматтар'}
            </h4>
            <div className="h-0.5 w-12 bg-indigo-600"></div>
            <ul className="space-y-2 text-xs font-semibold">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-indigo-400 transition-colors text-left"
                  >
                    {language === 'ru' ? cat.nameRu : cat.nameKy}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Cities in Kyrgyzstan */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-200">
              {language === 'ru' ? 'Города работы' : 'Иштеген шаарлар'}
            </h4>
            <div className="h-0.5 w-12 bg-indigo-600"></div>
            <ul className="space-y-2 text-xs font-semibold">
              {cities.map((city) => (
                <li key={city.id} className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>{language === 'ru' ? city.nameRu : city.nameKy}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacts & For Masters */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-200">
              {t.supportContacts}
            </h4>
            <div className="h-0.5 w-12 bg-indigo-600"></div>
            <div className="space-y-2.5 text-xs font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>{t.bishkekOffice}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                <a href="tel:+996700123456" className="hover:text-white transition-colors">
                  +996 700 123 456
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>info@mastertap.kg</span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={openRegisterModal}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-wider py-2.5 px-3 rounded-xl text-xs transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  {t.becomeMaster}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {t.siteName}. {t.allRightsReserved}.
          </div>
          <div className="flex items-center gap-1">
            <span>Сделано с заботой для Кыргызстана</span>
            <span className="text-red-500">🇰🇬</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
