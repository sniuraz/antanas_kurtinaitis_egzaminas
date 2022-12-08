import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setHeaders, url } from './api';
import { toast } from 'react-toastify';

const initialState = {
  items: [],
  status: null,
  createStatus: null,
};

export const productsFetch = createAsyncThunk('products/productsFetch', async () => {
  try {
    const response = await axios.get(`${url}/products`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const productsCreate = createAsyncThunk('products/productsCreate', async (values) => {
  try {
    const response = await axios.post(`${url}/products`, values, setHeaders());

    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: 'bottom-center',
    });
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = 'pending';
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = 'rejected';
    },
    [productsCreate.pending]: (state, action) => {
      state.createStatus = 'pending';
    },
    [productsCreate.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.createStatus = 'success';
      toast.success('Prekė sukurta!', {
        position: 'bottom-center',
      });
    },
    [productsCreate.rejected]: (state, action) => {
      state.createStatus = 'rejected';
    },
  },
});

export default productsSlice.reducer;
