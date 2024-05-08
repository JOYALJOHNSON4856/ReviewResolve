import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Auth from './components/Auth';
import { ToastContainer, toast } from 'react-toastify';
import Owner from './pages/Owner';
import Admins from './components/Admins';
import { tokenauthzz } from './Context/TokenAuth';
import { useContext } from 'react';

function App() {
  const{istokenauth,setistokenauth}=useContext(tokenauthzz)
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/admin' element={<Owner/>}/>
      <Route path='/adminlogin' element={<Admins/>}/>
    
   
     </Routes>
     <Footer/>
     <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={true}
     />
    </div>
  );
}

export default App;
