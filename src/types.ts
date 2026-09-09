export type UserRole = 'client' | 'master' | 'admin';
export type MasterStatus = 'pending' | 'approved' | 'rejected' | 'blocked';
export type TariffPlan = 'free' | 'pro' | 'premium';
export type Language = 'ru' | 'ky';

export interface ServiceItem {
  id: string;
  title: string;
  price: number;
  unit?: string; // e.g. 'точка', 'кв.м', 'час', 'услуга'
}

export interface MasterReview {
  id: string;
  masterId: string;
  clientName: string;
  clientPhone?: string;
  rating: number; // 1 - 5
  text: string;
  date: string;
  approved: boolean;
}

export interface Master {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  cityId: string;
  district: string;
  categoryId: string;
  experienceYears: number;
  bio: string;
  minPrice: number;
  rating: number;
  reviewsCount: number;
  avatar: string;
  workPhotos: string[];
  services: ServiceItem[];
  status: MasterStatus;
  tariff: TariffPlan;
  isRecommended: boolean;
  createdAt: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  nameRu: string;
  nameKy: string;
  iconName: string;
  isPopular?: boolean;
  mastersCount?: number;
  descriptionRu?: string;
  descriptionKy?: string;
}

export interface City {
  id: string;
  nameRu: string;
  nameKy: string;
  regionRu?: string;
  regionKy?: string;
  districts: string[];
}

export interface AdministrativeRegion {
  id: string;
  nameRu: string;
  nameKy: string;
  centerRu: string;
  centerKy: string;
  type: 'city_republican' | 'oblast';
  districtsRu: string[];
  districtsKy: string[];
  cities: {
    id: string;
    nameRu: string;
    nameKy: string;
  }[];
}
