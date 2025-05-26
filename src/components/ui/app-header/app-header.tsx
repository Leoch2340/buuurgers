import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

// Компонент верхнего меню приложения, отображающий навигацию и имя пользователя
export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      {/* Левая часть меню: навигация "Конструктор" и "Лента заказов" */}
      <div className={styles.menu_part_left}>
        {/* Ссылка на главную страницу с иконкой бургера */}
        <>
          <BurgerIcon type='primary' />
          <Link
            to='/'
            className={
              location.pathname === '/' ? styles.link_active : styles.link
            }
          >
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </Link>
        </>

        {/* Ссылка на страницу ленты заказов с иконкой списка */}
        <>
          <ListIcon type='primary' />
          <Link
            to='/feed'
            className={
              location.pathname.includes('feed')
                ? styles.link_active
                : styles.link
            }
          >
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </Link>
        </>
      </div>

      {/* Центральная часть меню с логотипом приложения */}
      <div className={styles.logo}>
        <Logo className='' /> {/* Компонент логотипа */}
      </div>

      {/* Правая часть меню: переход в профиль пользователя */}
      <div className={styles.link_position_last}>
        <ProfileIcon type='primary' /> {/* Иконка профиля пользователя */}
        <Link
          to='/profile'
          className={
            location.pathname.includes('profile')
              ? styles.link_active
              : styles.link
          }
        >
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </Link>
      </div>
    </nav>
  </header>
);
