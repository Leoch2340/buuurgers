import { FC, memo } from 'react';
import { useDispatch } from '../../services/store';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

import {
  deleteIngredient,
  moveIngredientDown,
  moveIngredientUp
} from '../../slices/stellar-burger-slice';

const Component: FC<BurgerConstructorElementProps> = ({
  ingredient,
  index,
  totalItems
}) => {
  const dispatch = useDispatch();

  const onMoveDown = () => dispatch(moveIngredientDown(ingredient));
  const onMoveUp = () => dispatch(moveIngredientUp(ingredient));
  const onDelete = () => dispatch(deleteIngredient(ingredient));

  return (
    <BurgerConstructorElementUI
      ingredient={ingredient}
      index={index}
      totalItems={totalItems}
      handleMoveUp={onMoveUp}
      handleMoveDown={onMoveDown}
      handleClose={onDelete}
    />
  );
};

export const BurgerConstructorElement = memo(Component);
