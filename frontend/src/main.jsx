import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FormStagiaire from './Components/FormStagiaire';
import ListStagiaires from './Components/ListStagiaires';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="flex h-screen">
        <nav className="bg-[#00246B] text-white p-4">
          <ul className="flex flex-col">
            <div className="flex items-center align-middle mr-4 mb-8">
              <img src="/logo.png" alt="logo" className="w-12 h-12 mr-2" />
              <span className='align-middle font-bold'>ISTA HAY SALAM</span>
            </div>
            <li className="mb-4">
              <Link to='/' className="hover:text-gray-300">Liste des stagiaires</Link>
            </li>
            <li>
              <Link to='/AddStagiaire' className="hover:text-gray-300">Form Ajout des stagiaires</Link>
            </li>
          </ul>
        </nav>
        <div className="flex-grow">
          <Routes>
            <Route path='/' element={<ListStagiaires />}/>
            <Route path='/AddStagiaire' element={<FormStagiaire />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
);

