import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {rootUrl} from '../constants/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {calcDistance} from '../utils/utils';

const initialState = {
  customers: [],
  customersOffline: [],
  customer: {},
  customerAdded: false,
  isLoading: false,
  error: '',
};

const SORTING = {ALPHABET: 'A', DISTANCE: 'D'};

export const getCustomers = createAsyncThunk(
  'customers/getCustomers',
  async () => {
    const res = await axios.get(`${rootUrl}getCustomers`);
    const data = await res.data;
    return data;
  },
);
export const getCustomerById = createAsyncThunk(
  'customers/getCustomerById',
  async userId => {
    const res = await axios.get(`${rootUrl}getCustomer/${userId}`);
    const data = await res.data;
    return data;
  },
);
export const getCustomersOffline = createAsyncThunk(
  'customers/getCustomersOffline',
  async () => {
    try {
      const res = await AsyncStorage.getItem('customersOffline');
      const data = JSON.parse(res);
      return data;
    } catch (e) {
      return [];
    }
  },
);

export const addCustomer = createAsyncThunk(
  'customers/addCustomer',
  async customer => {
    const res = await axios.post(`${rootUrl}addCustomer/`, {...customer});
    const data = await res.data;
    if (data.message && data.message === 'successful') {
      return {...customer, name: customer.fullName};
    } else {
      return false;
    }
  },
);
const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    updateName: (state, fullName) => {
      state.customer.name = fullName.payload;
    },
    updateEmail: (state, email) => {
      state.customer.email = email.payload;
    },
    updateAge: (state, age) => {
      state.customer.age = age.payload;
    },
    updatePhone: (state, phone) => {
      state.customer.phone = phone.payload;
    },
    updateCustomer: (state, customer) => {
      state.customer = {...state.customer, ...customer.payload};
    },
    updateCustomers: (state, customer) => {
      state.customers = [...state.customers, customer.payload];
    },
    clearCustomerAdded: state => {
      state.customerAdded = false;
    },
    clearCustomer: state => {
      state.customer = {};
    },
    updateCustomersSort: (state, sort) => {
      if (sort.payload.sort === SORTING.ALPHABET) {
        state.customers.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        );
      } else {
        const userPosition = sort.payload.curPosition;
        state.customers.sort((a, b) => {
          const distA = calcDistance(userPosition, a.location);
          const distB = calcDistance(userPosition, b.location);
          return distA - distB;
        });
      }
    },
    updateCustomerOffline: (state, customer) => {
      if (state.customersOffline.length) {
        const index = state.customersOffline.findIndex(
          c => c.id === customer.payload.id,
        );

        if (index >= 0) {
          state.customersOffline.splice(index, 1);
          state.customersOffline.push(customer.payload);
        } else {
          state.customersOffline.push(customer.payload);
        }
      } else {
        state.customersOffline = [customer.payload];
      }

      AsyncStorage.setItem(
        'customersOffline',
        JSON.stringify(state.customersOffline),
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(getCustomers.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.customers = action.payload;
    });
    builder.addCase(getCustomers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getCustomerById.pending, state => {
      state.customer = {};
      state.error = '';
      state.isLoading = true;
    });
    builder.addCase(getCustomerById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.customer = action.payload;
    });
    builder.addCase(getCustomerById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getCustomersOffline.pending, state => {});
    builder.addCase(getCustomersOffline.fulfilled, (state, action) => {
      state.customersOffline = action.payload ? action.payload : [];
    });
    builder.addCase(getCustomersOffline.rejected, (state, action) => {});
    builder.addCase(addCustomer.pending, state => {
      state.isLoading = true;
      state.customerAdded = false;
    });
    builder.addCase(addCustomer.fulfilled, (state, action) => {
      state.isLoading = false;
      if (!action.payload) {
        state.error = 'Failed to add the customer';
        state.customerAdded = false;
      } else {
        state.customers = [
          {...action.payload, id: state.customers.length},
          ...state.customers,
        ];
        state.error = '';
        state.customerAdded = true;
      }
    });
    builder.addCase(addCustomer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.customerAdded = false;
    });
  },
});

export const {
  updateName,
  updateAge,
  updateEmail,
  updatePhone,
  updateCustomer,
  updateCustomers,
  updateCustomerOffline,
  updateCustomersSort,
  clearCustomerAdded,
  clearCustomer,
} = customerSlice.actions;

export default customerSlice.reducer;
