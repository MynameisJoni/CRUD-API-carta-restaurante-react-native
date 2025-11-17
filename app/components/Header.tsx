import { View, Text, StyleSheet } from 'react-native';

export default function Header(){
    return(
        <View style={styles.bloqueHeader}>
            <Text style={styles.titulo}>CAMPER CAFE</Text>
            <Text>Est. 2020</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bloqueHeader: {
        alignItems: 'center'
    },
    titulo: {
        color: '#000',
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
        fontFamily: 'Impact',
        margin: 5
    }
});

