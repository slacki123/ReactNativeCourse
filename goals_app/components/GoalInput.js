import { StyleSheet, View, TextInput, Button, Modal, Image } from "react-native";
import { useState } from 'react'

const GoalInput = (props) => {
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler(enteredText){
        setEnteredGoalText(enteredText);
      };

    function addGoalHandler() {
        if(enteredGoalText.length == 0 )return alert("Add a goal!");
        
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('');
    }

    return(
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image source={require('../assets/favicon.png')} style={styles.image}/>
                <TextInput 
                    style={styles.textInput} 
                    placeholder='Enter your goal!' 
                    onChangeText={goalInputHandler} 
                    value={enteredGoalText}/>
                <View style={styles.buttonContainer}>
                    <View>
                        <Button title='Add Goal' onPress={addGoalHandler} style={styles.button} color="#5e0acc" />
                    </View>
                    <View>
                        <Button title='Cancel' style={styles.button} onPress={props.onCancel} color="#f31282" />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#311b6b'
      },
      textInput: {
        borderWidth: 1,
        borderColor: '#e4d0ff',
        backgroundColor: '#e4d0ff',
        color: '#120438',
        width: '100%',
        padding: 8,
        borderRadius: 6
      },
      buttonContainer: {
        marginTop: 16,
        flexDirection: 'row'
      },
      button: {
        width: "30%",
        marginHorizontal: 8
      },
      image: {
        width: 100,
        height: 100,
        margin: 20
      }
  });

export default GoalInput;