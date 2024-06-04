import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/index';
import Login from '../pages/login';
import Register from '../pages/register';
import Analysis from '../pages/dashboard/analysis';
import UserConfiguration from '../pages/dashboard/userConfiguration';
import Profile from '../pages/dashboard/profile';
import History from '../pages/dashboard/history';
import DetailHistory from '../pages/dashboard/detailHistory';
import Statistics from '../pages/dashboard/statistics';
import "../index.css"


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="login" element={ <Login/> } />
          <Route path="register" element={ <Register/> } />
          <Route path="/dashboard/" element={ <History/> } />
          <Route path="/dashboard/analysis" element={ <Analysis/> } />
          <Route path="/dashboard/user-configuration" element={ <UserConfiguration/> } />
          <Route path="/dashboard/profile" element={ <Profile/> } />
          <Route path="/dashboard/history/:id" element={ <DetailHistory/> } />
          <Route path="/dashboard/statistics" element={ <Statistics/> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
