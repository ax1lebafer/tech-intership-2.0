import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IRealEstateData } from '../../../types/advertisement.ts';
import {
  ACTION_CREATE_REAL_ESTATE,
  ACTION_GET_REAL_ESTATE,
} from './constants.ts';
import { ICreateRealEstateData } from './types.ts';

export const getRealEstateAsync = createAsyncThunk(
  ACTION_GET_REAL_ESTATE,
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IRealEstateData[]>('/api/items');

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
