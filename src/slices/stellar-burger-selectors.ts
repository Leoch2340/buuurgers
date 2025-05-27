import { TInitialState } from './stellar-burger-types';

export const selectIngredients = (state: { stellarBurger: TInitialState }) =>
  state.stellarBurger.ingredients;

export const selectLoading = (state: { stellarBurger: TInitialState }) =>
  state.stellarBurger.loading;

export const selectOrderModalData = (state: { stellarBurger: TInitialState }) =>
  state.stellarBurger.orderModalData;

export const selectConstructorItems = (state: {
  stellarBurger: TInitialState;
}) => state.stellarBurger.constructorItems;

export const selectOrderRequest = (state: { stellarBurger: TInitialState }) =>
  state.stellarBurger.orderRequest;

export const selectUser = (state: { stellarBurger: TInitialState }) =>
  state.stellarBurger.user;

export const selectOrders = (state: { stellarBurger: TInitialState }) =>
  state.stellarBurger.orders;

export const selectTotalOrders = (state: { stellarBurger: TInitialState }) =>
  state.stellarBurger.totalOrders;

export const selectTodayOrders = (state: { stellarBurger: TInitialState }) =>
  state.stellarBurger.ordersToday;

export const selectUserOrders = (state: { stellarBurger: TInitialState }) =>
  state.stellarBurger.userOrders;

export const selectIsAuthenticated = (state: {
  stellarBurger: TInitialState;
}) => state.stellarBurger.isAuthenticated;

export const selectIsInit = (state: { stellarBurger: TInitialState }) =>
  state.stellarBurger.isInit;

export const selectIsModalOpened = (state: { stellarBurger: TInitialState }) =>
  state.stellarBurger.isModalOpened;

export const selectErrorText = (state: { stellarBurger: TInitialState }) =>
  state.stellarBurger.errorText;
