// Импортируем функцию defineConfig из Cypress для задания конфигурации проекта
import { defineConfig } from 'cypress';

// Загружаем переменные окружения из .env файла в process.env
require('dotenv').config();

// Экспорт конфигурации проекта с помощью defineConfig
export default defineConfig({
  // Настройки для e2e (end-to-end) тестов
  e2e: {
    // Адрес, на который будут отправляться запросы во время тестирования
    baseUrl: 'http://localhost:4000',

    // Настройка событий Node.js перед запуском тестов
    setupNodeEvents(on, config) {
      // Добавляем переменные окружения из системы и существующей конфигурации в config.env
      config.env = {
        ...process.env, // Все переменные из .env или среды
        ...config.env   // Уже заданные переменные в конфиге
      };

      // Возвращаем обновлённую конфигурацию для использования Cypress
      return config;
    }
  }
});
