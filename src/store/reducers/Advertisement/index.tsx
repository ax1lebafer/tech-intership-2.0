import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdvertisementsState } from './types.ts';
import {
  createRealEstateAsync,
  getAdvertisementsAsync,
} from '../../actions/Advertisement';
import { IAdvertisementData } from '../../../types/advertisement.ts';

const initialState: IAdvertisementsState = {
  advertisements: null,
  loading: false,
  error: null,
  success: false,
};

const advertisementsSlice = createSlice({
  name: 'advertisements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdvertisementsAsync.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(
        getAdvertisementsAsync.fulfilled,
        (state, action: PayloadAction<IAdvertisementData[]>) => {
          state.error = null;
          state.loading = false;
          state.advertisements = action.payload;
        }
      )
      .addCase(
        getAdvertisementsAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
        }
      )
      .addCase(createRealEstateAsync.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(createRealEstateAsync.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.success = true;
      })
      .addCase(
        createRealEstateAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        }
      );
  },
});

export const advertisementsReducer = advertisementsSlice.reducer;
