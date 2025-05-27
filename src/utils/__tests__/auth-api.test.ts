import { expect, test, describe, jest, beforeEach } from '@jest/globals';
import * as API from '../burger-api';
import { mockData, mockError, mockUserData, getMockResponse, setupMocks } from './__helpers__/test-utils';

// Группа тестов для API, связанных с аутентификацией
describe('Auth API tests', () => {
  // Настройка окружения перед каждым тестом (моки для localStorage и cookie)
  beforeEach(() => {
    setupMocks();
  });

  // Тест успешной регистрации пользователя
  test('Test registerUserApi success', async () => {
    // Подменяем глобальный fetch на мок, возвращающий успешный ответ
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;

    // Шпион на функцию API
    const spy = jest.spyOn(API, 'registerUserApi');

    // Вызов тестируемой функции
    const res = await API.registerUserApi(mockUserData.register);

    // Проверяем, что функция была вызвана и вернула ожидаемые данные
    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  // Тест неудачной регистрации пользователя
  test('Test registerUserApi fail', async () => {
    // Возвращаем ошибку в мок-ответе
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;

    // Ожидаем, что вызов выбросит ошибку, соответствующую mockError
    await API.registerUserApi(mockUserData.register).catch((err) =>
      expect(err).toEqual(mockError)
    );
  });

  // Тест успешного входа пользователя
  test('Test loginUserApi success', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const spy = jest.spyOn(API, 'loginUserApi');
    const res = await API.loginUserApi(mockUserData.login);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  // Тест неудачного входа пользователя
  test('Test loginUserApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;

    await API.loginUserApi(mockUserData.login).catch((err) =>
      expect(err).toEqual(mockError)
    );
  });

  // Тест успешной отправки запроса на восстановление пароля
  test('Test forgotPasswordApi success', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const spy = jest.spyOn(API, 'forgotPasswordApi');
    const res = await API.forgotPasswordApi(mockUserData.forgotPassword);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  // Тест ошибки при запросе восстановления пароля
  test('Test forgotPasswordApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;

    await API.forgotPasswordApi(mockUserData.forgotPassword).catch((err) =>
      expect(err).toEqual(mockError)
    );
  });

  // Тест успешного сброса пароля
  test('Test resetPasswordApi success', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const spy = jest.spyOn(API, 'resetPasswordApi');
    const res = await API.resetPasswordApi(mockUserData.resetPassword);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  // Тест неудачного сброса пароля
  test('Test resetPasswordApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;

    await API.resetPasswordApi(mockUserData.resetPassword).catch((err) =>
      expect(err).toEqual(mockError)
    );
  });

  // Тест успешного выхода пользователя
  test('Test logoutApi success', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const spy = jest.spyOn(API, 'logoutApi');
    const res = await API.logoutApi('');

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });
});
