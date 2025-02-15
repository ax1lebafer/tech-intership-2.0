import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdvertisementsState } from './types.ts';
import {
  createAdvertisementAsync,
  getAdvertisementByIdAsync,
  getAdvertisementsAsync,
} from '../../actions/Advertisement';
import { IAdvertisementData } from '../../../types/advertisement.ts';

const initialState: IAdvertisementsState = {
  advertisements: null,
  advertisement: null,
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
      .addCase(createAdvertisementAsync.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(createAdvertisementAsync.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
        state.success = true;
      })
      .addCase(
        createAdvertisementAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        }
      )
      .addCase(getAdvertisementByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.advertisement = null;
      })
      .addCase(
        getAdvertisementByIdAsync.fulfilled,
        (state, action: PayloadAction<IAdvertisementData>) => {
          state.loading = false;
          state.error = null;
          state.advertisement = action.payload;
        }
      )
      .addCase(
        getAdvertisementByIdAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.advertisement = null;
        }
      );
  },
});

export const advertisementsReducer = advertisementsSlice.reducer;
