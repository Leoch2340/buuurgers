//Тесты для работы с заказами

import stellarBurgerSlice, { fetchNewOrder } from '../stellar-burger-slice';
import { initialState } from '../stellar-burger-types';

describe('Тесты асинхронных действий для заказов', () => {
  describe('fetchNewOrder', () => {
    test('pending состояние', () => {
      const mockOrder = ['testid1', 'testid2', 'testid3'];
      const state = stellarBurgerSlice(
        initialState,
        fetchNewOrder.pending('', mockOrder)
      );
      expect(state.orderRequest).toBe(true);
    });

    test('rejected состояние', () => {
      const mockAnswer = { name: 'test', message: 'Произошла ошибка' };
      const state = stellarBurgerSlice(
        initialState,
        fetchNewOrder.rejected(mockAnswer, '', [''])
      );
      expect(state.orderRequest).toBe(false);
    });

    test('fulfilled состояние', () => {
      const mockResponse = {
        success: true,
        name: 'testname',
        order: {
          _id: '67f0dd26e8e61d001cec084f',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный метеоритный бургер',
          createdAt: '2025-04-05T07:35:02.385Z',
          updatedAt: '2025-04-05T07:35:03.075Z',
          number: 73501
        }
      };
      const state = stellarBurgerSlice(
        initialState,
        fetchNewOrder.fulfilled(mockResponse, '', [''])
      );
      expect(state.orderModalData).toEqual(mockResponse.order);
      expect(state.orderRequest).toBe(false);
    });
  });
});
