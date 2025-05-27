//Тесты для UI-состояния

import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import stellarBurgerSlice, {
  openModal,
  closeModal,
  setErrorText,
  removeErrorText,
  selectIsModalOpened,
  selectErrorText
} from '../stellar-burger-slice';
import { mockStore } from '../mockData';

function initStore() {
  return configureStore({
    reducer: { stellarBurger: stellarBurgerSlice },
    preloadedState: { stellarBurger: mockStore }
  });
}

describe('Тесты редьюсеров UI состояния', () => {
  test('Открытие модального окна', () => {
    const store = initStore();
    const beforeOpen = selectIsModalOpened(store.getState());
    store.dispatch(openModal());
    const afterOpen = selectIsModalOpened(store.getState());
    expect(beforeOpen).toBe(false);
    expect(afterOpen).toBe(true);
  });

  test('Закрытие модального окна', () => {
    const store = initStore();
    store.dispatch(closeModal());
    const isOpen = selectIsModalOpened(store.getState());
    expect(isOpen).toBe(false);
  });

  test('Установка текста ошибки', () => {
    const store = initStore();
    store.dispatch(setErrorText('test error'));
    const errorText = selectErrorText(store.getState());
    expect(errorText).toBe('test error');
  });

  test('Удаление текста ошибки', () => {
    const store = initStore();
    store.dispatch(setErrorText('Error here!'));
    store.dispatch(removeErrorText());
    const errorText = selectErrorText(store.getState());
    expect(errorText).toBe('');
  });
});
