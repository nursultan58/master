import React from 'react';
import { useApp } from '../context/AppContext';
import { CategoryIcon } from './CategoryIcon';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PopularCategoriesProps {
  onSelectCategory: (categoryId: string) => void;
}

export const PopularCategories: React.FC<PopularCategoriesProps> = ({ onSelectCategory }) => {
  const { language, t, categories, masters, filters } = useApp();

  // Helper to count masters per category
  const getMasterCount = (catId: string) => {
    return masters.filter((m) => m.categoryId === catId && m.status === 'approved').length;
  };

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600 mb-1 inline-block">
              {t.popularCategories}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase leading-none text-slate-900">
              {language === 'ru' ? 'Каталог услуг мастеров' : 'Усталардын кызматтары'}
            </h2>
            <div className="h-1.5 w-24 bg-indigo-600 mt-3"></div>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-md">
            {language === 'ru'
              ? 'Выберите категорию, чтобы мгновенно увидеть свободных специалистов в вашем городе'
              : 'Шаарыңыздагы бош усталардын тизмесин көрүү үчүн керектүү кызматты тандаңыз'}
          </p>
        </div>

        {/* Categories Grid (12 items) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {categories.map((cat) => {
            const count = getMasterCount(cat.id);
            const isSelected = filters.categoryId === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                id={`category-btn-${cat.slug}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`group text-center p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between items-center h-40 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-600/30'
                    : 'border-slate-200 hover:border-indigo-600 hover:shadow-lg bg-white'
                }`}
              >
                <div className="w-full flex justify-end">
                  {cat.isPopular ? (
                    <span className="text-[9px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded-full">
                      TOP
                    </span>
                  ) : (
                    <span className="h-4" />
                  )}
                </div>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-indigo-600 group-hover:text-white'
                  }`}
                >
                  <CategoryIcon name={cat.iconName} className="w-6 h-6" />
                </div>

                <div className="w-full">
                  <span className="font-black uppercase text-xs tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors block line-clamp-1">
                    {language === 'ru' ? cat.nameRu : cat.nameKy}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-0.5">
                    {count}{' '}
                    {count === 1
                      ? language === 'ru'
                        ? 'мастер'
                        : 'уста'
                      : language === 'ru'
                        ? 'мастеров'
                        : 'уста'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
