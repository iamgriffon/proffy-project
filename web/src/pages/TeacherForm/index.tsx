import React, { useState, useEffect, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import './styles.css'
import InputForm from '../../components/InputForm';
import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/TextArea/text-area';
import Select from '../../components/SelectBox';
import CpfMask from '../../utils/cpf-mask';
import { FaRegTimesCircle, FaRegCheckCircle } from 'react-icons/fa';
import Api from '../../services/api';
import { useHistory } from 'react-router-dom';

const TeacherForm = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [subjects, setSubjects] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [scheduleItems, setScheduleItems] = useState([{ week_day: '', from: '', to: '' }]);
  const [CPF, setCPF] = useState('');
  const [cost, setCost] = useState<number>();
  const [checkPW, setCheckPW] = useState<boolean>();


  const handleMaskCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCPF(CpfMask(event.target.value));
  };

  const handleChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = (event.target.value);
    const transformToCurrency = number.replace(',', ".");
    const formattedNumber = +transformToCurrency;
    const formattedCurrency = +formattedNumber.toFixed(2);
    setCost(formattedCurrency);
  };

  const checkPasswords = () => {
    if (passwordInput !== confirmPassword) {
      setPassword('');
      setCheckPW(false);
    } else {
      setPassword(passwordInput);
      setCheckPW(true);
    };
  };

  const setScheduleItemValue = (position: number, field: string, value: string) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value }
      }
      return scheduleItem;
    });
    setScheduleItems(updatedScheduleItems);
  }

  const addNewScheduleItem = () => {
    setScheduleItems([...scheduleItems, { week_day: '', from: '', to: '' }])
  }

  useEffect(() => {
    checkPasswords()
  }, [checkPasswords]);

  const handleAddClass = (event: FormEvent) => {
    event.preventDefault();
    const formData = {
      name,
      whatsapp: whatsApp,
      email,
      avatar,
      bio,
      subjects,
      schedule: scheduleItems,
      cost,
      CPF,
      password,
    }
    Api.post('/classes', formData).then(() => {
      alert('Cadastro realizado com sucesso!');
      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro');
    })
    console.log(formData);
  };

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader title='Que incrível que você quer dar aulas.'
        description='O primeiro passo é preencher esse formulário de inscrição! ' />

      <main>
        <form onSubmit={handleAddClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <InputForm name='name' type='text' label='Nome Completo' value={name} onChange={(e) => setName(e.target.value)} />
            <InputForm name='whatsapp' type='number' label='WhatsApp' value={whatsApp} onChange={(e) => setWhatsApp(e.target.value)} />
            <InputForm name='avatar' type='text' label='Insira um link de uma foto sua (começando com https://)' value={avatar} onChange={(e) => setAvatar(e.target.value)} />
            <InputForm name='email' type='email' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <TextArea name='bio' label='Escreva sua biografia aqui!' value={bio} onChange={(e) => setBio(e.target.value)} />
            <br />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              label='Area de Ensino'
              name='subjects'
              value={subjects} onChange={(e) => setSubjects(e.target.value)}
              options={[
                { value: 'Exatas', label: 'Exatas' },
                { value: 'Humanas', label: 'Humanas' },
                { value: 'Biológicas', label: 'Biológicas' },
                { value: 'Artes', label: 'Artes' },
                { value: 'Ensino de Idiomas', label: 'Ensino de Idiomas' },
              ]}
            />
            <br />
            <InputForm label='Custo da sua hora/aula em R$ e separado por vírgula (,)' type='number' name='cost' value={cost} onChange={handleChangeCurrency} />
          </fieldset>

          <fieldset>
            <legend>Horários disponíveis
          <button type='button' onClick={addNewScheduleItem}>+ Novo horário</button>
            </legend>
            {
              scheduleItems.map((scheduleitem, index) => (
                <div className="schedule-item" key={index}>
                  <Select label='Dia da semana' name='week_day' value={scheduleitem.week_day}
                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sábado' },
                    ]}
                  />
                  <InputForm name='from' label='De' type='time' value={scheduleitem.from} onChange={e => setScheduleItemValue(index, 'from', e.target.value)} />
                  <InputForm name='to' label='Até' type='time' value={scheduleitem.to} onChange={e => setScheduleItemValue(index, 'to', e.target.value)} />
                </div>
              ))
            }
          </fieldset>

          <fieldset>
            <legend>Sua senha</legend>
            <InputForm name='CPF' type='text' label='Seu CPF' maxLength={14} value={CPF} onChange={handleMaskCpf} />
            <InputForm name='password' type='password' label='Sua senha' value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
            <InputForm name='confirm-password' type='password' label='Confirme sua senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {
              checkPW ? (<span> As senhas <strong>conferem</strong> <FaRegCheckCircle /></span>) : (<span>As senhas <strong>NÃO conferem</strong> <FaRegTimesCircle /> </span>)
            }
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante!" />
            Importante! <br />
            Preencha todos os dados
          </p>
            <button type='submit'>Salvar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm;