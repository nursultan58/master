import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const ClientReviewsSection: React.FC = () => {
  const { language, t, reviews, masters } = useApp();

  const approvedReviews = reviews.filter((r) => r.approved).slice(0, 3);

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600 mb-1 inline-block">
            {t.clientReviews}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase leading-none">
            {language === 'ru'
              ? 'Что говорят клиенты о мастерах'
              : 'Кардарлардын пикирлери'}
          </h2>
          <div className="h-1.5 w-24 bg-indigo-600 mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {approvedReviews.map((rev) => {
            const master = masters.find((m) => m.id === rev.masterId);

            return (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-600 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{rev.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-black text-xs uppercase tracking-tight text-slate-900">{rev.clientName}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {language === 'ru' ? 'Заказчик' : 'Кардар'}
                    </div>
                  </div>

                  {master && (
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        {language === 'ru' ? 'Мастер:' : 'Уста:'}
                      </span>
                      <span className="text-xs font-black uppercase text-indigo-600 tracking-tight">
                        {master.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
