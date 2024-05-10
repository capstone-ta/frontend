import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/index';
import Login from '../pages/login';
import Register from '../pages/register';
import Dashboard from '../pages/dashboard/index';
import Pengujian from '../pages/dashboard/pengujian';
import Konfigurasi from '../pages/dashboard/konfigurasi';
import Pengguna from '../pages/dashboard/pengguna';
import History from '../pages/dashboard/history';
import Measurements from '../pages/dashboard/measurement';
import "../index.css"


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="login" element={ <Login/> } />
          <Route path="register" element={ <Register/> } />
          <Route path="/dashboard/" element={ <Dashboard/> } />
          <Route path="/dashboard/pengujian" element={ <Pengujian/> } />
          <Route path="/dashboard/konfigurasi" element={ <Konfigurasi/> } />
          <Route path="/dashboard/user" element={ <Pengguna/> } />
          <Route path="/dashboard/history" element={ <History/> } />
          <Route path="/dashboard/history/:id" element={ <Measurements/> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
