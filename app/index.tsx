import { Image, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BloqueNuevaCategoria from "./components/BloqueNuevaCategoria";
import EntradaCategoria from "./components/EntradaCategoria";

export default function Index() {
  return (
    <SafeAreaView style={styles.contenedor}>
      <Image 
        style={styles.fondo}
        source={require('../assets/images/beans.jpg')} />
      <View style={styles.contenido}>
        <ScrollView style={styles.carta}>
          <Header />
          <EntradaCategoria />
          <View style={styles.footer}>
            <Footer />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  contenido: {
    position: 'absolute',
    top:'10%',
    width: '80%',
    height: '90%',
    marginLeft: '10%',
    backgroundColor: 'rgb(217, 175, 124)',
    flexDirection: 'column',
  },
  carta: {
    flex:1
  },
  footer:{
    marginTop: 60,
    paddingBlock:20
  },
  fondo: {
    position: 'absolute',
    width: '100%',
  }
});