import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, ShieldCheck, Star, MapPin, Zap } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const { language, t } = useApp();

  const benefits = [
    {
      icon: MessageSquare,
      color: 'bg-emerald-100 text-emerald-700',
      title: t.benefit1Title,
      desc: t.benefit1Desc
    },
    {
      icon: ShieldCheck,
      color: 'bg-blue-100 text-blue-700',
      title: t.benefit2Title,
      desc: t.benefit2Desc
    },
    {
      icon: Star,
      color: 'bg-amber-100 text-amber-700',
      title: t.benefit3Title,
      desc: t.benefit3Desc
    },
    {
      icon: MapPin,
      color: 'bg-indigo-100 text-indigo-700',
      title: t.benefit4Title,
      desc: t.benefit4Desc
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600 mb-1 inline-block">
            {language === 'ru' ? 'Преимущества платформы' : 'Биздин артыкчылыктар'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase leading-none">
            {t.benefitsTitle}
          </h2>
          <div className="h-1.5 w-24 bg-indigo-600 mx-auto mt-3"></div>
          <p className="mt-3 text-xs sm:text-sm font-semibold text-slate-500">
            {language === 'ru'
              ? 'Прозрачный и удобный сервис для решения любых бытовых и строительных задач'
              : 'Күнүмдүк жана курулуш иштерин чечүү үчүн ыңгайлуу кызмат'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-600 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${b.color} mb-4 shadow-2xs`}>
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-black uppercase text-slate-900 mb-2 tracking-tight">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
