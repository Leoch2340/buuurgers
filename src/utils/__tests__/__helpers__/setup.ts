import { afterAll, beforeEach } from '@jest/globals';
import { 
  originalFetch, 
  originalDocument, 
  originalLocalStorage 
} from './test-utils';

/**
 * Восстанавливает оригинальные глобальные объекты после завершения всех тестов.
 * Это гарантирует, что модификации, сделанные в тестах, не повлияют 
 * на другие тестовые наборы или среду выполнения.
 */
afterAll(() => {
  global.fetch = originalFetch;          // Возвращаем оригинальный fetch API
  global.document = originalDocument;    // Восстанавливаем document
  global.localStorage = originalLocalStorage; // Возвращаем стандартное хранилище
});

/**
 * Очищает все моки перед выполнением каждого теста.
 * Эта настройка обеспечивает изолированность тестов - каждый тест 
 * начинается с чистого состояния, без артефактов от предыдущих тестов.
 */
beforeEach(() => {
  jest.clearAllMocks();  // Сбрасываем все моки, шпионы и таймеры
});