import { jest } from '@jest/globals';

// Сохраняем оригинальные реализации глобальных объектов для последующего восстановления
export const originalFetch = global.fetch;
export const originalDocument = global.document;
export const originalLocalStorage = global.localStorage;

/**
 * Создаёт мок-объект ответа для функции fetch
 * @param data - Данные, возвращаемые в теле ответа
 * @param ok - Флаг, определяющий успешность ответа (по умолчанию true)
 * @returns Промис с объектом, имитирующим ответ fetch
 */
export async function getMockResponse(data: any, ok: boolean = true) {
  return Promise.resolve({
    ok, // Указывает на успешность ответа
    json: () => Promise.resolve(data), // Метод json() возвращает переданные данные
    status: ok ? 200 : 400 // HTTP-статус кода ответа
  });
}

// Пример данных для успешного запроса
export const mockData = {
  success: true,
  data: 'test data',
  orders: ['test1', 'test2']
};

// Пример данных для симуляции ошибки
export const mockError = {
  success: false,
  name: 'error',
  message: 'jwt expired'
};

// Набор тестовых данных пользователя для различных сценариев
export const mockUserData = {
  register: { name: 'name', email: 'test@mail.com', password: 'test' },
  login: { email: 'test@mail.com', password: 'test' },
  forgotPassword: { email: 'test@mail.com' },
  resetPassword: { password: 'test', token: 'testtoken' },
  update: { name: 'test', email: 'test@mail.com' }
};

/**
 * Подготавливает окружение, устанавливая моки для document.cookie и localStorage
 */
export function setupMocks() {
  global.document = { cookie: 'accessToken=test_val' } as any;
  global.localStorage = {
    getItem: jest.fn(() => 'testItem'),
    setItem: jest.fn()
  } as any;
}
