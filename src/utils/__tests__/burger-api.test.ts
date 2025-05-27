// Импортируем необходимые функции из Jest
import { expect, test, describe, jest, beforeEach } from '@jest/globals';

// Импортируем тестируемые API-функции
import * as API from '../burger-api';

// Импортируем вспомогательные моки и утилиты для тестирования
import { mockData, mockError, getMockResponse, setupMocks } from './__helpers__/test-utils';

// Группируем все тесты, связанные с Burger API
describe('Burger API tests', () => {
  // Выполняем инициализацию перед каждым тестом
  beforeEach(() => {
    setupMocks(); // Настройка моков (например, сброс spy/mock состояний)
  });

  // Тест успешного вызова getIngredientsApi
  test('Test getIngredientsApi success', async () => {
    // Подменяем глобальную функцию fetch на мок, возвращающий успешный ответ
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    // Создаем шпион на функцию API
    const spy = jest.spyOn(API, 'getIngredientsApi');
    // Выполняем вызов API
    const res = await API.getIngredientsApi();

    // Проверяем, что функция была вызвана
    expect(spy).toHaveBeenCalled();
    // Проверяем корректность полученных данных
    expect(res).toEqual(mockData.data);
  });

  // Тест неуспешного вызова getIngredientsApi (ошибка)
  test('Test getIngredientsApi fail', async () => {
    // Мок fetch возвращает ошибку
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;
    // Проверяем, что ошибка корректно обрабатывается
    await API.getIngredientsApi().catch((err) =>
      expect(err).toEqual(mockError)
    );
  });

  // Тест успешного вызова getFeedsApi
  test('Test getFeedsApi success', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const spy = jest.spyOn(API, 'getFeedsApi');
    const res = await API.getFeedsApi();

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  // Тест неуспешного вызова getFeedsApi
  test('Test getFeedsApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;
    await API.getFeedsApi().catch((err) => expect(err).toEqual(mockError));
  });

  // Тест успешного вызова getOrdersApi
  test('Test getOrdersApi success', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const spy = jest.spyOn(API, 'getOrdersApi');
    const res = await API.getOrdersApi();

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData.orders);
  });

  // Тест неуспешного вызова getOrdersApi
  test('Test getOrdersApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;
    await API.getOrdersApi().catch((err) => expect(err).toEqual(mockError));
  });

  // Тест успешного вызова orderBurgerApi
  test('Test orderBurgerApi success', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    // Имитируем заказ с определенным списком ингредиентов
    const burger = ['testid1', 'testid2', 'testid1'];
    const spy = jest.spyOn(API, 'orderBurgerApi');
    const res = await API.orderBurgerApi(burger);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  // Тест неуспешного вызова orderBurgerApi
  test('Test orderBurgerApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;
    const burger = ['testid1', 'testid2', 'testid1'];
    await API.orderBurgerApi(burger).catch((err) =>
      expect(err).toEqual(mockError)
    );
  });

  // Тест успешного вызова getOrderByNumberApi
  test('Test getOrderByNumberApi success', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const spy = jest.spyOn(API, 'getOrderByNumberApi');
    const res = await API.getOrderByNumberApi(123); // Проверка заказа по номеру

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });
});
