import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';
import { createConnection } from 'net';
import Api from '../../services/api';

export interface Teacher {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  subjects: string;
  cost: number;
  email: string;
  whatsapp: string;
}

interface TeacherProps {
  teacher: Teacher;
}


const TeacherItem: React.FC<TeacherProps> = ({ teacher }) => {

  const createConnection = () => {
    Api.post('/connections', {
      user_id: teacher.id
    });
  }

  return (
    <main>
      <article className="teacher-item">
        <header>
          <img src={teacher.avatar} alt={teacher.name} />
          <div>
            <strong>{teacher.name}</strong>
            <span>{teacher.subjects}</span>
          </div>
        </header>

        <p>{teacher.bio}</p>

        <footer>
          <p>
            Preço/Hora:
          <strong>R$ {teacher.cost}</strong>
          </p>
          
            <a
              target='_blank'
              onClick={createConnection}
              href={`https://wa.me/${teacher.whatsapp}?text=`}>

              <img src={whatsappIcon} alt="WhatsApp" />
            Entrar em contato
          </a>
          
        </footer>
      </article>
    </main>
  )
}

export default TeacherItem;