import { View, Text, StyleSheet } from 'react-native';

function Subtitle({ children }){
    return (
        <View style={styles.subtitleContainer}>
             <Text style={styles.subtitle}>{children}</Text>
        </View>
    )
}

export default Subtitle;

const styles = StyleSheet.create({
    subtitle: {
        color: '#3f2f25',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',

    },
    subtitleContainer: {
        padding: 6,
        borderBottomColor: '#3f2f25',
        borderBottomWidth: 2,
        marginHorizontal: 14,
        marginVertical: 4,
    }
});