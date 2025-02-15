import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IAdvertisementData } from '../../../types/advertisement.ts';
import {
  ACTION_CREATE_REAL_ESTATE,
  ACTION_GET_ADVERTISEMENTS,
} from './constants.ts';
import { ICreateRealEstateData } from './types.ts';

export const getAdvertisementsAsync = createAsyncThunk(
  ACTION_GET_ADVERTISEMENTS,
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IAdvertisementData[]>('/api/items');

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createRealEstateAsync = createAsyncThunk(
  ACTION_CREATE_REAL_ESTATE,
  async (data: ICreateRealEstateData, thunkAPI) => {
    try {
      const response = await axios.post('/api/items', data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
