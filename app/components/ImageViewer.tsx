import { ImageSourcePropType, StyleSheet } from "react-native";
import { Image } from 'expo-image';

type Props = {
    imgSource: ImageSourcePropType;
    selectedImage?: string;
}

export default function ImageViewer({ imgSource, selectedImage }: Props){
    const imageSource = selectedImage ? { uri: selectedImage} : imgSource;

    return <Image source={imageSource} style={styles.image} />
}

const styles = StyleSheet.create({
    image: {
        width: 230,
        height: 100,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    }
});