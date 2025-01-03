import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; 

createRoot(document.getElementById('root')).render(
  <BrowserRouter>  {/* Envolvemos el componente App con BrowserRouter */}
    <App />
  </BrowserRouter>
);