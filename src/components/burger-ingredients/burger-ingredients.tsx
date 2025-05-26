import { FC, useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { TIngredient, TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../slices/stellar-burger-slice';

export const BurgerIngredients: FC = () => {
  const ingredientList = useSelector(selectIngredients);

  const buns = ingredientList.filter((el) => el.type === 'bun');
  const mains = ingredientList.filter((el) => el.type === 'main');
  const sauces = ingredientList.filter((el) => el.type === 'sauce');

  const [activeTab, setActiveTab] = useState<TTabMode>('bun');

  const bunTitleRef = useRef<HTMLHeadingElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const sauceTitleRef = useRef<HTMLHeadingElement>(null);

  const [bunSectionRef, isBunVisible] = useInView({ threshold: 0 });
  const [mainSectionRef, isMainVisible] = useInView({ threshold: 0 });
  const [sauceSectionRef, isSauceVisible] = useInView({ threshold: 0 });

  useEffect(() => {
    if (isBunVisible) {
      setActiveTab('bun');
    } else if (isSauceVisible) {
      setActiveTab('sauce');
    } else if (isMainVisible) {
      setActiveTab('main');
    }
  }, [isBunVisible, isMainVisible, isSauceVisible]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as TTabMode);

    switch (tab) {
      case 'bun':
        bunTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'main':
        mainTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'sauce':
        sauceTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  return (
    <BurgerIngredientsUI
      currentTab={activeTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={bunTitleRef}
      titleMainRef={mainTitleRef}
      titleSaucesRef={sauceTitleRef}
      bunsRef={bunSectionRef}
      mainsRef={mainSectionRef}
      saucesRef={sauceSectionRef}
      onTabClick={handleTabChange}
    />
  );
};
