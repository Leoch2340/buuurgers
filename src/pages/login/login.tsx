import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { Preloader } from '../../components/ui/preloader';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchLoginUser,
  removeErrorText,
  selectErrorText,
  selectLoading
} from '../../slices/stellar-burger-slice';
import { setCookie } from '../../utils/cookie';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const error = useSelector(selectErrorText);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(removeErrorText());
  }, [dispatch]);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(removeErrorText());

    const userData = { email, password };

    dispatch(fetchLoginUser(userData))
      .unwrap()
      .then(({ accessToken, refreshToken }) => {
        setCookie('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      })
      .catch((err) => {
        console.error('Ошибка при авторизации:', err);
      });
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
