export interface IRealEstateData {
  id: number;
  name: string;
  description: string;
  location: string;
  type: string;
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
}

export interface IAdvertisementData {
  id: number;
  name: string;
  description: string;
  location: string;
  photo?: string;
  type?: string;
  propertyType?: string;
  area?: number;
  rooms?: number;
  price?: number;
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  serviceType?: string;
  experience?: number;
  cost?: number;
  workSchedule?: string;
}
