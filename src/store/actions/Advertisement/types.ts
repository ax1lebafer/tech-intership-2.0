export interface ICreateAdvertisementData {
  name: string;
  description: string;
  location: string;
  type: string;

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

export interface IUpdateAdvertisementData {
  id: number;
  name: string;
  description: string;
  location: string;
  type: string;

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
