import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getIngredientsApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  registerUserApi,
  TLoginData,
  updateUserApi
} from '../utils/burger-api';
import { TInitialState } from './stellar-burger-types';
import { deleteCookie, setCookie } from '../utils/cookie';

// Загрузка ингредиентов
export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

// Создание нового заказа
export const fetchNewOrder = createAsyncThunk(
  'orders/newOrder',
  orderBurgerApi
);

// Логин пользователя
export const fetchLoginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { dispatch, rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      dispatch(getUserThunk());
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Ошибка авторизации');
    }
  }
);

// Регистрация пользователя
export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  registerUserApi
);

// Получение данных пользователя
export const getUserThunk = createAsyncThunk('user/get', getUserApi);

// Получение ленты заказов
export const fetchFeed = createAsyncThunk('user/feed', getFeedsApi);

// Получение заказов пользователя
export const fetchUserOrders = createAsyncThunk('user/orders', getOrdersApi);

// Выход пользователя
export const fetchLogout = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const response = await logoutApi(refreshToken);
      return response;
    }
    return { success: true };
  }
);

// Обновление данных пользователя
export const fetchUpdateUser = createAsyncThunk('user/update', updateUserApi);
