//Тесты для ленты заказов

import stellarBurgerSlice, {
  fetchFeed,
  fetchUserOrders
} from '../stellar-burger-slice';
import { initialState } from '../stellar-burger-types';

describe('Тесты асинхронных действий для ленты заказов', () => {
  describe('fetchFeed', () => {
    test('pending состояние', () => {
      const state = stellarBurgerSlice(initialState, fetchFeed.pending(''));
      expect(state.loading).toBe(true);
    });

    test('rejected состояние', () => {
      const mockAnswer = { name: 'test', message: 'Произошла ошибка' };
      const state = stellarBurgerSlice(
        initialState,
        fetchFeed.rejected(mockAnswer, '')
      );
      expect(state.loading).toBe(false);
    });

    test('fulfilled состояние', () => {
      const mockResponse = {
        success: true,
        total: 100,
        totalToday: 10,
        orders: [
          {
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
        ]
      };
      const state = stellarBurgerSlice(
        initialState,
        fetchFeed.fulfilled(mockResponse, '')
      );
      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(mockResponse.orders);
      expect(state.totalOrders).toEqual(mockResponse.total);
      expect(state.ordersToday).toEqual(mockResponse.totalToday);
    });
  });

  describe('fetchUserOrders', () => {
    test('pending состояние', () => {
      const state = stellarBurgerSlice(
        initialState,
        fetchUserOrders.pending('')
      );
      expect(state.loading).toBe(true);
    });

    test('rejected состояние', () => {
      const mockAnswer = { name: 'test', message: 'Произошла ошибка' };
      const state = stellarBurgerSlice(
        initialState,
        fetchUserOrders.rejected(mockAnswer, '')
      );
      expect(state.loading).toBe(false);
    });

    test('fulfilled состояние', () => {
      const mockResponse = [
        {
          _id: '664e927097ede0001d06bdb9',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-05-23T00:48:48.039Z',
          updatedAt: '2024-05-23T00:48:48.410Z',
          number: 40680
        }
      ];
      const state = stellarBurgerSlice(
        initialState,
        fetchUserOrders.fulfilled(mockResponse, '')
      );
      expect(state.loading).toBe(false);
      expect(state.userOrders).toEqual(mockResponse);
    });
  });
});
