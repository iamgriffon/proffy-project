import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import styles from './styles';
import giveClassesBGImage from '../../assets/images/give-classes-background.png';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const GiveClasses = () => {
  const {goBack} = useNavigation();
  const handleGoBack = () => goBack();
  return(
    <View style={styles.container}>
      <ImageBackground resizeMode='contain' source={giveClassesBGImage} style={styles.content}>
      <Text style={styles.title}>Quer ser um Proffy?</Text>
      <Text style={styles.description}>Para começar, você precisa se cadastrar em nossa plataforma web.</Text>
      </ImageBackground>
      <RectButton onPress={handleGoBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo bem!</Text>
      </RectButton>
    </View>
  )
}
export default GiveClasses;