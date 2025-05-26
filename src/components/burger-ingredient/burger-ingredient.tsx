import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { addIngredientAction } from '../../slices/stellar-burger-slice';

const BurgerIngredientComponent: FC<TBurgerIngredientProps> = ({
  ingredient,
  count,
  index
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const onAddIngredient = () => {
    dispatch(addIngredientAction(ingredient));
  };

  return (
    <BurgerIngredientUI
      ingredient={ingredient}
      count={count}
      locationState={{ background: location }}
      handleAdd={onAddIngredient}
      index={index}
    />
  );
};

export const BurgerIngredient = memo(BurgerIngredientComponent);
