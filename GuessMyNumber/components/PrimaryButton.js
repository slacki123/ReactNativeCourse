import { View, Text, Pressable, StyleSheet } from 'react-native';

function PrimaryButton(props) {

    function pressHandler(){
        console.log("Pressed");
    }

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable 
                onPress={pressHandler} 
                style={ pressedData => 
                    pressedData.pressed 
                        ? [styles.buttonInnerContainer, styles.pressed] 
                        : styles.buttonInnerContainer }>
                <Text style={styles.buttonText}>{props.children}</Text>
            </Pressable>
        </View>
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        backgroundColor: '#72063c',
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75
    }
})