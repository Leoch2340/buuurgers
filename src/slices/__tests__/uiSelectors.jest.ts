//Тесты UI-селекторов

import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { mockStore } from '../mockData';
import stellarBurgerSlice, {
  selectIsInit,
  selectIsModalOpened,
  selectErrorText,
  selectLoading,
  selectOrderRequest
} from '../stellar-burger-slice';

const store = configureStore({
  reducer: { stellarBurger: stellarBurgerSlice },
  preloadedState: { stellarBurger: mockStore }
});

describe('Тесты UI селекторов', () => {
  test('selectIsInit возвращает статус инициализации', () => {
    const isInit = selectIsInit(store.getState());
    expect(isInit).toBe(false);
  });

  test('selectIsModalOpened возвращает статус модального окна', () => {
    const isModalOpened = selectIsModalOpened(store.getState());
    expect(isModalOpened).toBe(false);
  });

  test('selectErrorText возвращает текст ошибки', () => {
    const errorText = selectErrorText(store.getState());
    expect(errorText).toBe('test error ......');
  });

  test('selectLoading возвращает статус загрузки', () => {
    const loading = selectLoading(store.getState());
    expect(loading).toBe(false);
  });

  test('selectOrderRequest возвращает статус запроса заказа', () => {
    const orderRequest = selectOrderRequest(store.getState());
    expect(orderRequest).toBe(false);
  });
});
