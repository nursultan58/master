import { ServiceCategory, City, Master, MasterReview } from '../types';
import { allKyrgyzstanCities, kyrgyzstanRegions } from './regionsData';

export { kyrgyzstanRegions };

export const initialCategories: ServiceCategory[] = [
  {
    id: 'cat-plumbing',
    slug: 'plumbing',
    nameRu: 'Сантехник',
    nameKy: 'Суу түтүкчү',
    iconName: 'Wrench',
    isPopular: true,
    descriptionRu: 'Устранение засоров, замена труб, смесителей, радиаторов, установка ванн и унитазов',
    descriptionKy: 'Түтүктөрдү тазалоо, алмаштыруу, крандарды жана унитаздарды орнотуу'
  },
  {
    id: 'cat-electrician',
    slug: 'electrician',
    nameRu: 'Электрик',
    nameKy: 'Электрик',
    iconName: 'Zap',
    isPopular: true,
    descriptionRu: 'Монтаж электропроводки, замена автоматов, люстр, розеток, устранение замыканий',
    descriptionKy: 'Электр зымдарын тартуу, розетка, люстра орнотуу, кыска туташууну жоюу'
  },
  {
    id: 'cat-renovation',
    slug: 'renovation',
    nameRu: 'Ремонт квартир',
    nameKy: 'Батирлерди оңдоо',
    iconName: 'Home',
    isPopular: true,
    descriptionRu: 'Комплексный ремонт под ключ, выравнивание стен, стяжка полов, гипсокартон',
    descriptionKy: 'Батирлерди толук оңдоо, дубалдарды түзөө, пол куюу, гипсокартон'
  },
  {
    id: 'cat-cleaning',
    slug: 'cleaning',
    nameRu: 'Клининг',
    nameKy: 'Тазалоо кызматы',
    iconName: 'Sparkles',
    isPopular: true,
    descriptionRu: 'Генеральная уборка, мойка окон, чистка после ремонта, химчистка мебели',
    descriptionKy: 'Жалпы тазалоо, терезе жуу, оңдоодон кийинки тазалоо, эмерек химиялык тазалоо'
  },
  {
    id: 'cat-ac',
    slug: 'ac-install',
    nameRu: 'Установка кондиционеров',
    nameKy: 'Кондиционер орнотуу',
    iconName: 'Wind',
    isPopular: true,
    descriptionRu: 'Монтаж, заправка фреоном, чистка и профилактика кондиционеров всех марок',
    descriptionKy: 'Кондиционерлерди орнотуу, фреон куюу, тазалоо жана профилактика'
  },
  {
    id: 'cat-appliances',
    slug: 'appliances-repair',
    nameRu: 'Ремонт бытовой техники',
    nameKy: 'Тиричилик техникасын оңдоо',
    iconName: 'Tv',
    isPopular: true,
    descriptionRu: 'Ремонт стиральных машин, холодильников, микроволновок, бойлеров',
    descriptionKy: 'Кир жуугуч машина, муздаткыч, бойлерлерди оңдоо'
  },
  {
    id: 'cat-furniture',
    slug: 'furniture-assembly',
    nameRu: 'Сборка мебели',
    nameKy: 'Эмерек чогултуу',
    iconName: 'Armchair',
    isPopular: false,
    descriptionRu: 'Сборка кухонь, шкафов-купе, кроватей, комодов и офисной мебели',
    descriptionKy: 'Ашкана эмеректерин, шкаф, керебеттерди чогултуу жана орнотуу'
  },
  {
    id: 'cat-painting',
    slug: 'painting',
    nameRu: 'Малярные работы',
    nameKy: 'Малярдык иштер',
    iconName: 'Paintbrush',
    isPopular: false,
    descriptionRu: 'Покраска стен и потолков, шпаклевка, поклейка обоев, декоративная штукатурка',
    descriptionKy: 'Дубалдарды сырдоо, шпаклевка, обои чаптоо, декоративдик шыбак'
  },
  {
    id: 'cat-welding',
    slug: 'welding',
    nameRu: 'Сварочные работы',
    nameKy: 'Ширетүү иштери',
    iconName: 'Flame',
    isPopular: false,
    descriptionRu: 'Изготовление ворот, решеток, навесов, металлических лестниц, сварка труб',
    descriptionKy: 'Дарбаза, тор, навес, темир тепкичтерди ширетүү жана жасоо'
  },
  {
    id: 'cat-auto',
    slug: 'auto-services',
    nameRu: 'Автоуслуги',
    nameKy: 'Автокызматтар',
    iconName: 'Car',
    isPopular: false,
    descriptionRu: 'Компьютерная диагностика, выездной автоэлектрик, замена масла, ходовая',
    descriptionKy: 'Компьютердик диагностика, автоэлектрик, май алмаштыруу, ходовой оңдоо'
  },
  {
    id: 'cat-media',
    slug: 'photo-video',
    nameRu: 'Фото и видео',
    nameKy: 'Сүрөт жана видео',
    iconName: 'Camera',
    isPopular: false,
    descriptionRu: 'Фотосессии, видеосъемка торжеств (тойлор), монтаж, аэросъемка с дрона',
    descriptionKy: 'Үлпөт тойлорду тартуу, фотосессия, монтаж, дрон менен тартуу'
  },
  {
    id: 'cat-it',
    slug: 'it-services',
    nameRu: 'IT услуги',
    nameKy: 'IT кызматтары',
    iconName: 'Laptop',
    isPopular: false,
    descriptionRu: 'Ремонт ноутбуков и ПК, установка Windows, настройка Wi-Fi, видеонаблюдение',
    descriptionKy: 'Компьютер жана ноутбук оңдоо, Windows орнотуу, Wi-Fi жана камера коюу'
  }
];

