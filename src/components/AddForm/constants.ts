import { IAddFormValues } from './types.ts';

export const INITIAL_ADD_FORM_VALUES: IAddFormValues = {
  name: '',
  description: '',
  location: '',
  photo: '',
  type: '',
  propertyType: '',
  area: null,
  rooms: null,
  price: null,
  brand: '',
  model: '',
  year: null,
  mileage: null,
  serviceType: '',
  experience: null,
  cost: null,
  workSchedule: '',
};

export const CATEGORY_OPTIONS = [
  { label: 'Недвижимость', value: 'real_estate' },
  { label: 'Авто', value: 'auto' },
  { label: 'Услуги', value: 'services' },
];
