import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdvertisementsState } from './types.ts';
import {
  createRealEstateAsync,
  getRealEstateAsync,
} from '../../actions/Advertisement';
import { IRealEstateData } from '../../../types/advertisement.ts';

const initialState: IAdvertisementsState = {
  realEstate: null,
  loading: false,
  error: null,
};

const advertisementsSlice = createSlice({
  name: 'advertisements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRealEstateAsync.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(
        getRealEstateAsync.fulfilled,
        (state, action: PayloadAction<IRealEstateData[]>) => {
          state.error = null;
          state.loading = false;
          state.realEstate = action.payload;
        }
      )
      .addCase(
        getRealEstateAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
        }
      )
      .addCase(createRealEstateAsync.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(createRealEstateAsync.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(
        createRealEstateAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const advertisementsReducer = advertisementsSlice.reducer;
