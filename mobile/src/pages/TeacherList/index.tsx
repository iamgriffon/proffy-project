import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import Api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isfiltersVisible, setIsFiltersVisible] = useState(false);
  const [subjects, setSubjects] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id;
        });
        setFavorites(favoritedTeachersIds);
      }
    });
  };

  useFocusEffect(() => {
    loadFavorites();
  });

  
  const handleToggleFiltersVisible = () => setIsFiltersVisible(!isfiltersVisible);

  const handleFilteredSubmit = async () => {
    loadFavorites();

    const response = await Api.get('/classes', {
      params: {
        subject: subjects,
        week_day: weekDay,
        time,
      }
    });

    setTeachers(response.data.classes);
    handleToggleFiltersVisible();
  };

  return (
    <View style={styles.container}>
      <PageHeader title='Proffys Disponíveis'
        headerHide={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name='filter' size={20} color='#FFF' />
          </BorderlessButton>)
        }>

        {isfiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria aqui</Text>
            <TextInput style={styles.input} placeholder='Qual a matéria?' placeholderTextColor='#C1BCCC' value={subjects} onChangeText={text => setSubjects(text)} />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da Semana</Text>
                <TextInput style={styles.input} placeholder='Qual o Dia?' placeholderTextColor='#C1BCCC' value={weekDay} onChangeText={text => setWeekDay(text)} />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput style={styles.input} placeholder='Qual horário?' placeholderTextColor='#C1BCCC' value={time} onChangeText={text => setTime(text)} />
              </View>

            </View>

            <RectButton style={styles.submitButton} onPress={handleFilteredSubmit}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>

        )}
      </PageHeader>

      <ScrollView style={styles.teacherList}>
        {
          teachers.map((teacher: Teacher) => {
            return <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />
          })
        }

      </ScrollView>
    </View>
  )
}
export default TeacherList;