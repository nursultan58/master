import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  UserPlus,
  Upload,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  Phone,
  MessageSquare
} from 'lucide-react';

interface MasterRegistrationModalProps {
  onClose: () => void;
  onSuccess: (masterId: string) => void;
}

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80'
];

export const MasterRegistrationModal: React.FC<MasterRegistrationModalProps> = ({
  onClose,
  onSuccess
}) => {
  const { language, t, cities, categories, registerMaster } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+996 ');
  const [whatsapp, setWhatsapp] = useState('996');
  const [cityId, setCityId] = useState('bishkek');
  const [district, setDistrict] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cat-plumbing');
  const [experienceYears, setExperienceYears] = useState(5);
  const [bio, setBio] = useState('');
  const [minPrice, setMinPrice] = useState(500);
  const [avatar, setAvatar] = useState(AVATAR_PRESETS[0]);
  const [customAvatar, setCustomAvatar] = useState('');
  const [workPhoto1, setWorkPhoto1] = useState(
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80'
  );
  const [workPhoto2, setWorkPhoto2] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const selectedCityObj = cities.find((c) => c.id === cityId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalAvatar = customAvatar.trim() || avatar;
    const finalPhotos = [workPhoto1, workPhoto2].filter((p) => p.trim().length > 0);

    const cleanWa = whatsapp.replace(/\D/g, '');

    const newId = registerMaster({
      name: name.trim(),
      phone: phone.trim(),
      whatsapp: cleanWa,
      cityId,
      district: district.trim() || (selectedCityObj?.districts[0] || 'Центр'),
      categoryId,
      experienceYears: Number(experienceYears) || 1,
      bio: bio.trim(),
      minPrice: Number(minPrice) || 500,
      avatar: finalAvatar,
      workPhotos: finalPhotos,
      services: [
        {
          id: 'srv-init-1',
          title: language === 'ru' ? 'Выезд и базовая диагностика' : 'Келүү жана диагноз коюу',
          price: Number(minPrice) || 500,
          unit: 'услуга'
        }
      ]
    });

    setSubmittedId(newId);
  };

  return (
    <div
      id="master-registration-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4"
    >
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedId ? (
          /* Success Screen following Section 5 requirement:
             "После регистрации профиль мастера не должен сразу появляться на сайте.
              Сначала администратор должен проверить и подтвердить профиль." */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900">{t.regSuccessTitle}</h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-md mx-auto leading-relaxed">
                {t.regSuccessDesc}
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 text-left space-y-2">
              <div className="flex items-center gap-2 font-black uppercase tracking-wider text-[11px] text-amber-950">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  {language === 'ru'
                    ? 'Статус: Ожидает модерации (Pending)'
                    : 'Абалы: Текшерүүдө (Pending)'}
                </span>
              </div>
              <p className="font-medium leading-relaxed">
                {language === 'ru'
                  ? 'Вы можете войти в Личный кабинет прямо сейчас, настроить прайс-лист на услуги и добавить примеры своих работ.'
                  : 'Сиз азыр эле өз кабинетиңизге кирип, кызматтардын бааларын жана сүрөттөрдү кошсоңуз болот.'}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                id="btn-goto-cabinet-after-reg"
                onClick={() => onSuccess(submittedId)}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                {language === 'ru' ? 'Перейти в личный кабинет' : 'Кабинетке өтүү'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-black uppercase tracking-wider text-xs px-5 py-3.5 rounded-xl transition-all cursor-pointer"
              >
                {language === 'ru' ? 'На главную' : 'Башкы бетке'}
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {language === 'ru'
                    ? 'Бесплатная регистрация для мастеров'
                    : 'Усталар үчүн акысыз катталуу'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900">{t.regTitle}</h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">{t.regSubtitle}</p>
            </div>

            <div className="space-y-4 text-left max-h-[60vh] overflow-y-auto pr-1">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === 'ru' ? 'Айбек Джумашев' : 'Айбек Жумашев'}
                    className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                    {t.phoneNumber} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+996 700 123 456"
                      className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>
              </div>

              {/* WhatsApp Number & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                    {t.whatsappNumber} *
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="996700123456"
                      className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                    {t.yourCategory} *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {language === 'ru' ? cat.nameRu : cat.nameKy}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* City & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                    {t.selectYourCity} *
                  </label>
                  <select
                    value={cityId}
                    onChange={(e) => {
                      const newCityId = e.target.value;
                      setCityId(newCityId);
                      const city = cities.find((c) => c.id === newCityId);
                      if (city && city.districts.length > 0) {
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

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                    {t.yourDistrict} *
                  </label>
                  <input
                    type="text"
                    list="available-districts-list"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder={
                      selectedCityObj?.districts[0] ||
                      (language === 'ru' ? 'Октябрьский район' : 'Борбордук')
                    }
                    className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
                  />
                  <datalist id="available-districts-list">
                    {selectedCityObj?.districts.map((d) => (
                      <option key={d} value={d} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Experience & Min price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                    {t.experienceInput}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="45"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                    {t.minPriceInput} *
                  </label>
                  <input
                    type="number"
                    step="50"
                    min="200"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              {/* Description about me */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                  {t.aboutYou} *
                </label>
                <textarea
                  required
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder={t.aboutPlaceholder}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:border-indigo-600 leading-relaxed"
                />
              </div>

              {/* Avatar Selection */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">
                  {t.selectAvatarPreset}
                </label>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {AVATAR_PRESETS.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setAvatar(url);
                        setCustomAvatar('');
                      }}
                      className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        avatar === url && !customAvatar
                          ? 'border-indigo-600 ring-2 ring-indigo-400/40 scale-105'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={url}
                        alt="Avatar"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                <div className="mt-2.5">
                  <input
                    type="url"
                    value={customAvatar}
                    onChange={(e) => setCustomAvatar(e.target.value)}
                    placeholder={
                      language === 'ru'
                        ? 'Или вставьте прямую ссылку на свое фото...'
                        : 'Же сүрөтүңүздүн шилтемесин жазыңыз...'
                    }
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:bg-white focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              {/* Example work photos */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                  {language === 'ru'
                    ? 'Фотография выполненной работы (URL)'
                    : 'Аткарылган иштин сүрөтү (URL)'}
                </label>
                <input
                  type="url"
                  value={workPhoto1}
                  onChange={(e) => setWorkPhoto1(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:bg-white focus:outline-none focus:border-indigo-600"
                />
              </div>

              {/* Moderation Warning note */}
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-slate-600">
                <AlertCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span className="font-medium">
                  {language === 'ru'
                    ? 'Ваш профиль будет проверен администратором сайта перед публикацией в общем каталоге.'
                    : 'Профилиңиз жалпы каталогго чыгаруудан мурун администратор тарабынан текшерилет.'}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {language === 'ru' ? 'Отмена' : 'Жокко чыгаруу'}
              </button>
              <button
                type="submit"
                id="btn-submit-master-registration"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-wider text-xs px-6 py-3 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>{t.submitRegistration}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
