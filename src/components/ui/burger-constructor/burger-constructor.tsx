import React, { FC } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorElement, Modal } from '@components';
import { Preloader, OrderDetailsUI } from '@ui';

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems,
  orderRequest,
  price,
  orderModalData,
  onOrderClick,
  closeOrderModal
}) => {
  const { bun, ingredients } = constructorItems;

  const renderBunElement = (position: 'top' | 'bottom') => {
    if (!bun) {
      return (
        <div
          className={`${styles.noBuns} ${position === 'top' ? styles.noBunsTop : styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
          data-cy={position === 'top' ? 'no_bun_text_1' : 'no_bun_text_2'}
        >
          Выберите булки
        </div>
      );
    }

    return (
      <div
        className={`${styles.element} ${position === 'top' ? 'mb-4' : 'mt-4'} mr-4`}
      >
        <ConstructorElement
          type={position}
          isLocked
          text={`${bun.name} (${position === 'top' ? 'верх' : 'низ'})`}
          price={bun.price}
          thumbnail={bun.image}
          {...(position === 'top' && { 'data-cy': 'bun_element' })}
        />
      </div>
    );
  };

  const renderIngredientList = () =>
    ingredients.length > 0 ? (
      ingredients.map((item: TConstructorIngredient, idx: number) => (
        <BurgerConstructorElement
          key={item.id}
          ingredient={item}
          index={idx}
          totalItems={ingredients.length}
        />
      ))
    ) : (
      <div
        className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}
        data-cy={'no_ingredients_text'}
      >
        Выберите начинку
      </div>
    );

  return (
    <section
      className={styles.burger_constructor}
      data-cy='constructor_section'
    >
      {renderBunElement('top')}

      <ul className={styles.elements}>{renderIngredientList()}</ul>

      {renderBunElement('bottom')}

      <div className={`${styles.total} mt-10 mr-4`} data-cy='new_order_total'>
        <div className={`${styles.cost} mr-10`}>
          <p className={`text ${styles.text} mr-2`}>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button
          htmlType='button'
          type='primary'
          size='large'
          onClick={onOrderClick}
        >
          Оформить заказ
        </Button>
      </div>

      {orderRequest && (
        <Modal onClose={closeOrderModal} title='Оформляем заказ...'>
          <Preloader />
        </Modal>
      )}

      {orderModalData && (
        <Modal
          onClose={closeOrderModal}
          title={orderRequest ? 'Оформляем заказ...' : ''}
        >
          <OrderDetailsUI orderNumber={orderModalData.number} />
        </Modal>
      )}
    </section>
  );
};
