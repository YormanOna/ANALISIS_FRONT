import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home}from './pages/home';
import {Login} from './pages/login';
import {Registro} from './pages/client/registro';
import {AdminHome} from './pages/admin/adminHome';
import {Index} from './pages/index';
import {Menu} from './pages/menu';
import {Contact} from './pages/contact';
import {Calendario} from './pages/client/calendario_Client';
import {Cotizacion} from './pages/client/cotizacion';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/home" element={<Index />} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/cotizacion" element={<Cotizacion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;