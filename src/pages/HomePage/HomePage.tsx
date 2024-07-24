import PARAMETER_TYPES from '@/types/enums/components/ParameterTypes';

import Parameter from '@/components/Parameter/Parameter';
import Button from '@/components/Button/Button';

import FlowerImage from '@/assets/flower.png';

import './HomePage.scss';

const HomePage = () => (
  <div className="home-page">
    <span className="home-page__title">Homepage</span>
    <div className="home-page__flower-info-container">
      <h1 className="home-page__flower-name">Monstera</h1>
      <span className="home-page__last-watering">Ostatnie podlewanie: 12:36</span>
    </div>
    <div className="home-page__card">
      <img src={FlowerImage} alt="flower" className="home-page__card__flower" />
      <div className="home-page__card__parameters">
        <Parameter type={PARAMETER_TYPES.HUMIDITY} value="75%" />
        <Parameter type={PARAMETER_TYPES.LIGHT} value="84%" />
        <Parameter type={PARAMETER_TYPES.TEMPERATURE} value="17C" />
      </div>
      <div className="home-page__card__last-update">
        Ostatnia aktualizacja: 29.05.2024 10:45
      </div>
      <div className="home-page__card__button">
        <Button text="Pobierz aktualne dane" onClick={() => console.log('Aktualne dane')} />
      </div>
    </div>
  </div>
);

export default HomePage;
