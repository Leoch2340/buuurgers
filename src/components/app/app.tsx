import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  closeModal,
  fetchFeed,
  fetchIngredients,
  fetchLogout,
  getUserThunk,
  init,
  selectIngredients,
  selectIsAuthenticated,
  selectIsModalOpened,
  selectOrders
} from '../../slices/stellar-burger-slice';
import { deleteCookie, getCookie } from '../../utils/cookie';

export const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const ingredients = useSelector(selectIngredients);
  const isLoggedIn = useSelector(selectIsAuthenticated);
  const feedOrders = useSelector(selectOrders);
  const showModal = useSelector(selectIsModalOpened);
  const token = getCookie('accessToken');

  const modalBackground = location.state?.background;

  // Проверка состояния авторизации и инициализация при необходимости
  useEffect(() => {
    if (!isLoggedIn && token) {
      dispatch(getUserThunk())
        .then(() => dispatch(init()))
        .catch(() => {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        });
    } else if (!isLoggedIn) {
      dispatch(init());
    }
  }, [isLoggedIn, token, dispatch]);

  // Подгружаем список ингредиентов, если он ещё не получен
  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients()).catch((err) =>
        console.error('Не удалось загрузить ингредиенты:', err)
      );
    }
  }, [ingredients.length, dispatch]);

  // Загружаем ленту заказов, если она пустая
  useEffect(() => {
    if (feedOrders.length === 0) {
      dispatch(fetchFeed()).catch((err) =>
        console.error('Ошибка при получении заказов:', err)
      );
    }
  }, [feedOrders.length, dispatch]);

  const logoutHandler = async () => {
    await dispatch(fetchLogout());
    navigate('/login');
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={modalBackground || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна при наличии фонового маршрута */}
      {modalBackground && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Заказ'
                onClose={() => {
                  dispatch(closeModal());
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => {
                  dispatch(closeModal());
                  navigate(-1);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title='Заказ'
                  onClose={() => {
                    dispatch(closeModal());
                    navigate(-1);
                  }}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};
