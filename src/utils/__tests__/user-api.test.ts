// Импорт основных утилит для написания тестов из Jest
import { expect, test, describe, jest, beforeEach } from '@jest/globals';

// Импортируем API-функции, которые будем тестировать
import * as API from '../burger-api';

// Импортируем мок-данные и утилиты для имитации API-ответов
import { mockData, mockError, mockUserData, getMockResponse, setupMocks } from './__helpers__/test-utils';

// Описание группы тестов, относящихся к пользовательскому API
describe('User API tests', () => {
  // Перед каждым тестом вызываем функцию setupMocks для очистки и настройки среды
  beforeEach(() => {
    setupMocks(); // Например, сброс всех mock-функций или переинициализация переменных
  });

  // Тест успешного получения данных пользователя (getUserApi)
  test('Test getUserApi success', async () => {
    // Мокаем глобальный fetch, чтобы он возвращал успешный ответ mockData
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    // Создаем шпион на функцию API
    const spy = jest.spyOn(API, 'getUserApi');
    // Выполняем вызов API
    const res = await API.getUserApi();

    // Проверяем, что функция была вызвана
    expect(spy).toHaveBeenCalled();
    // Проверяем, что возвращены корректные данные
    expect(res).toEqual(mockData);
  });

  // Тест успешного обновления данных пользователя (updateUserApi)
  test('Test updateUserApi success', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const spy = jest.spyOn(API, 'updateUserApi');
    // Передаем в API мок-данные для обновления пользователя
    const res = await API.updateUserApi(mockUserData.update);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  // Тест успешного обновления токена (refreshToken)
  test('Test refreshToken success', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const spy = jest.spyOn(API, 'refreshToken');
    const res = await API.refreshToken();

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  // Тест неуспешного обновления токена, если ответ содержит ok: false
  test('Test refreshToken fail ok=false', async () => {
    // В getMockResponse передаётся второй аргумент false, имитирующий ok: false
    global.fetch = jest.fn(() => getMockResponse(mockError, false)) as any;
    // Проверяем, что ошибка корректно обрабатывается
    await API.refreshToken().catch((err) => expect(err).toEqual(mockError));
  });
});
