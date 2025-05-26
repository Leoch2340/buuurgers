// Импорт функции defineConfig из библиотеки Cypress, которая помогает определить конфигурацию проекта для Cypress
import { defineConfig } from "cypress";

// Подключение и выполнение dotenv для загрузки переменных окружения из файла .env в process.env
require('dotenv').config();

// Экспорт конфигурации по умолчанию с использованием defineConfig
export default defineConfig({
  // Раздел конфигурации для end-to-end тестирования
  e2e: {
    // Базовый URL, к которому Cypress будет обращаться при выполнении тестов
    baseUrl: 'http://localhost:4000',

    // Функция настройки событий узла (Node.js), вызывается перед запуском тестов
    setupNodeEvents(on, config) {
      // Объединение переменных окружения из process.env и текущих переменных конфигурации Cypress
      config.env = {
        ...process.env, // Добавляет все переменные окружения из системы
        ...config.env   // Сохраняет существующие переменные Cypress
      };
      
      // Возврат обновлённой конфигурации
      return config;
    },
  },
});
