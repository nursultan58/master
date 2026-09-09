import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Master, ServiceCategory, City } from '../types';
import { kyrgyzstanRegions } from '../data/initialData';
import {
  Shield,
  Users,
  CheckCircle,
  XCircle,
  Trash2,
  Ban,
  Award,
  Layers,
  MessageSquare,
  MapPin,
  Plus,
  AlertTriangle,
  Clock,
  ExternalLink,
  Edit,
  Star
} from 'lucide-react';
import { CategoryIcon } from './CategoryIcon';

export const AdminPanel: React.FC = () => {
  const {
    language,
    t,
    masters,
    categories,
    reviews,
    cities,
    approveMaster,
    rejectMaster,
    toggleMasterBlock,
    toggleMasterPro,
    deleteMaster,
    addCategory,
    deleteCategory,
    approveReview,
    deleteReview,
    addCity,
    setViewingMasterId
  } = useApp();

  const [adminTab, setAdminTab] = useState<'masters' | 'categories' | 'reviews' | 'cities'>('masters');
  const [masterFilterStatus, setMasterFilterStatus] = useState<string>('all');

  // New category form
  const [newCatNameRu, setNewCatNameRu] = useState('');
  const [newCatNameKy, setNewCatNameKy] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('Wrench');

  // New city form
  const [newCityRu, setNewCityRu] = useState('');
  const [newCityKy, setNewCityKy] = useState('');
  const [newDistricts, setNewDistricts] = useState('');
  const [newCityRegionRu, setNewCityRegionRu] = useState('Чуйская область');
  const [adminRegionFilter, setAdminRegionFilter] = useState<string>('all');
  const [cityViewMode, setCityViewMode] = useState<'regions' | 'cities'>('regions');

  // Calculations
  const pendingMasters = masters.filter((m) => m.status === 'pending');
  const approvedMasters = masters.filter((m) => m.status === 'approved');

  const filteredMasters = masters.filter((m) => {
    if (masterFilterStatus === 'all') return true;
    return m.status === masterFilterStatus;
  });

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatNameRu.trim() || !newCatNameKy.trim()) return;

    addCategory({
      slug: newCatNameRu.toLowerCase().replace(/\s+/g, '-'),
      nameRu: newCatNameRu.trim(),
      nameKy: newCatNameKy.trim(),
      iconName: newCatIcon,
      isPopular: false
    });

    setNewCatNameRu('');
    setNewCatNameKy('');
  };

  const handleCreateCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityRu.trim() || !newCityKy.trim()) return;

    const districtsArr = newDistricts
      .split(',')
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    const regionObj = kyrgyzstanRegions.find((r) => r.nameRu === newCityRegionRu);

    addCity({
      nameRu: newCityRu.trim(),
      nameKy: newCityKy.trim(),
      regionRu: newCityRegionRu,
      regionKy: regionObj?.nameKy || newCityRegionRu,
      districts: districtsArr.length > 0 ? districtsArr : ['Центр']
    });

    setNewCityRu('');
    setNewCityKy('');
    setNewDistricts('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/30">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              {language === 'ru' ? 'Панель администратора' : 'Администратордун панели'}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
              {language === 'ru'
                ? 'Модерация мастеров, управление категориями и отзывами'
                : 'Усталарды текшерүү, категорияларды жана пикирлерди башкаруу'}
            </p>
          </div>
        </div>

        {/* Pending counter badge */}
        {pendingMasters.length > 0 && (
          <div className="bg-red-500/20 border border-red-500/40 text-red-300 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="font-black uppercase tracking-wider text-[11px]">
              {pendingMasters.length}{' '}
              {language === 'ru' ? 'мастеров ждут проверки' : 'уста текшерүүнү күтүүдө'}
            </span>
          </div>
        )}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Всего мастеров</span>
          <div className="text-3xl font-black text-slate-900 mt-1">{masters.length}</div>
        </div>
        <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 shadow-sm">
          <span className="text-[10px] text-amber-800 font-black uppercase tracking-wider">Ожидают модерации</span>
          <div className="text-3xl font-black text-amber-600 mt-1">{pendingMasters.length}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Категорий услуг</span>
          <div className="text-3xl font-black text-slate-900 mt-1">{categories.length}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Отзывов клиентов</span>
          <div className="text-3xl font-black text-slate-900 mt-1">{reviews.length}</div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-3 text-xs font-black uppercase tracking-wider overflow-x-auto">
        <button
          type="button"
          onClick={() => setAdminTab('masters')}
          className={`pb-3 px-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            adminTab === 'masters'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Мастера</span>
          {pendingMasters.length > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
              {pendingMasters.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setAdminTab('categories')}
          className={`pb-3 px-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            adminTab === 'categories'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Категории ({categories.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setAdminTab('reviews')}
          className={`pb-3 px-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            adminTab === 'reviews'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Отзывы ({reviews.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setAdminTab('cities')}
          className={`pb-3 px-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            adminTab === 'cities'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Города ({cities.length})</span>
        </button>
      </div>

      {/* TAB 1: Masters Management */}
      {adminTab === 'masters' && (
        <div className="space-y-4">
          {/* Filter Status buttons */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <button
              type="button"
              onClick={() => setMasterFilterStatus('all')}
              className={`px-3.5 py-2 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all cursor-pointer ${
                masterFilterStatus === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              Все ({masters.length})
            </button>
            <button
              type="button"
              onClick={() => setMasterFilterStatus('pending')}
              className={`px-3.5 py-2 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all cursor-pointer ${
                masterFilterStatus === 'pending'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white text-amber-800 border border-amber-300 hover:bg-amber-50'
              }`}
            >
              На модерации ({pendingMasters.length})
            </button>
            <button
              type="button"
              onClick={() => setMasterFilterStatus('approved')}
              className={`px-3.5 py-2 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all cursor-pointer ${
                masterFilterStatus === 'approved'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-emerald-800 border border-slate-200 hover:border-emerald-300'
              }`}
            >
              Одобренные ({approvedMasters.length})
            </button>
            <button
              type="button"
              onClick={() => setMasterFilterStatus('blocked')}
              className={`px-3.5 py-2 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all cursor-pointer ${
                masterFilterStatus === 'blocked'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-white text-red-800 border border-slate-200 hover:border-red-300'
              }`}
            >
              Заблокированные ({masters.filter((m) => m.status === 'blocked').length})
            </button>
          </div>

          {/* Master Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                  <tr>
                    <th className="py-3.5 px-4">Мастер</th>
                    <th className="py-3.5 px-4">Категория / Город</th>
                    <th className="py-3.5 px-4">Контакты</th>
                    <th className="py-3.5 px-4">Статус</th>
                    <th className="py-3.5 px-4">Тариф</th>
                    <th className="py-3.5 px-4 text-right">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredMasters.map((master) => {
                    const cat = categories.find((c) => c.id === master.categoryId);
                    const city = cities.find((c) => c.id === master.cityId);

                    return (
                      <tr key={master.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={master.avatar}
                              alt={master.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-xl object-cover bg-slate-100 border border-slate-200 shadow-xs"
                            />
                            <div>
                              <button
                                type="button"
                                onClick={() => setViewingMasterId(master.id)}
                                className="font-black text-slate-900 hover:text-indigo-600 text-left line-clamp-1 uppercase tracking-tight text-xs sm:text-sm cursor-pointer"
                              >
                                {master.name}
                              </button>
                              <div className="text-slate-400 text-[11px] font-semibold">
                                Опыт: {master.experienceYears} лет • От {master.minPrice} сом
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-800 text-xs">
                            {cat?.nameRu || master.categoryId}
                          </div>
                          <div className="text-slate-400 text-[11px] font-medium">
                            {city?.nameRu}, {master.district}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="text-slate-900 font-bold text-xs">{master.phone}</div>
                          <div className="text-emerald-600 text-[11px] font-bold">WA: +{master.whatsapp}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          {master.status === 'approved' ? (
                            <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] px-2.5 py-1 rounded-lg font-black uppercase tracking-wider">
                              Одобрен
                            </span>
                          ) : master.status === 'pending' ? (
                            <span className="inline-block bg-amber-100 text-amber-900 text-[10px] px-2.5 py-1 rounded-lg font-black uppercase tracking-wider animate-pulse">
                              На модерации
                            </span>
                          ) : (
                            <span className="inline-block bg-red-100 text-red-800 text-[10px] px-2.5 py-1 rounded-lg font-black uppercase tracking-wider">
                              {master.status}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <button
                            type="button"
                            onClick={() => toggleMasterPro(master.id)}
                            title="Нажмите чтобы переключить PRO статус"
                            className={`text-[10px] px-2.5 py-1 rounded-lg font-black uppercase tracking-wider transition-all cursor-pointer ${
                              master.tariff !== 'free'
                                ? 'bg-indigo-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {master.tariff.toUpperCase()}
                          </button>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Action: Approve if pending */}
                            {master.status === 'pending' && (
                              <button
                                type="button"
                                onClick={() => approveMaster(master.id)}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                                title="Одобрить мастера"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Одобрить</span>
                              </button>
                            )}

                            {/* Action: Block / Unblock */}
                            <button
                              type="button"
                              onClick={() => toggleMasterBlock(master.id)}
                              className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                                master.status === 'blocked'
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-slate-100 text-slate-700 hover:bg-amber-100 hover:text-amber-900'
                              }`}
                              title={master.status === 'blocked' ? 'Разблокировать' : 'Заблокировать'}
                            >
                              <Ban className="w-4 h-4" />
                            </button>

                            {/* Action: Delete */}
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Удалить мастера ${master.name}?`)) {
                                  deleteMaster(master.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Удалить"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Categories Management */}
      {adminTab === 'categories' && (
        <div className="space-y-6">
          {/* Add Category Form */}
          <form
            onSubmit={handleCreateCategory}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
          >
            <h3 className="text-sm font-black uppercase tracking-tight text-slate-900">Добавить новую категорию услуг</h3>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4">
                <input
                  type="text"
                  required
                  value={newCatNameRu}
                  onChange={(e) => setNewCatNameRu(e.target.value)}
                  placeholder="Название на русском (напр. Вскрытие замков)"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="sm:col-span-4">
                <input
                  type="text"
                  required
                  value={newCatNameKy}
                  onChange={(e) => setNewCatNameKy(e.target.value)}
                  placeholder="Название на кыргызском (напр. Кулпу ачуу)"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="sm:col-span-2">
                <select
                  value={newCatIcon}
                  onChange={(e) => setNewCatIcon(e.target.value)}
                  className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
                >
                  <option value="Wrench">Ключ (Wrench)</option>
                  <option value="Zap">Электрика (Zap)</option>
                  <option value="Home">Дом (Home)</option>
                  <option value="Sparkles">Клининг (Sparkles)</option>
                  <option value="Wind">Кондиционер (Wind)</option>
                  <option value="Car">Авто (Car)</option>
                  <option value="Camera">Камера (Camera)</option>
                  <option value="Laptop">IT (Laptop)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-wider text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Добавить</span>
                </button>
              </div>
            </div>
          </form>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                    <CategoryIcon name={cat.iconName} className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-tight text-slate-900">{cat.nameRu}</h4>
                    <p className="text-[11px] font-semibold text-slate-400">{cat.nameKy}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => deleteCategory(cat.id)}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  title="Удалить категорию"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Reviews Management */}
      {adminTab === 'reviews' && (
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
          {reviews.map((rev) => {
            const master = masters.find((m) => m.id === rev.masterId);
            return (
              <div key={rev.id} className="p-4 sm:p-5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs uppercase tracking-wider text-slate-900">{rev.clientName}</span>
                    <span className="text-[11px] font-bold text-slate-400">• {rev.date}</span>
                    <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">
                      Для мастера: <span className="font-bold">{master?.name || rev.masterId}</span>
                    </span>
                  </div>

                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-xs font-medium text-slate-700 mt-1 leading-relaxed">{rev.text}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!rev.approved && (
                    <button
                      type="button"
                      onClick={() => approveReview(rev.id)}
                      className="bg-emerald-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-black uppercase tracking-wider hover:bg-emerald-500 transition-colors cursor-pointer"
                    >
                      Одобрить
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => deleteReview(rev.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Удалить отзыв"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 4: Cities & Administrative Division Management */}
      {adminTab === 'cities' && (
        <div className="space-y-6">
          {/* Administrative Division of Kyrgyzstan Official Stats Card */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400">
                  Официальное государственное устройство КР
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-1">
                  Административно-территориальное деление Кыргызстана
                </h3>
                <p className="text-xs text-slate-300 font-medium max-w-2xl mt-1">
                  Кыргызская Республика состоит из 7 областей и 2 городов республиканского значения, включающих 40 районов и 31 город.
                </p>
              </div>

              {/* View mode toggle */}
              <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shrink-0">
                <button
                  type="button"
                  onClick={() => setCityViewMode('regions')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    cityViewMode === 'regions'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  По областям (7 областей)
                </button>
                <button
                  type="button"
                  onClick={() => setCityViewMode('cities')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    cityViewMode === 'cities'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Все города ({cities.length})
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="text-2xl font-black text-white">2</div>
                <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 mt-0.5">
                  Города респ. значения (Бишкек, Ош)
                </div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="text-2xl font-black text-indigo-400">7</div>
                <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 mt-0.5">
                  Областей
                </div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="text-2xl font-black text-emerald-400">40</div>
                <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 mt-0.5">
                  Районов
                </div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="text-2xl font-black text-amber-400">31</div>
                <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 mt-0.5">
                  Город
                </div>
              </div>
            </div>
          </div>

          {/* VIEW 1: 7 Oblasts & 2 Republican Cities View */}
          {cityViewMode === 'regions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {kyrgyzstanRegions.map((region) => (
                <div
                  key={region.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 hover:border-indigo-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-indigo-600 mb-0.5">
                        {region.type === 'city_republican'
                          ? 'Город республиканского значения'
                          : 'Область Кыргызстана'}
                      </div>
                      <h4 className="font-black text-base uppercase tracking-tight text-slate-900">
                        {region.nameRu}
                      </h4>
                      <div className="text-xs text-slate-500 font-semibold">{region.nameKy}</div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-1 rounded-lg shrink-0">
                      Центр: {region.centerRu}
                    </span>
                  </div>

                  {/* Districts */}
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
                      <span>Районы ({region.districtsRu.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {region.districtsRu.map((d, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold bg-indigo-50/70 text-indigo-900 px-2.5 py-1 rounded-lg border border-indigo-100/60"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cities */}
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                      <span>Города ({region.cities.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {region.cities.map((c) => (
                        <span
                          key={c.id}
                          className="text-[10px] font-black uppercase bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200"
                        >
                          {c.nameRu}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Form to add a new city */}
          <form
            onSubmit={handleCreateCity}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
          >
            <h3 className="text-sm font-black uppercase tracking-tight text-slate-900">
              Добавить населенный пункт или город в базу
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-3">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                  Область / Регион
                </label>
                <select
                  value={newCityRegionRu}
                  onChange={(e) => setNewCityRegionRu(e.target.value)}
                  className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
                >
                  {kyrgyzstanRegions.map((r) => (
                    <option key={r.id} value={r.nameRu}>
                      {r.nameRu}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                  Название на русском
                </label>
                <input
                  type="text"
                  required
                  value={newCityRu}
                  onChange={(e) => setNewCityRu(e.target.value)}
                  placeholder="напр. Нарын"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                  Название на кыргызском
                </label>
                <input
                  type="text"
                  required
                  value={newCityKy}
                  onChange={(e) => setNewCityKy(e.target.value)}
                  placeholder="напр. Нарын"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                  Районы (через запятую)
                </label>
                <input
                  type="text"
                  value={newDistricts}
                  onChange={(e) => setNewDistricts(e.target.value)}
                  placeholder="Центр, 1-й мкр"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="sm:col-span-12 flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-wider text-xs px-6 py-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Сохранить в базу</span>
                </button>
              </div>
            </div>
          </form>

          {/* Region filter pills for cities list */}
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                Города и административные центры в каталоге ({cities.length})
              </h3>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setAdminRegionFilter('all')}
                  className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    adminRegionFilter === 'all'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Все ({cities.length})
                </button>
                {kyrgyzstanRegions.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setAdminRegionFilter(r.nameRu)}
                    className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      adminRegionFilter === r.nameRu
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {r.nameRu}
                  </button>
                ))}
              </div>
            </div>

            {/* Cities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cities
                .filter((city) => {
                  if (adminRegionFilter === 'all') return true;
                  return city.regionRu === adminRegionFilter;
                })
                .map((city) => (
                  <div
                    key={city.id}
                    className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                          <h4 className="font-black text-sm uppercase tracking-tight text-slate-900">
                            {city.nameRu} / {city.nameKy}
                          </h4>
                        </div>
                        {city.regionRu && (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded shrink-0">
                            {city.regionRu}
                          </span>
                        )}
                      </div>

                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mt-2">
                        Районы и зоны ({city.districts.length}):
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1.5 max-h-32 overflow-y-auto">
                        {city.districts.map((d, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
