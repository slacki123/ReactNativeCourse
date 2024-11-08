import { Text, View, StyleSheet } from 'react-native';

const List = ( {data} ) => 
    data.map((dataPoint) => (

            <View style={styles.listItems} key={dataPoint}>
                <Text style={styles.itemText} >{dataPoint}</Text>
            </View>
    ))


export default List;

const styles = StyleSheet.create({
    listItems: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: '#3f2f25'
    },
    itemText: {
        color: 'brown',
        textAlign: 'center'
    }
});