export const initialCities: City[] = allKyrgyzstanCities;

export const initialMasters: Master[] = [
  {
    id: 'master-1',
    name: 'Айбек Джумашев',
    phone: '+996 700 123 456',
    whatsapp: '996700123456',
    cityId: 'bishkek',
    district: 'Октябрьский район',
    categoryId: 'cat-plumbing',
    experienceYears: 9,
    bio: 'Профессиональный мастер-сантехник с 9-летним стажем. Быстрый выезд в течение 30-40 минут по Бишкеку. Работаю современным немецким инструментом. Гарантия на все виды работ до 12 месяцев. Устраняю аварийные протечки, устанавливаю смесители, фильтры и отопление.',
    minPrice: 800,
    rating: 4.9,
    reviewsCount: 32,
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
    workPhotos: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&auto=format&fit=crop&q=80'
    ],
    services: [
      { id: 's1', title: 'Устранение засоров труб', price: 800, unit: 'точка' },
      { id: 's2', title: 'Замена смесителя / крана', price: 1000, unit: 'шт' },
      { id: 's3', title: 'Монтаж унитаза / инсталляции', price: 1800, unit: 'шт' },
      { id: 's4', title: 'Установка и подключение бойлера (Аристон)', price: 2000, unit: 'шт' },
      { id: 's5', title: 'Разводка труб полипропиленом', price: 3500, unit: 'точка' }
    ],
    status: 'approved',
    tariff: 'pro',
    isRecommended: true,
    createdAt: '2025-01-15'
  },
  {
    id: 'master-2',
    name: 'Бакыт Асанов',
    phone: '+996 772 987 654',
    whatsapp: '996772987654',
    cityId: 'bishkek',
    district: 'Первомайский район',
    categoryId: 'cat-electrician',
    experienceYears: 11,
    bio: 'Дипломированный инженер-электрик с допуском 4-й группы. Монтаж электросетей в квартирах, новостройках и коммерческих объектах. Поиск скрытой проводки, устранение коротких замыканий, сборка электрощитов с автоматами Schneider Electric.',
    minPrice: 600,
    rating: 5.0,
    reviewsCount: 45,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    workPhotos: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
    ],
    services: [
      { id: 's201', title: 'Диагностика и поиск неисправности проводки', price: 600, unit: 'выезд' },
      { id: 's202', title: 'Установка розеток и выключателей', price: 300, unit: 'шт' },
      { id: 's203', title: 'Монтаж люстры / светильника', price: 800, unit: 'шт' },
      { id: 's204', title: 'Сборка и расключение электрощита', price: 4500, unit: 'комплекс' },
      { id: 's205', title: 'Полная разводка электрики 1-комн. кв.', price: 18000, unit: 'под ключ' }
    ],
    status: 'approved',
    tariff: 'premium',
    isRecommended: true,
    createdAt: '2025-01-10'
  },
  {
    id: 'master-3',
    name: 'Нурлан Мамытов',
    phone: '+996 555 432 109',
    whatsapp: '996555432109',
    cityId: 'bishkek',
    district: 'Свердловский район',
    categoryId: 'cat-ac',
    experienceYears: 7,
    bio: 'Специалист по климатическому оборудованию. Монтаж кондиционеров с алмазным бурением без пыли. Заправка качественным фреоном R410/R32. Антибактериальная мойка внутреннего блока парогенератором. Официальный чек и гарантия 1 год.',
    minPrice: 1500,
    rating: 4.8,
    reviewsCount: 28,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    workPhotos: [
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&auto=format&fit=crop&q=80'
    ],
    services: [
      { id: 's301', title: 'Стандартный монтаж кондиционера (07-12)', price: 4000, unit: 'комплект' },
      { id: 's302', title: 'Чистка и дезинфекция сплит-системы', price: 1500, unit: 'шт' },
      { id: 's303', title: 'Заправка фреоном', price: 2000, unit: 'шт' },
      { id: 's304', title: 'Демонтаж старого кондиционера', price: 1500, unit: 'шт' }
    ],
    status: 'approved',
    tariff: 'pro',
    isRecommended: true,
    createdAt: '2025-02-01'
  },
  {
    id: 'master-4',
    name: 'Асель Бекбоева',
    phone: '+996 705 556 789',
    whatsapp: '996705556789',
    cityId: 'bishkek',
    district: 'Ленинский район',
    categoryId: 'cat-cleaning',
    experienceYears: 6,
    bio: 'Бригада аккуратных специалистов по чистоте. Выполняем генеральную уборку квартир, коттеджей и офисов. Используем гипоаллергенную химию Kiehl (Германия) и технику Karcher. Идеально отмываем окна, духовки, санузлы и швы.',
    minPrice: 2000,
    rating: 4.9,
    reviewsCount: 39,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    workPhotos: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80'
    ],
    services: [
      { id: 's401', title: 'Поддерживающая уборка 1-комн. квартиры', price: 2000, unit: 'услуга' },
      { id: 's402', title: 'Генеральная уборка', price: 60, unit: 'сом / кв.м' },
      { id: 's403', title: 'Уборка после строительного ремонта', price: 80, unit: 'сом / кв.м' },
      { id: 's404', title: 'Мойка стандартных окон', price: 350, unit: 'створка' }
    ],
    status: 'approved',
    tariff: 'pro',
    isRecommended: true,
    createdAt: '2025-01-20'
  },
  {
    id: 'master-5',
    name: 'Азамат Токтогулов',
    phone: '+996 709 881 223',
    whatsapp: '996709881223',
    cityId: 'osh',
    district: 'Сулайман-Тоо',
    categoryId: 'cat-renovation',
    experienceYears: 14,
    bio: 'Мастер по отделке и комплексному ремонту помещений в городе Ош. От демонтажа до чистовой отделки: гипсокартонные потолки, укладка ламината, плитки и кафеля. Работаем с договором и сметой.',
    minPrice: 1200,
    rating: 4.8,
    reviewsCount: 26,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    workPhotos: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80'
    ],
    services: [
      { id: 's501', title: 'Укладка кафеля / керамогранита', price: 900, unit: 'кв.м' },
      { id: 's502', title: 'Выравнивание стен (штукатурка)', price: 400, unit: 'кв.м' },
      { id: 's503', title: 'Монтаж ламината с подложкой', price: 250, unit: 'кв.м' },
      { id: 's504', title: 'Комплексный евроремонт под ключ', price: 4500, unit: 'кв.м' }
    ],
    status: 'approved',
    tariff: 'pro',
    isRecommended: true,
    createdAt: '2025-02-05'
  },
  {
    id: 'master-6',
    name: 'Эмиль Касымов',
    phone: '+996 500 771 992',
    whatsapp: '996500771992',
    cityId: 'bishkek',
    district: 'Октябрьский район',
    categoryId: 'cat-appliances',
    experienceYears: 8,
    bio: 'Срочный ремонт стиральных машин (Samsung, LG, Bosch, Indesit, Beko) и холодильников на дому. Запчасти всегда с собой в машине. Выезд бесплатный при согласии на ремонт. Диагностика в день обращения.',
    minPrice: 500,
    rating: 4.9,
    reviewsCount: 41,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    workPhotos: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80'
    ],
    services: [
      { id: 's601', title: 'Диагностика стиральной машины', price: 500, unit: 'выезд' },
      { id: 's602', title: 'Замена ТЭНа (нагревателя)', price: 1500, unit: 'шт' },
      { id: 's603', title: 'Замена насоса / помпы слива', price: 1400, unit: 'шт' },
      { id: 's604', title: 'Замена подшипников барабана', price: 3500, unit: 'комплекс' }
    ],
    status: 'approved',
    tariff: 'free',
    isRecommended: false,
    createdAt: '2025-02-12'
  },
  {
    id: 'master-7',
    name: 'Руслан Осмонов',
    phone: '+996 703 112 344',
    whatsapp: '996703112344',
    cityId: 'bishkek',
    district: 'Свердловский район',
    categoryId: 'cat-furniture',
    experienceYears: 5,
    bio: 'Аккуратная сборка и разборка корпусной мебели любой сложности. Кухонные гарнитуры с врезкой мойки и варочной панели. Опыт работы на мебельной фабрике 5 лет. Свой профессиональный инструмент.',
    minPrice: 700,
    rating: 4.7,
    reviewsCount: 19,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    workPhotos: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&auto=format&fit=crop&q=80'
    ],
    services: [
      { id: 's701', title: 'Сборка простого комода / тумбы', price: 700, unit: 'шт' },
      { id: 's702', title: 'Сборка шкафа-купе (2-3 створки)', price: 2000, unit: 'шт' },
      { id: 's703', title: 'Сборка кухни с навеской шкафов', price: 1200, unit: 'погонный метр' }
    ],
    status: 'approved',
    tariff: 'free',
    isRecommended: false,
    createdAt: '2025-02-18'
  },
  {
    id: 'master-8',
    name: 'Данияр Садыков',
    phone: '+996 770 998 877',
    whatsapp: '996770998877',
    cityId: 'jalal-abad',
    district: 'Центр',
    categoryId: 'cat-welding',
    experienceYears: 12,
    bio: 'Сварочные работы в Жалал-Абаде. Изготовление ворот, заборов, решеток на окна, навесов для автомобилей. Выезд с генератором на любые объекты без электричества. Высокая прочность швов.',
    minPrice: 1000,
    rating: 4.9,
    reviewsCount: 15,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    workPhotos: [
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80'
    ],
    services: [
      { id: 's801', title: 'Мелкие сварочные работы', price: 1000, unit: 'точка' },
      { id: 's802', title: 'Изготовление металлических ворот', price: 15000, unit: 'комплект' },
      { id: 's803', title: 'Монтаж козырьков и навесов', price: 1200, unit: 'кв.м' }
    ],
    status: 'approved',
    tariff: 'pro',
    isRecommended: true,
    createdAt: '2025-02-22'
  },
  {
    id: 'master-9',
    name: 'Тимур Ибраимов (Ожидает подтверждения)',
    phone: '+996 550 882 110',
    whatsapp: '996550882110',
    cityId: 'bishkek',
    district: 'Первомайский район',
    categoryId: 'cat-it',
    experienceYears: 4,
    bio: 'Настройка компьютеров, ноутбуков, установка Windows 11, чистка от вирусов, замена термопасты. Монтаж видеонаблюдения для дома и магазинов.',
    minPrice: 500,
    rating: 5.0,
    reviewsCount: 0,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    workPhotos: [
      'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=800&auto=format&fit=crop&q=80'
    ],
    services: [
      { id: 's901', title: 'Установка операционной системы Windows', price: 800, unit: 'услуга' },
      { id: 's902', title: 'Чистка ноутбука с заменой термопасты', price: 900, unit: 'шт' }
    ],
    status: 'pending', // Waiting for Admin approval!
    tariff: 'free',
    isRecommended: false,
    createdAt: '2025-03-01'
  }
];

