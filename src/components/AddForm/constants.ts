import { IAddFormValues, IErrorsValues } from './types.ts';

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

export const INITIAL_ERRORS_VALUES: IErrorsValues = {
  name: false,
  description: false,
  location: false,
  type: false,
  propertyType: false,
  area: false,
  rooms: false,
  price: false,
};
