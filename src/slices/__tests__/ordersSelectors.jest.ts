//Тесты селекторов заказов

import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { mockStore } from '../mockData';
import stellarBurgerSlice, {
  selectOrders,
  selectTotalOrders,
  selectTodayOrders,
  selectUserOrders
} from '../stellar-burger-slice';

const store = configureStore({
  reducer: { stellarBurger: stellarBurgerSlice },
  preloadedState: { stellarBurger: mockStore }
});

describe('Тесты селекторов заказов', () => {
  test('selectOrders возвращает список заказов', () => {
    const orders = selectOrders(store.getState());
    expect(orders).toEqual(mockStore.orders);
  });

  test('selectTotalOrders возвращает общее количество заказов', () => {
    const totalOrders = selectTotalOrders(store.getState());
    expect(totalOrders).toBe(73600);
  });

  test('selectTodayOrders возвращает количество заказов за сегодня', () => {
    const todayOrders = selectTodayOrders(store.getState());
    expect(todayOrders).toBe(10);
  });

  test('selectUserOrders возвращает заказы пользователя', () => {
    const userOrders = selectUserOrders(store.getState());
    expect(userOrders).toEqual(mockStore.userOrders);
  });
});
