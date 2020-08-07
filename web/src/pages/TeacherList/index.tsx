import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader'
import './styles.css';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import InputForm from '../../components/InputForm';
import Select from '../../components/SelectBox';
import Api from '../../services/api';


const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const searchTeachers = async(event:FormEvent) => {
    event.preventDefault();

    const response = await Api.get('/classes', {
      params: {
        subject,
        week_day: weekDay,
        time,
      }
    })
   setTeachers(response.data.classes);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title='Estes são os proffys disponíveis.'>
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select label='Área de Ensino' name='fields' value={subject} onChange={e => setSubject(e.target.value)}
            options={[
              { value: 'Exatas', label: 'Exatas' },
              { value: 'Humanas', label: 'Humanas' },
              { value: 'Biológicas', label: 'Biológicas' },
              { value: 'Artes', label: 'Artes' },
              { value: 'Ensino de Idiomas', label: 'Ensino de Idiomas' },
            ]}>

          </Select>

          <Select label='Dia da semana' name='week_day' value={weekDay} onChange={e => setWeekDay(e.target.value)}
            options={[
              {value: '0', label: 'Domingo'},
              {value: '1', label: 'Segunda-feira' },
              {value: '2', label: 'Terça-feira' },
              {value: '3', label: 'Quarta-feira' },
              {value: '4', label: 'Quinta-feira' },
              {value: '5', label: 'Sexta-feira' },
              {value: '6', label: 'Sábado' },
            ]}>
          </Select>

          <InputForm label='Horário' type='time' name='Escolha um horário' value={time} onChange={e => setTime(e.target.value)} />

          <button type="submit">Buscar</button>

        </form>
      </PageHeader>
      {
        teachers.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))
      }
      
    </div>
  )
}

export default TeacherList;