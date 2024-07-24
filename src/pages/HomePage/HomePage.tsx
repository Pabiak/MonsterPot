import Parameter from '@/components/Parameter/Parameter';
import './HomePage.scss';
import PARAMETER_TYPES from '@/types/enums/components/ParameterTypes';
import Button from '@/components/Button/Button';
import FlowerImage from '@/assets/flower.png';

const HomePage = () => (
  <div className="homepage">
    <span className="homepage__title">Homepage</span>
    <div className="homepage__flower-info-container">
      <h1 className="homepage__flower-name">Monstera</h1>
      <span className="homepage__last-watering">Ostatnie podlewanie: 12:36</span>
    </div>
    <div className="homepage__card">
    <img src={FlowerImage} alt="flower" className="homepage__card__flower" />
      <div className="homepage__card__parameters">
        <Parameter type={PARAMETER_TYPES.HUMIDITY} value="75%" />
        <Parameter type={PARAMETER_TYPES.LIGHT} value="84%" />
        <Parameter type={PARAMETER_TYPES.TEMPERATURE} value="17C" />
      </div>
      <div className="homepage__card__last-update">
        Ostatnia aktualizacja: 29.05.2024 10:45
      </div>
      <div className="homepage__card__button">
        <Button text="Pobierz aktualne dane" onClick={() => console.log('Aktualne dane')} />
      </div>
    </div>
  </div>
);

export default HomePage;
