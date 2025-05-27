//Тесты для работы с данными

import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import stellarBurgerSlice, {
  closeOrderRequest,
  removeOrders,
  removeUserOrders,
  init,
  selectIsInit,
  selectOrderRequest,
  selectOrderModalData,
  selectConstructorItems,
  selectOrders,
  selectUserOrders
} from '../stellar-burger-slice';
import { mockStore } from '../mockData';

function initStore() {
  return configureStore({
    reducer: { stellarBurger: stellarBurgerSlice },
    preloadedState: { stellarBurger: mockStore }
  });
}

describe('Тесты редьюсеров работы с данными', () => {
  test('Закрытие запроса на заказ', () => {
    const store = initStore();
    store.dispatch(closeOrderRequest());

    expect(selectOrderRequest(store.getState())).toBe(false);
    expect(selectOrderModalData(store.getState())).toBe(null);
    expect(selectConstructorItems(store.getState())).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('Удаление заказов', () => {
    const store = initStore();
    const initialOrders = selectOrders(store.getState()).length;
    store.dispatch(removeOrders());
    expect(selectOrders(store.getState()).length).toBe(0);
    expect(initialOrders).toBe(2);
  });

  test('Удаление заказов пользователя', () => {
    const store = initStore();
    const initialOrders = selectUserOrders(store.getState())!.length;
    store.dispatch(removeUserOrders());
    expect(selectUserOrders(store.getState())).toBe(null);
    expect(initialOrders).toBe(2);
  });

  test('Инициализация приложения', () => {
    const store = initStore();
    expect(selectIsInit(store.getState())).toBe(false);
    store.dispatch(init());
    expect(selectIsInit(store.getState())).toBe(true);
  });

  test('Редьюсер не мутирует состояние при неизвестном экшене', () => {
    const store = initStore();
    const initialState = store.getState().stellarBurger;

    store.dispatch({ type: 'UNKNOWN_ACTION' });
    const newState = store.getState().stellarBurger;

    expect(newState).toEqual(initialState);
    expect(newState).toBe(initialState);
  });
});
