import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes/route';
import { AuthLayout } from './layouts/AuthLayout/AuthLayout'; 
import { AdminLayout } from './layouts/AdminLayout/AdminLayout';
import { ShipperLayout } from './layouts/ShipperLayout/ShipperLayout';
 

function App() {
  return ( 
    <Routes> 
      <Route path='auth/*' element={<AuthLayout />} />
      <Route path='admin/*' element={<AdminLayout />} /> 
      <Route path='shipper/*' element={<ShipperLayout />} />
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes> 
  );
}

export default App;
