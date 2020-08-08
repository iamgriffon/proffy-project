import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import styles from './styles';
import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClasses from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png'

const LandingPage = () => {
  const { navigate  } = useNavigation();
  const handleNavigationToGiveClassesPage = () => navigate('GiveClasses');
  const handleNavigationToStudyPage = () => navigate('Study');

  return (
    <View style={styles.container}>
      <Image style={styles.banner} source={landingImg} />
      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>
      <View style={styles.buttonContainer}>
        <RectButton onPress={handleNavigationToStudyPage} style={[styles.button, styles.buttonPrimary]}>
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton onPress={handleNavigationToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
          <Image source={giveClasses} />
          <Text style={styles.buttonText}>Dar Aulas</Text>
        </RectButton>
      </View>
      <Text style={styles.totalConnections}>Um total de de 999 conexões {' '}
       <Image source={heartIcon} /> </Text>
    </View>
  )
}
export default LandingPage;