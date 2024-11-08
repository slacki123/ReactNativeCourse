import CategoryGridTile from "../components/CategoriesGridTile";
import { CATEGORIES } from "../data/dummy-data";
import { FlatList } from 'react-native';



export default function CategoriesScreen({ navigation }) {

    function renderCategoryItem(itemData){
        const pressHandler = () => {
            navigation.navigate('MealsOverview', {
                categoryId: itemData.item.id
            });
        };
    
        return <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onPress={pressHandler}/>
    }

    return (
        <FlatList data={CATEGORIES} numColumns={2} keyExtractor={item => item.id} renderItem={renderCategoryItem} />
    )
}
