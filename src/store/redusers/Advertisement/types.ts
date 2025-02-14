import { IRealEstateData } from '../../../types/advertisement.ts';

export interface IAdvertisementsState {
  realEstate: IRealEstateData[] | null;
  loading: boolean;
  error: string | null;
}
