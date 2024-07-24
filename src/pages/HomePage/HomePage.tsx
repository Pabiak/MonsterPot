import Button from '@/components/Button/Button';
import Parameter from '@/components/Parameter/Parameter';
import PARAMETER_TYPES from '@/types/enums/components/ParameterTypes';

const HomePage = () => (
  <div style={{
    display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh',
  }}
  >
    <Button text="Pobierz aktualne dane" onClick={() => console.log('Button clicked')} />
    <Button text="Zatwierdź" onClick={() => console.log('Button clicked')} />

    <Parameter type={PARAMETER_TYPES.HUMIDITY} value="50%" />
    <Parameter type={PARAMETER_TYPES.LIGHT} value="50%" />
    <Parameter type={PARAMETER_TYPES.TEMPERATURE} value="50%" />
  </div>
);

export default HomePage;
