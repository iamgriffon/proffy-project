import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import landing from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClasses from '../../assets/images/icons/give-classes.svg';
import purpleHeart from '../../assets/images/icons/purple-heart.svg';
import './styles.css';
import Api from '../../services/api';

const Landing = () => {

  const [connections, setConnections] = useState(0);

  useEffect(() => {
    Api.get('/connections').then(response => setConnections(response.data.total));
  },[]);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logo} alt="Proffy"/>
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img src={landing} alt="Sua plataforma de estudos" className="hero-image"/>
          <div className="buttons-container">
            <Link to="/study" className="study">
              <img src={studyIcon} alt="Estudar"/>
              Estudar
            </Link>

            <Link to="/give-classes" className="give-classes">
              <img src={giveClasses} alt="Dar Aulas"/>
              Dar Aulas
            </Link>
          </div>

          <span className="total-connections">
            Total de {connections} conexões já realizadas.
            <img src={purpleHeart} alt="Coração Roxo"/>
          </span>

      </div>
    </div>
  )
}
export default Landing;