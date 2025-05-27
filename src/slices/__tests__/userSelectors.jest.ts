//Тесты селекторов пользователя

import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { mockStore } from '../mockData';
import stellarBurgerSlice, {
  selectUser,
  selectIsAuthenticated
} from '../stellar-burger-slice';

const store = configureStore({
  reducer: { stellarBurger: stellarBurgerSlice },
  preloadedState: { stellarBurger: mockStore }
});

describe('Тесты селекторов пользователя', () => {
  test('selectUser возвращает данные пользователя', () => {
    const user = selectUser(store.getState());
    expect(user).toEqual({
      name: 'testUser',
      email: 'test@gmail.com'
    });
  });

  test('selectIsAuthenticated возвращает статус аутентификации', () => {
    const isAuthenticated = selectIsAuthenticated(store.getState());
    expect(isAuthenticated).toBe(true);
  });
});
