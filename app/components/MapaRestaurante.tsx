import React from "react";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet , View, Text} from 'react-native';

export default function MapaRestaurante(){
    return(
        <View style={styles.container}>
            <View style={styles.tituloContenedor}>
                <Text style={styles.titulo}>Localización</Text>
            </View>
            <View style={styles.mapaContenedor}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 28.12859914151696,
                        longitude: -15.443084224444048,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: 28.12859914151696,
                            longitude: -15.443084224444048,
                        }}
                        title="CamperCafe"
                        description="Cerquita del insti ;)"
                    />
                </MapView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    map:{
        width: '90%',
        height: '90%',
    },
    mapaContenedor:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    tituloContenedor:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo:{
        fontSize: 30,
        fontWeight: 'bold',
    }
});