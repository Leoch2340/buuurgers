import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './burger-ingredient.module.css';

import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';
import { openModal } from '../../../slices/stellar-burger-slice';
import { useDispatch } from '../../../services/store';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd, locationState, index }) => {
    const dispatch = useDispatch();
    const { image, price, name, _id, type } = ingredient;

    const handleOpenModal = () => dispatch(openModal());

    return (
      <li
        className={styles.container}
        data-cy={type === 'bun' ? `bun_${index}` : `ingredient_${index}`}
      >
        <Link
          to={`/ingredients/${_id}`}
          state={locationState}
          className={styles.article}
          onClick={handleOpenModal}
          data-cy='ingredient'
        >
          {!!count && <Counter count={count} />}
          <img src={image} alt='картинка ингредиента.' className={styles.img} />
          <div className={`${styles.cost} mt-2 mb-2`}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <p
            className={`text text_type_main-default ${styles.text}`}
            data-cy='ingredient_name'
          >
            {name}
          </p>
        </Link>
        <AddButton
          text='Добавить'
          onClick={handleAdd}
          extraClass={`${styles.addButton} mt-8`}
        />
      </li>
    );
  }
);
