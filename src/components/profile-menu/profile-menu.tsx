import { FC } from 'react';
import { useLocation, useNavigate, redirect } from 'react-router-dom';

import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { fetchLogout } from '../../slices/stellar-burger-slice';
import { deleteCookie } from '../../utils/cookie';

// Компонент меню профиля с обработкой выхода из аккаунта
export const ProfileMenu: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentPath = location.pathname;

  const handleLogout = () => {
    dispatch(fetchLogout())
      .unwrap()
      .then((res) => {
        if (res.success) {
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
          navigate('/');
        }
      })
      .catch((err) => {
        console.warn('Ошибка при попытке выхода:', err);
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        navigate('/');
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={currentPath} />;
};
