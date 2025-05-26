// Импортируем FC (FunctionalComponent) и memo из React
import { FC, memo } from 'react';

// Импортируем стили для модального окна
import styles from './modal.module.css';

// Импортируем иконку закрытия из сторонней UI-библиотеки
import { CloseIcon } from '@zlden/react-developer-burger-ui-components';

// Импортируем тип пропсов для компонента ModalUI
import { TModalUIProps } from './type';

// Импортируем компонент затемнённого фона модального окна
import { ModalOverlayUI } from '@ui';

// Экспортируем компонент ModalUI как функциональный компонент с мемоизацией (оптимизация от лишних перерендеров)
export const ModalUI: FC<TModalUIProps> = memo(
  // Деструктуризация пропсов: заголовок, функция закрытия и содержимое
  ({ title, onClose, children }) => (
    <>
      {/* Основной контейнер модального окна */}
      <div className={styles.modal}>
        {/* Шапка модального окна */}
        <div className={styles.header}>
          {/* Заголовок окна */}
          <h3 className={`${styles.title} text text_type_main-large`}>
            {title}
          </h3>
          {/* Кнопка закрытия окна */}
          <button
            className={styles.button}
            type='button'
            data-cy={'close_modal_btn'} // Атрибут для тестирования
          >
            {/* Иконка крестика, с обработчиком клика для закрытия */}
            <CloseIcon type='primary' onClick={onClose} />
          </button>
        </div>
        {/* Основное содержимое модального окна */}
        <div className={styles.content}>{children}</div>
      </div>
      {/* Затемнение фона с обработчиком клика для закрытия модального окна */}
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
