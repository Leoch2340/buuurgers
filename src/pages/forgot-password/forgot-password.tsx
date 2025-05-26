// Импортируем необходимые хуки и типы из React
import { FC, useState, SyntheticEvent } from 'react';

// Импортируем хук useNavigate для перехода по маршрутам
import { useNavigate } from 'react-router-dom';

// Импортируем API-функцию для запроса восстановления пароля
import { forgotPasswordApi } from '@api';

// Импортируем UI-компонент для страницы восстановления пароля
import { ForgotPasswordUI } from '@ui-pages';

// Компонент ForgotPassword отвечает за логику восстановления пароля.
export const ForgotPassword: FC = () => {
  // Состояние для хранения введённого email
  const [email, setEmail] = useState('');

  // Состояние для хранения ошибки (если она произойдёт)
  const [error, setError] = useState<Error | null>(null);

  // Хук для программной навигации по маршрутам
  const navigate = useNavigate();

  // Обработчик отправки формы восстановления пароля
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы

    setError(null); // Сбрасываем старую ошибку (если была)

    // Отправляем API-запрос на восстановление пароля
    forgotPasswordApi({ email })
      .then(() => {
        // Если успешно:
        localStorage.setItem('resetPassword', 'true'); // Устанавливаем флаг в localStorage, чтобы разрешить переход на следующую страницу
        navigate('/reset-password', { replace: true }); // Переход на страницу сброса пароля
      })
      .catch((err) => setError(err)); // Если произошла ошибка — сохраняем её в состоянии error
  };

  return (
    // Возвращаем UI-компонент, передавая в него необходимые пропсы
    <ForgotPasswordUI
      errorText={error?.message} // Текст ошибки, если она есть
      email={email} // Текущее значение email
      setEmail={setEmail} // Функция для обновления email
      handleSubmit={handleSubmit} // Обработчик отправки формы
    />
  );
};
