import { Link } from 'expo-router';
import { View, Text, StyleSheet, Linking } from 'react-native';

export default function Footer(){
    return(
        <View style={styles.footer}>
            <Text onPress={() => Linking.openURL('https://reactnative.dev/')} style={styles.enlace}>Mas cositas de React Native</Text>
            <Text style={styles.cabecera}>Primer proyecto React Native</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footer:{
        bottom: 0,
        left: 0,
        right: 0,
        padding: 5,
        zIndex: 999,
    },
    cabecera: {
        textAlign: 'center',
        color: '#000'
    },
    enlace: {
        textAlign: 'center',
        color: 'black',
        textDecorationLine: 'underline'
    }
})