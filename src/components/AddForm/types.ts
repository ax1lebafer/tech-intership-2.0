export interface IAddFormProps {}

export interface IAddFormValues {
  id?: number | null;
  name: string;
  description: string;
  location: string;
  photo: string;
  type: string;
  propertyType: string;
  area: number | null;
  rooms: number | null;
  price: number | null;
  brand: string;
  model: string;
  year: number | null;
  mileage: number | null;
  serviceType: string;
  experience: number | null;
  cost: number | null;
  workSchedule: string;
}

export interface IErrorsValues {
  name: boolean;
  description: boolean;
  location: boolean;
  type: boolean;

  propertyType: boolean;
  area: boolean;
  rooms: boolean;
  price: boolean;

  brand: boolean;
  model: boolean;
  year: boolean;
  mileage: boolean;

  serviceType: boolean;
  experience: boolean;
  cost: boolean;
  workSchedule: boolean;
}
