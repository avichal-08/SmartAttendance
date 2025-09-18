import React,{ lazy } from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Role from './pages/role';
import About from './pages/about';
import Features from './pages/features';
import Contact from './pages/contact';
import Tlayout from './pages/teacher/tlayout';
import Session from './pages/teacher/session';
import Slayout from './pages/student/slayout';
import TLogin from './pages/teacher/login';
import Tsignup from './pages/teacher/signup';
import Tdashboard from './pages/teacher/dashboard';
import Slogin from './pages/student/login';
import Ssignup from './pages/student/signup';
import StudentDashboard from './pages/student/dashboard';


export default function App(){
  return(
    <div className='bg-black/90 h-screen'>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/features' element={<Features/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/role' element={<Role/>}/>
      <Route path='/teacher/*' element={<Tlayout/>}>
          <Route path='login' element={<TLogin/>}/>
          <Route path='signup' element={<Tsignup/>}/>
          <Route path='dashboard' element={<Tdashboard/>}/>
          <Route path='session' element={<Session/>}/>
      </Route>
      <Route path='/student/*' element={<Slayout/>}>
          <Route path='login' element={<Slogin/>}/>
          <Route path='signup' element={<Ssignup/>}/>
          <Route path='dashboard' element={<StudentDashboard/>}/>
      </Route>
      
    </Routes>
    </BrowserRouter>
    </div>
  )
}