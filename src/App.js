import Country from './components/Country';
import './App.css';
import { Card } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Card sx={{ maxWidth: 300, mx: 'auto', mt: 2, boxShadow: 3 }}>
        <Country/>
      </Card>
    </div>
  );
}

export default App;
