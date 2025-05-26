import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { resetPasswordApi } from '@api'; // API-функция для сброса пароля
import { ResetPasswordUI } from '@ui-pages'; // UI-компонент формы сброса пароля

export const ResetPassword: FC = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setError(null); // Обнуляем ошибку перед вызовом API

    resetPasswordApi({ password, token })
      .then(() => {
        localStorage.removeItem('resetPassword');
        navigate('/login');
      })
      .catch((err: Error) => {
        setError(err);
      });
  };

  useEffect(() => {
    const resetFlag = localStorage.getItem('resetPassword');
    if (!resetFlag) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={error?.message}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