export const initialReviews: MasterReview[] = [
  {
    id: 'rev-1',
    masterId: 'master-1',
    clientName: 'Канатбек',
    rating: 5,
    text: 'Отличный сантехник! Приехал за 25 минут в 7 микрорайон. Быстро заменил смеситель и прочистил сифон. Всё аккуратно, сухо, дал гарантию. Рекомендую!',
    date: '2025-02-28',
    approved: true
  },
  {
    id: 'rev-2',
    masterId: 'master-1',
    clientName: 'Гульмира Э.',
    rating: 5,
    text: 'Айбек помог подключить новый водонагреватель на 80 литров. Очень вежливый специалист, подробно объяснил как пользоваться. Спасибо сервису Мастер Тап!',
    date: '2025-02-14',
    approved: true
  },
  {
    id: 'rev-3',
    masterId: 'master-2',
    clientName: 'Улан Турдубаев',
    rating: 5,
    text: 'Бакыт байке — мастер высшего класса. Делал проводку в 3-комнатной квартире в Асанбае. Рассчитал нагрузку, посоветовал хорошие автоматы. Все работает идеально.',
    date: '2025-02-20',
    approved: true
  },
  {
    id: 'rev-4',
    masterId: 'master-3',
    clientName: 'Адилет С.',
    rating: 5,
    text: 'Установили сплит-систему быстро и без пыли. Бурение с пылесосом — дома чистота. Настоящий профи.',
    date: '2025-02-18',
    approved: true
  },
  {
    id: 'rev-5',
    masterId: 'master-4',
    clientName: 'Динара',
    rating: 5,
    text: 'Заказывали генеральную уборку после квартирантов. Отмыли плиту до блеска, окна сверкают! Очень довольны качеством.',
    date: '2025-02-25',
    approved: true
  }
];
