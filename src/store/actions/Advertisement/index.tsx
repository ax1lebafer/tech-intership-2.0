import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IAdvertisementData } from '../../../types/advertisement.ts';
import {
  ACTION_CREATE_ADVERTISEMENT,
  ACTION_GET_ADVERTISEMENT_BY_ID,
  ACTION_GET_ADVERTISEMENTS,
  ACTION_UPDATE_ADVERTISEMENT,
} from './constants.ts';
import { ICreateAdvertisementData, IUpdateAdvertisementData } from './types.ts';

export const getAdvertisementsAsync = createAsyncThunk(
  ACTION_GET_ADVERTISEMENTS,
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IAdvertisementData[]>('/api/items');

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.error || 'Error');
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

export const createAdvertisementAsync = createAsyncThunk(
  ACTION_CREATE_ADVERTISEMENT,
  async (data: ICreateAdvertisementData, thunkAPI) => {
    try {
      const response = await axios.post('/api/items', data);

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.error || 'Error');
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

export const getAdvertisementByIdAsync = createAsyncThunk(
  ACTION_GET_ADVERTISEMENT_BY_ID,
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get(`/api/items/${id}`);

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.error || 'Error');
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

export const updateAdvertisementAsync = createAsyncThunk(
  ACTION_UPDATE_ADVERTISEMENT,
  async (args: IUpdateAdvertisementData, thunkAPI) => {
    const { id, ...rest } = args;

    try {
      const response = await axios.put(`/api/items/${id}`, rest);

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.error || 'Error');
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  }
);
