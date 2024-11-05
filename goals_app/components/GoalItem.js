import { StyleSheet, View, Text, Pressable } from "react-native";


const GoalItem = (props) => {

    return(
            <View style={styles.goalItem}>
                <Pressable 
                    // bind function to the parameter that will be passed
                    onPress={props.onDeleteItem.bind(this, props.id)} 
                    android_ripple={{color: 'white'}}
                    style={(pressedData) => pressedData.pressed && styles.pressedItem } // if button pressed, then return style
                >
                    <Text style={styles.goalText}>{props.text}</Text>
                </Pressable>
            </View>
    )

}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  pressedItem: {
    opacity: 0.5
  },
  goalText: {
    color: 'white',
    padding: 8
  }
});

export default GoalItem;