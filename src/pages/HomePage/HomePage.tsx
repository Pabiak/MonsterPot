import Button from '@/components/Button/Button';

const HomePage = () => (
  <div style={{
    display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh',
  }}
  >
    <Button text="Pobierz aktualne dane" onClick={() => console.log('Button clicked')} />
    <Button text="Zatwierdź" onClick={() => console.log('Button clicked')} />
  </div>
);

export default HomePage;
