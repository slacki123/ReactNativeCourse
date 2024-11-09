import { Text, View } from 'react-native'
import { useContext } from 'react';
import { FavouritesContext } from '../store/context/favourites-context';
import { MEALS } from '../data/dummy-data';
import MealsList from '../components/MealsList/MealsList';
import { useSelector } from 'react-redux';

function FavouritesScreen() {
    // const favouritesMealsCtx = useContext(FavouritesContext)

    const favouriteMealIds = useSelector( state => state.favouriteMeals.ids)

    // const favouriteMeals = MEALS.filter(meal => favouritesMealsCtx.ids.includes(meal.id));

    // redux way
    const favouriteMeals = MEALS.filter(meal => favouriteMealIds.includes(meal.id));


    if(favouriteMeals.length == 0){
        return <View>
            <Text> There are no favourite meals </Text>
        </View>
    }

    return <MealsList items={favouriteMeals} />
}

export default FavouritesScreen;