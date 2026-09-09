import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Master, TariffPlan } from '../types';
import {
  User,
  Phone,
  MessageSquare,
  Wrench,
  Star,
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Award,
  Crown,
  Sparkles,
  MapPin,
  Save,
  Check,
  AlertCircle
} from 'lucide-react';

export const MasterCabinet: React.FC = () => {
  const {
    language,
    t,
    currentMaster,
    currentMasterId,
    setCurrentMasterId,
    masters,
    updateMaster,
    addMasterService,
    removeMasterService,
    addMasterPhoto,
    removeMasterPhoto,
    changeMasterTariff,
    reviews,
    cities,
    categories
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'services' | 'photos' | 'reviews' | 'tariffs'>('profile');

  // Form states for profile
  const [name, setName] = useState(currentMaster?.name || '');
  const [phone, setPhone] = useState(currentMaster?.phone || '');
  const [whatsapp, setWhatsapp] = useState(currentMaster?.whatsapp || '');
  const [cityId, setCityId] = useState(currentMaster?.cityId || 'bishkek');
  const [district, setDistrict] = useState(currentMaster?.district || '');
  const [bio, setBio] = useState(currentMaster?.bio || '');
  const [experienceYears, setExperienceYears] = useState(currentMaster?.experienceYears || 5);
  const [minPrice, setMinPrice] = useState(currentMaster?.minPrice || 500);

  // New service state
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServicePrice, setNewServicePrice] = useState(500);
  const [newServiceUnit, setNewServiceUnit] = useState('шт');

  // New photo state
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  // Sync if current master changes
  React.useEffect(() => {
    if (currentMaster) {
      setName(currentMaster.name);
      setPhone(currentMaster.phone);
      setWhatsapp(currentMaster.whatsapp);
      setCityId(currentMaster.cityId);
      setDistrict(currentMaster.district);
      setBio(currentMaster.bio);
      setExperienceYears(currentMaster.experienceYears);
      setMinPrice(currentMaster.minPrice);
    }
  }, [currentMaster]);

  if (!currentMaster) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-800">Мастер не выбран</h2>
      </div>
    );
  }

  const masterReviews = reviews.filter((r) => r.masterId === currentMaster.id);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateMaster(currentMaster.id, {
      name,
      phone,
      whatsapp: whatsapp.replace(/\D/g, ''),
      cityId,
      district,
      bio,
      experienceYears: Number(experienceYears),
      minPrice: Number(minPrice)
    });
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle.trim()) return;
    addMasterService(currentMaster.id, {
      title: newServiceTitle.trim(),
      price: Number(newServicePrice) || 100,
      unit: newServiceUnit
    });
    setNewServiceTitle('');
    setNewServicePrice(500);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim()) return;
    addMasterPhoto(currentMaster.id, newPhotoUrl.trim());
    setNewPhotoUrl('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Banner with Master identity & fast account switcher for demo */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentMaster.avatar}
            alt={currentMaster.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900">{currentMaster.name}</h1>
              {currentMaster.tariff !== 'free' && (
                <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                  <Award className="w-3 h-3 text-white" />
                  {currentMaster.tariff.toUpperCase()}
                </span>
              )}
            </div>

            {/* Status pill */}
            <div className="flex items-center gap-2 mt-1">
              {currentMaster.status === 'approved' ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {language === 'ru' ? 'Профиль одобрен и опубликован' : 'Профиль текшерилген'}
                </span>
              ) : currentMaster.status === 'pending' ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                  <Clock className="w-3.5 h-3.5" />
                  {language === 'ru' ? 'На проверке администратора' : 'Текшерүүдө'}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full">
                  {currentMaster.status}
                </span>
              )}

              <div className="flex items-center gap-1 text-xs font-bold text-amber-600 ml-2">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-black text-slate-900">{currentMaster.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal">
                  ({currentMaster.reviewsCount} {t.reviewsWord})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo switcher: Test as another master */}
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs flex items-center gap-2 self-start md:self-auto">
          <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            {language === 'ru' ? 'Войти как:' : 'Тандоо:'}
          </span>
          <select
            value={currentMasterId}
            onChange={(e) => setCurrentMasterId(e.target.value)}
            className="bg-white border border-slate-300 font-bold text-slate-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-600"
          >
            {masters.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Verification notice if pending */}
      {currentMaster.status === 'pending' && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 text-amber-900 text-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-xs uppercase tracking-wider">
              {language === 'ru'
                ? 'Ваша заявка ожидает подтверждения модератором'
                : 'Сиздин өтүнмөңүз модератордун кароосунда'}
            </p>
            <p className="text-xs text-amber-800 mt-0.5">
              {language === 'ru'
                ? 'Пока профиль проверяется, вы можете заранее заполнить список услуг с ценами и загрузить фото выполненных работ. После одобрения профиль сразу станет доступен клиентам.'
                : 'Профиль текшерилип жатканда кызматтарыңызды, бааларды жана иштериңиздин сүрөттөрүн кошо бериңиз.'}
            </p>
          </div>
        </div>
      )}

      {/* Cabinet Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto text-xs font-black uppercase tracking-wider">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'profile'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <User className="w-4 h-4" />
          <span>{language === 'ru' ? 'Информация профиля' : 'Профиль маалыматы'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`pb-3 px-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'services'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>
            {t.servicesAndPrices} ({currentMaster.services.length})
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('photos')}
          className={`pb-3 px-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'photos'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>
            {t.completedWorks} ({currentMaster.workPhotos.length})
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 px-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'reviews'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>
            {t.clientReviews} ({masterReviews.length})
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tariffs')}
          className={`pb-3 px-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'tariffs'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Crown className="w-4 h-4 text-indigo-600" />
          <span>{language === 'ru' ? 'Тарифы и продвижение' : 'Тарифтер жана илгерилетүү'}</span>
        </button>
      </div>

      {/* TAB 1: Profile Edit */}
      {activeTab === 'profile' && (
        <form
          onSubmit={handleSaveProfile}
          className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm"
        >
          <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">
            {language === 'ru' ? 'Редактирование профиля мастера' : 'Профилди өзгөртүү'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">{t.fullName}</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">{t.phoneNumber}</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                {t.whatsappNumber}
              </label>
              <input
                type="text"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                {t.selectYourCity}
              </label>
              <select
                value={cityId}
                onChange={(e) => {
                  const newCityId = e.target.value;
                  setCityId(newCityId);
                  const city = cities.find((c) => c.id === newCityId);
                  if (city && city.districts.length > 0 && !district) {
                    setDistrict(city.districts[0]);
                  }
                }}
                className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
              >
                {(() => {
                  const groups: { [key: string]: typeof cities } = {};
                  cities.forEach((c) => {
                    const region = (language === 'ru' ? c.regionRu : c.regionKy) || (language === 'ru' ? 'Другие города' : 'Башка шаарлар');
                    if (!groups[region]) groups[region] = [];
                    groups[region].push(c);
                  });
                  return Object.entries(groups).map(([regionName, cityList]) => (
                    <optgroup key={regionName} label={regionName}>
                      {cityList.map((c) => (
                        <option key={c.id} value={c.id}>
                          {language === 'ru' ? c.nameRu : c.nameKy}
                        </option>
                      ))}
                    </optgroup>
                  ));
                })()}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">{t.yourDistrict}</label>
              <input
                type="text"
                list="cabinet-districts-list"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
              <datalist id="cabinet-districts-list">
                {cities.find((c) => c.id === cityId)?.districts.map((d) => (
                  <option key={d} value={d} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                {t.experienceInput}
              </label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                {t.minPriceInput}
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">{t.aboutYou}</label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{language === 'ru' ? 'Сохранить изменения' : 'Өзгөртүүлөрдү сактоо'}</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: Services & Prices */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          {/* Add new service */}
          <form
            onSubmit={handleAddService}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"
          >
            <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 mb-3">
              {language === 'ru' ? 'Добавить новую услугу' : 'Жаңы кызмат кошуу'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6">
                <input
                  type="text"
                  required
                  value={newServiceTitle}
                  onChange={(e) => setNewServiceTitle(e.target.value)}
                  placeholder={
                    language === 'ru'
                      ? 'Название услуги (напр. Замена сифона)'
                      : 'Кызматтын аталышы'
                  }
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div className="sm:col-span-3">
                <input
                  type="number"
                  required
                  value={newServicePrice}
                  onChange={(e) => setNewServicePrice(Number(e.target.value))}
                  placeholder="Цена (сом)"
                  className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-wider text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === 'ru' ? 'Добавить' : 'Кошуу'}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Current services list */}
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
            {currentMaster.services.map((srv) => (
              <div key={srv.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{srv.title}</div>
                  <div className="text-xs text-slate-500">
                    {srv.price} {t.som} {srv.unit && `/ ${srv.unit}`}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeMasterService(currentMaster.id, srv.id)}
                  className="text-slate-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                  title="Удалить услугу"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Work Photos */}
      {activeTab === 'photos' && (
        <div className="space-y-6">
          <form
            onSubmit={handleAddPhoto}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"
          >
            <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 mb-3">
              {language === 'ru'
                ? 'Добавить фото выполненной работы'
                : 'Аткарылган иштин сүрөтүн кошуу'}
            </h3>
            <div className="flex gap-2">
              <input
                type="url"
                required
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-wider text-xs px-6 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'ru' ? 'Загрузить' : 'Кошуу'}</span>
              </button>
            </div>
          </form>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {currentMaster.workPhotos.map((photo, idx) => (
              <div
                key={idx}
                className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-4/3"
              >
                <img
                  src={photo}
                  alt={`Работа ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeMasterPhoto(currentMaster.id, idx)}
                  className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-700 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Удалить фото"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Reviews */}
      {activeTab === 'reviews' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">{t.clientReviews}</h3>
            <div className="flex items-center gap-2 text-sm font-black text-amber-500">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>
                {currentMaster.rating.toFixed(1)} / 5 ({masterReviews.length})
              </span>
            </div>
          </div>

          {masterReviews.length === 0 ? (
            <p className="text-xs font-semibold text-slate-500 italic py-6 text-center">
              {language === 'ru'
                ? 'У вас пока нет отзывов. Выполняйте заказы качественно, чтобы клиенты оставляли высокие оценки!'
                : 'Сизде азырынча пикир жок.'}
            </p>
          ) : (
            <div className="space-y-3">
              {masterReviews.map((rev) => (
                <div key={rev.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-xs uppercase tracking-wider text-slate-900">{rev.clientName}</span>
                    <span className="text-[11px] font-bold text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center text-amber-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">{rev.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: Tariffs (Section 11 of the specification) */}
      {activeTab === 'tariffs' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900">
              {language === 'ru' ? 'Тарифные планы для мастеров' : 'Усталар үчүн тарифтер'}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
              {language === 'ru'
                ? 'Увеличьте количество звонков и заявок клиентов в 3-5 раз с помощью продвижения'
                : 'Кардарлардын чалууларын 3-5 эсеге көбөйтүңүз'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <div
              className={`bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                currentMaster.tariff === 'free'
                  ? 'border-slate-400 ring-2 ring-slate-400/20 shadow-xs'
                  : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                    {t.tariffFree}
                  </span>
                  {currentMaster.tariff === 'free' && (
                    <span className="text-[10px] bg-slate-100 text-slate-800 font-black uppercase tracking-wider px-2 py-0.5 rounded">
                      {language === 'ru' ? 'Текущий' : 'Учурдагы'}
                    </span>
                  )}
                </div>
                <div className="text-3xl font-black text-slate-900">
                  0 <span className="text-xs font-bold text-slate-500">сом / ай</span>
                </div>
                <ul className="mt-6 space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Обычный профиль мастера</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Показывается в общем списке</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Прямой контакт через WhatsApp</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                disabled={currentMaster.tariff === 'free'}
                onClick={() => changeMasterTariff(currentMaster.id, 'free')}
                className="mt-6 w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {currentMaster.tariff === 'free'
                  ? language === 'ru'
                    ? 'Активен'
                    : 'Иштеп жатат'
                  : language === 'ru'
                    ? 'Выбрать бесплатный'
                    : 'Акысызга өтүү'}
              </button>
            </div>

            {/* Pro */}
            <div
              className={`bg-white rounded-2xl p-6 border-2 transition-all flex flex-col justify-between relative ${
                currentMaster.tariff === 'pro'
                  ? 'border-indigo-600 ring-2 ring-indigo-600/20 shadow-md'
                  : 'border-indigo-200 shadow-sm'
              }`}
            >
              <div className="absolute -top-3 right-6 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                Популярный
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">
                    Pro тариф
                  </span>
                  {currentMaster.tariff === 'pro' && (
                    <span className="text-[10px] bg-indigo-100 text-indigo-900 font-black uppercase tracking-wider px-2 py-0.5 rounded">
                      {language === 'ru' ? 'Текущий' : 'Учурдагы'}
                    </span>
                  )}
                </div>
                <div className="text-3xl font-black text-slate-900">
                  990 <span className="text-xs font-bold text-slate-500">сом / месяц</span>
                </div>
                <ul className="mt-6 space-y-3 text-xs text-slate-700">
                  <li className="flex items-center gap-2 font-semibold">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Мастер показывается выше других</span>
                  </li>
                  <li className="flex items-center gap-2 font-semibold">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Значок «Рекомендуемый мастер»</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>До 10 фотографий работ</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Выделенная рамка карточки</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => changeMasterTariff(currentMaster.id, 'pro')}
                className="mt-6 w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                {currentMaster.tariff === 'pro'
                  ? language === 'ru'
                    ? 'Активен (Продлить)'
                    : 'Иштеп жатат'
                  : language === 'ru'
                    ? 'Подключить Pro за 990 сом'
                    : 'Pro кошуу (990 сом)'}
              </button>
            </div>

            {/* Premium */}
            <div
              className={`bg-slate-900 text-white rounded-2xl p-6 border-2 transition-all flex flex-col justify-between ${
                currentMaster.tariff === 'premium'
                  ? 'border-indigo-400 ring-2 ring-indigo-400/30 shadow-lg'
                  : 'border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5" />
                    Premium тариф
                  </span>
                  {currentMaster.tariff === 'premium' && (
                    <span className="text-[10px] bg-indigo-500 text-white font-black uppercase tracking-wider px-2 py-0.5 rounded">
                      {language === 'ru' ? 'Текущий' : 'Учурдагы'}
                    </span>
                  )}
                </div>
                <div className="text-3xl font-black text-white">
                  1990 <span className="text-xs font-bold text-slate-400">сом / месяц</span>
                </div>
                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2 font-bold text-white">
                    <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Максимальный приоритет №1 в поиске</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Значок «TOP мастер» + VIP статус</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Неограниченное портфолио работ</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Личный менеджер поддержки 24/7</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => changeMasterTariff(currentMaster.id, 'premium')}
                className="mt-6 w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-indigo-500 hover:bg-indigo-400 text-white shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
              >
                {currentMaster.tariff === 'premium'
                  ? language === 'ru'
                    ? 'Активен (Продлить)'
                    : 'Иштеп жатат'
                  : language === 'ru'
                    ? 'Подключить Premium за 1990 сом'
                    : 'Premium кошуу (1990 сом)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
