import { Text, View, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { useContext, useLayoutEffect } from 'react';
import { MEALS } from '../data/dummy-data';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import IconButton from '../components/IconButton';
import { FavouritesContext } from '../store/context/favourites-context';

function MealDetailScreen({ route, navigation }) {
    const favouriteMealCtx = useContext(FavouritesContext);

    const mealId = route.params.mealId;

    const selectedMeal = MEALS.find((meal) => meal.id == mealId);

    const mealIsFavourite = favouriteMealCtx.ids.includes(mealId);

    function changeFavouriteStatusHandler(){
       if(mealIsFavourite){
        favouriteMealCtx.removeFavourite(mealId);
       } else {
        favouriteMealCtx.addFavourite(mealId);
       }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon={mealIsFavourite ? 'star' : 'star-outline'} color='yellow' onPress={changeFavouriteStatusHandler} />
        })
    }, [navigation, changeFavouriteStatusHandler]);

    return (
        <ScrollView style={styles.rootContainer}>
            <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails duration={selectedMeal.duration} complexity={selectedMeal.complexity} affordability={selectedMeal.affordability} textStyle={styles.detailText}/>
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer} >
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectedMeal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>
        </ScrollView>
    );
    
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 33
    },
    image: {
        width: '100%',
        height: 350
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        color: 'white'
    },
    listOuterContainer: {
        alignItems: 'center'
    },
    listContainer: {
        width: '80%',

    }
});