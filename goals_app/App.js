import { StyleSheet, View, Button, Image, SafeAreaView, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddingGoalHandler(){
    setModalIsVisible(true);
  }

  function endAddGoalHandler(){
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() }
    ]);
    setModalIsVisible(false);
  }

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter(currentCourseGoal => currentCourseGoal.id != id);
    });
  }
  

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button title='Add new goal' color="#5e0acc" onPress={startAddingGoalHandler} />
        <GoalInput 
          visible={modalIsVisible} 
          onAddGoal={addGoalHandler} 
          onCancel={endAddGoalHandler} />
        <View style={styles.goalsContainer} >
          <FlatList 
          data={courseGoals} 
          renderItem={itemData => <GoalItem text={itemData.item.text} onDeleteItem={deleteGoalHandler} id={itemData.item.id} /> }
        />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1
  },
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a'
  },
  goalsContainer: {
    flex: 5
  }
});
