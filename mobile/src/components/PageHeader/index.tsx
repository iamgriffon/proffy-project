import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

interface PageHeader {
  title: string;
  headerHide?: ReactNode;
}

const PageHeader:React.FC<PageHeader> =  ({title, children, headerHide}) => {
  const { navigate} = useNavigation();
  const handleGoBack = () => navigate('LandingPage');
  return (
  <View style={styles.container}>
    <View style={styles.topBar}>
      <BorderlessButton onPress={handleGoBack}>
        <Image source={backIcon} resizeMode='contain'/>
      </BorderlessButton>
      <Image source={logoImg} resizeMode='contain' />
    </View>
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {headerHide}
    </View>
    
      
    {children}
  </View>
  )
}
export default PageHeader;