import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MasterPage from './masterpage';
import Loginform from './loginform.jsx';
import Account from './account.jsx';
import Studentregration from './studentregration.jsx';
import Studentlogin from './studentlogin.jsx';
import Dashboard from './dashboard.jsx';
import Addquestion from './addquestion.jsx';
import Studentdashboard from './studentdashboard.jsx';
import EditProfile from './editprofile.jsx';
import Myprofile from './myprofile.jsx';
import Otp from './otp.jsx';
import Studentprofile from './studentprofile.jsx';
import Regesterdstudents from '../regesteredstudents.jsx';
import Studentplan from './studentplan.jsx';
import Studentdetail from './studentdetail.jsx';
import Questionpagenew from './questionpagenew.jsx';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MasterPage />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/loginform" element={<Loginform />} />
        <Route path="/Studentregration" element={<Studentregration />} />
        <Route path="/studentlogin" element={<Studentlogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addquestion" element={<Addquestion />} />
        <Route path="/studentdashboard" element={<Studentdashboard />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/Myprofile" element={<Myprofile />} />
        <Route path="/Otp" element={<Otp />} />
        <Route path="/studentprofile" element={<Studentprofile />} />
        <Route path="/Regesterdstudents" element={<Regesterdstudents />} />
        <Route path="/studentplan" element={<Studentplan />} />
        <Route path="/Studentdetail" element={<Studentdetail />} />
        <Route path="/Questionpagenew" element={<Questionpagenew />} />

        









        
      </Routes>
    </BrowserRouter>
    
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
