import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchRegisterUser,
  getUserThunk,
  removeErrorText,
  selectErrorText,
  selectLoading
} from '../../slices/stellar-burger-slice';
import { setCookie } from '../../utils/cookie';
import { Preloader } from '../../components/ui/preloader';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const error = useSelector(selectErrorText);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(removeErrorText());
  }, [dispatch]);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const registrationData = {
      name: userName,
      email,
      password
    };

    dispatch(fetchRegisterUser(registrationData))
      .unwrap()
      .then(({ refreshToken, accessToken }) => {
        localStorage.setItem('refreshToken', refreshToken);
        setCookie('accessToken', accessToken);
        dispatch(getUserThunk());
      })
      .catch((err) => {
        console.error('Ошибка при авторизации:', err);
      });
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
