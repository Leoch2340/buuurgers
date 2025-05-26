import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../slices/stellar-burger-slice';

// Компонент для отображения информации об ингредиенте по его ID из URL
export const IngredientDetails: FC = () => {
  const { id: ingredientId } = useParams<{ id: string }>();
  const navigateTo = useNavigate();

  const ingredientList = useSelector(selectIngredients);

  useEffect(() => {
    const noIdProvided = !ingredientId;
    if (noIdProvided) {
      navigateTo('/', { replace: true });
    }
  }, [ingredientId, navigateTo]);

  const foundItem = ingredientList.find(({ _id }) => _id === ingredientId);

  if (!foundItem) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={foundItem} />;
};
