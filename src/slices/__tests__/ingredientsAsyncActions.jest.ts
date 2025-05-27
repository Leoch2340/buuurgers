//Тесты для загрузки ингредиентов

import stellarBurgerSlice, { fetchIngredients } from '../stellar-burger-slice';
import { initialState } from '../stellar-burger-types';

describe('Тесты асинхронных действий для ингредиентов', () => {
  test('pending состояние fetchIngredients', () => {
    const state = stellarBurgerSlice(
      initialState,
      fetchIngredients.pending('')
    );
    expect(state.loading).toBe(true);
  });

  test('fulfilled состояние fetchIngredients', () => {
    const mockResponse = [
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      }
    ];
    const state = stellarBurgerSlice(
      initialState,
      fetchIngredients.fulfilled(mockResponse, '')
    );
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockResponse);
  });

  test('rejected состояние fetchIngredients', () => {
    const mockAnswer = { name: 'test', message: 'Произошла ошибка' };
    const state = stellarBurgerSlice(
      initialState,
      fetchIngredients.rejected(mockAnswer, '')
    );
    expect(state.loading).toBe(false);
  });
});
