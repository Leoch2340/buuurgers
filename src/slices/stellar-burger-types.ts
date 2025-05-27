import { TLoginData, TRegisterData } from '../utils/burger-api';
import {
  TConstructorIngredient,
  TIngredient,
  TOrder,
  TUser
} from '@utils-types';

export type TConstructorItems = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export type TInitialState = {
  ingredients: TIngredient[];
  loading: boolean;
  orderModalData: TOrder | null;
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  user: TUser;
  orders: TOrder[];
  totalOrders: number;
  ordersToday: number;
  userOrders: TOrder[] | null;
  isAuthenticated: boolean;
  isInit: boolean;
  isModalOpened: boolean;
  errorText: string;
};

export const initialState: TInitialState = {
  ingredients: [],
  loading: false,
  orderModalData: null,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  user: {
    name: '',
    email: ''
  },
  orders: [],
  totalOrders: 0,
  ordersToday: 0,
  userOrders: null,
  isAuthenticated: false,
  isInit: false,
  isModalOpened: false,
  errorText: ''
};
