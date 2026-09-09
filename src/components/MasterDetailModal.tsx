import React, { useState } from 'react';
import { Master, MasterReview } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  MapPin,
  Phone,
  MessageSquare,
  Award,
  CheckCircle,
  Briefcase,
  Clock,
  Send,
  Image as ImageIcon,
  Check,
  ChevronRight
} from 'lucide-react';

interface MasterDetailModalProps {
  master: Master;
  onClose: () => void;
}

export const MasterDetailModal: React.FC<MasterDetailModalProps> = ({ master, onClose }) => {
  const { language, t, categories, cities, reviews, addReview } = useApp();

  const category = categories.find((c) => c.id === master.categoryId);
  const city = cities.find((c) => c.id === master.cityId);
  const masterReviews = reviews.filter((r) => r.masterId === master.id && r.approved);

  // Form for leaving a review
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerPhone, setReviewerPhone] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Fullscreen photo preview
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const cleanWaNumber = master.whatsapp.replace(/\D/g, '');
  const waDefaultText = encodeURIComponent(
    language === 'ru'
      ? `Здравствуйте, ${master.name}! Нашел ваш контакт на сайте Мастер Тап. Хочу проконсультироваться по поводу услуги.`
      : `Саламатсызбы, ${master.name}! Сиздин номериңизди Мастер Тап сайтынан көрдүм. Кызмат боюнча кайрылып жатам.`
  );
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${waDefaultText}`;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    addReview({
      masterId: master.id,
      clientName: reviewerName.trim(),
      clientPhone: reviewerPhone.trim(),
      rating: reviewRating,
      text: reviewComment.trim()
    });

    setReviewSubmitted(true);
    setReviewerName('');
    setReviewerPhone('');
    setReviewComment('');
    setTimeout(() => {
      setShowReviewForm(false);
      setReviewSubmitted(false);
    }, 2000);
  };

  const isPro = master.tariff === 'pro' || master.tariff === 'premium';

  return (
    <div
      id="master-detail-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4"
    >
      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Hero */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 border-b-4 border-indigo-600">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative">
              <img
                src={master.avatar}
                alt={master.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-indigo-500 shadow-md bg-slate-800"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full ring-2 ring-slate-900">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-indigo-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-lg">
                  {category ? (language === 'ru' ? category.nameRu : category.nameKy) : ''}
                </span>
                {isPro && (
                  <span className="bg-indigo-500/20 border border-indigo-400 text-indigo-300 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    {t.recommendedBadge}
                  </span>
                )}
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {master.experienceYears} {t.experienceYears}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">{master.name}</h2>

              {/* Rating & Location */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-bold uppercase tracking-wider">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-white font-black">{master.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">
                    ({master.reviewsCount} {t.reviewsWord})
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  <span>
                    {city ? (language === 'ru' ? city.nameRu : city.nameKy) : ''}
                    {master.district && `, ${master.district}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Contact Row inside Header */}
          <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="modal-wa-button"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>{t.whatsappBtn}</span>
            </a>

            <a
              href={`tel:${master.phone}`}
              id="modal-call-button"
              className="bg-white hover:bg-slate-100 text-slate-900 font-black uppercase tracking-wider text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <Phone className="w-4 h-4 text-indigo-600" />
              <span>
                {t.callBtn}: {master.phone}
              </span>
            </a>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
          {/* Section: Описание */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2.5 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span>{language === 'ru' ? 'О мастере' : 'Уста жөнүндө'}</span>
            </h3>
            <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200">
              {master.bio}
            </p>
          </div>

          {/* Section: Услуги и цены */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">
                {t.servicesAndPrices}
              </h3>
              <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg">
                {t.fromPrice} {master.minPrice} {t.som}
              </span>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {master.services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-3.5 sm:px-4 flex items-center justify-between text-xs sm:text-sm hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-800">{srv.title}</span>
                  <div className="text-right font-black text-slate-900 shrink-0 ml-4">
                    {srv.price} {t.som}
                    {srv.unit && <span className="text-[11px] font-medium text-slate-500"> / {srv.unit}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Фото выполненных работ */}
          {master.workPhotos && master.workPhotos.length > 0 && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-indigo-600" />
                <span>{t.completedWorks}</span>
                <span className="text-xs text-slate-400 font-bold">({master.workPhotos.length})</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {master.workPhotos.map((photo, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActivePhoto(photo)}
                    className="relative aspect-4/3 rounded-xl overflow-hidden border border-slate-200 group focus:outline-none cursor-pointer"
                  >
                    <img
                      src={photo}
                      alt={`Работа ${i + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-black uppercase tracking-wider">
                      {language === 'ru' ? 'Увеличить' : 'Чоңойтуу'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section: Отзывы и форма отправки */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">{t.clientReviews}</h3>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                  {masterReviews.length}{' '}
                  {language === 'ru' ? 'проверенных отзывов' : 'текшерилген пикир'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl border border-indigo-200 transition-colors self-start sm:self-auto cursor-pointer"
              >
                {showReviewForm
                  ? language === 'ru'
                    ? 'Скрыть форму'
                    : 'Форманы жабуу'
                  : t.leaveReviewBtn}
              </button>
            </div>

            {/* Leave Review Form */}
            {showReviewForm && (
              <form
                onSubmit={handleSubmitReview}
                className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 mb-6 space-y-4"
              >
                <h4 className="font-black text-sm uppercase tracking-tight text-slate-900">{t.leaveReviewTitle}</h4>

                {reviewSubmitted ? (
                  <div className="bg-emerald-100 text-emerald-900 p-3 rounded-xl flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{t.reviewSuccess}</span>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                          {t.yourName} *
                        </label>
                        <input
                          type="text"
                          required
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          placeholder="Азамат"
                          className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                          {language === 'ru' ? 'Номер телефона' : 'Телефон номери'}
                        </label>
                        <input
                          type="text"
                          value={reviewerPhone}
                          onChange={(e) => setReviewerPhone(e.target.value)}
                          placeholder="+996 700 000 000"
                          className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                    </div>

                    {/* Star rating picker */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
                        {t.yourRating} *
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= reviewRating ? 'fill-amber-400' : 'text-slate-300'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-black text-slate-700 ml-2">
                          {reviewRating} из 5
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                        {t.reviewText} *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder={t.reviewPlaceholder}
                        className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-indigo-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-wider text-xs px-6 py-3 rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t.sendReview}</span>
                    </button>
                  </>
                )}
              </form>
            )}

            {/* Existing Reviews List */}
            {masterReviews.length === 0 ? (
              <p className="text-xs text-slate-500 italic">
                {language === 'ru'
                  ? 'Пока нет отзывов. Вы можете стать первым, кто оставит отзыв об этом специалисте!'
                  : 'Азырынча пикир жок. Сиз биринчи болуп пикир калтыра аласыз!'}
              </p>
            ) : (
              <div className="space-y-3">
                {masterReviews.map((rev) => (
                  <div key={rev.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{rev.clientName}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium">
                          {language === 'ru' ? 'Заказчик' : 'Кардар'}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">{rev.date}</span>
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

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{rev.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sticky bottom on mobile: Direct buttons */}
        <div className="sm:hidden p-3 bg-white border-t border-slate-200 flex gap-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-600 text-white font-black uppercase tracking-wider text-[11px] py-3 rounded-xl flex items-center justify-center gap-1 shadow-2xs"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>WhatsApp</span>
          </a>
          <a
            href={`tel:${master.phone}`}
            className="flex-1 bg-slate-900 text-white font-black uppercase tracking-wider text-[11px] py-3 rounded-xl flex items-center justify-center gap-1 shadow-2xs"
          >
            <Phone className="w-4 h-4 text-indigo-400" />
            <span>{t.callBtn}</span>
          </a>
        </div>
      </div>

      {/* Lightbox photo viewer */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
        >
          <img
            src={activePhoto}
            alt="Увеличенное фото"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
          <button
            type="button"
            onClick={() => setActivePhoto(null)}
            className="absolute top-4 right-4 text-white bg-white/20 p-2 rounded-full hover:bg-white/40"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
