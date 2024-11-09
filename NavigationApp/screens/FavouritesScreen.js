import { Text } from 'react-native'
import { useContext } from 'react';
import { FavouritesContext } from '../store/context/favourites-context';
import { MEALS } from '../data/dummy-data';
import MealsList from '../components/MealsList/MealsList';

function FavouritesScreen() {
    const favouritesMealsCtx = useContext(FavouritesContext)

    const favouriteMeals = MEALS.filter(meal => favouritesMealsCtx.ids.includes(meal.id));

    return <MealsList items={favouriteMeals} />
}

export default FavouritesScreen;