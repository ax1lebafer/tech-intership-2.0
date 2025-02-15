import { IAdvertisementData } from '../../../types/advertisement.ts';

export interface IAdvertisementsState {
  advertisements: IAdvertisementData[] | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}
