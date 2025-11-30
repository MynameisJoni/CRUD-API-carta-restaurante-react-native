import { StyleSheet,  View, Pressable, Text, Image} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
    label: string;
    onPress?: () => void;
};

export default function BotonImagenCategoria({label, onPress}: Props){
    return(
        <View style={[styles.botonContenedor, {borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18}]}>
            <Pressable style={[styles.boton, {backgroundColor: '#fff'}]} onPress={onPress}>
                <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
                <Text style={[styles.buttonLabel, {color: '#25292e'}]}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    botonContenedor:{
        width: 140,
        height: 50,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    boton:{
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 14,
    },
});