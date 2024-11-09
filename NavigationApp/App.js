import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button } from 'react-native';
import CategoriesScreen from './screens/CategoriesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import FavouritesContextProvider from './store/context/favourites-context';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// NESTED Navigator
// This will be choosing between main categories screen and favourites screen on startup
function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{
        headerStyle: { backgroundColor: '#351401' }, 
        headerTintColor: 'white', 
        sceneContainerStyle: { backgroundColor: 'grey' }, 
        drawerContentStyle: {backgroundColor: '#351401'},
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: 'brown' }}
      > 
      <Drawer.Screen name="MealsCategories" component={CategoriesScreen} />
      <Drawer.Screen name="Favourites" component={FavouritesScreen} />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <FavouritesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerStyle: { backgroundColor: '#351401' }, headerTintColor: 'white', contentStyle: { backgroundColor: 'grey' } }}> 
            <Stack.Screen name="Categories" component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} options={{ title: 'Meals Overview'}} />
            <Stack.Screen name="MealDetail" component={MealDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavouritesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
