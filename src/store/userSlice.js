import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {rootUrl} from '../constants/config';
import images from '../constants/images';
import {useStorage} from '../hooks/useStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: {
    token: '',
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    profile: '',
  },
  isLoading: false,
  position: {},
  initPosition: {},
  error: '',
};

export const loginUser = createAsyncThunk('user/login', async params => {
  const res = await axios.get(`${rootUrl}login`, params);
  const data = await res.data;

  AsyncStorage.setItem('user', JSON.stringify(data));

  return data;
});

export const loginUserLocal = createAsyncThunk('user/loginLocal', async () => {
  try {
    const res = await AsyncStorage.getItem('user');
    const data = JSON.parse(res);
    return data;
  } catch (e) {
    return {};
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: state => {
      state.user = {...state.user, token: ''};
      AsyncStorage.setItem('user', JSON.stringify(state.user));
    },
    updateCurPosition: (state, position) => {
      state.position = position.payload;
    },
    updateInitPosition: (state, position) => {
      state.initPosition = position.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = {...action.payload, profile: images.profile};
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(loginUserLocal.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loginUserLocal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = {...action.payload, profile: images.profile};
    });
    builder.addCase(loginUserLocal.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {updateCurPosition, updateInitPosition, clearUser} =
  userSlice.actions;
export default userSlice.reducer;
