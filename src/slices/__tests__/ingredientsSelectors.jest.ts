//Тесты селекторов ингредиентов

import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { mockStore } from '../mockData';
import stellarBurgerSlice, {
  selectIngredients,
  selectConstructorItems,
  selectOrderModalData
} from '../stellar-burger-slice';

const store = configureStore({
  reducer: { stellarBurger: stellarBurgerSlice },
  preloadedState: { stellarBurger: mockStore }
});

describe('Тесты селекторов ингредиентов', () => {
  test('selectIngredients возвращает список ингредиентов', () => {
    const ingredients = selectIngredients(store.getState());
    expect(ingredients).toEqual(mockStore.ingredients);
  });

  test('selectConstructorItems возвращает ингредиенты конструктора', () => {
    const constructorItems = selectConstructorItems(store.getState());
    expect(constructorItems).toEqual(mockStore.constructorItems);
  });

  test('selectOrderModalData возвращает данные модального окна заказа', () => {
    const orderModalData = selectOrderModalData(store.getState());
    expect(orderModalData).toEqual(mockStore.orderModalData);
  });
});
