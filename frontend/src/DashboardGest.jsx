import { Routes, Route, Link } from 'react-router-dom';
// import FormStagiaire from './Components/FormStagiaire';
import ListStagiaires from './Components/ListStagiaires';
import ListDemandes from './Components/ListDemandes';
import './index.css';
import NavbarProfile from './Components/NavbarProfile';
import UserProfile from './UserProfile';
import { useState } from 'react';

function DashboardGest() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
              {
        isNavOpen && (
        <nav className={`bg-[#00246B] ${darkMode ? 'dark bg-gray-700 text-white' : ''} text-white p-4 transition-all duration-600 ease-in-out ${isNavOpen ? '' : '-translate-x-full'}`}>
          <ul className="flex flex-col">
            <div className="flex items-center align-middle mr-4 mb-8">
              <img src="/logo.png" alt="logo" className="w-12 h-12 mr-2" />
              <span className='align-middle font-bold'>ISTA HAY SALAM</span>
            </div>
            <li className="mb-4">
              <Link to='/dashboard-gestionnaire/listDemandes' className="hover:text-gray-300">Liste des demandes</Link>
            </li>
            <li className="mb-4">
              <Link to='/dashboard-gestionnaire/listStagiaires' className="hover:text-gray-300">Liste des stagiaires</Link>
            </li>
   
          </ul>
        </nav>
                )
              }
      <div className={`flex-grow ${darkMode ? 'dark bg-gray-800' : ''} bg-gray-100`}>
        <NavbarProfile toggleNav={toggleNav} toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
        <Routes>
          <Route path='/listDemandes' element={<ListDemandes darkMode={darkMode} />}/>
          {/* <Route path='/AddStagiaire' element={<FormStagiaire />}/> */}
          <Route path='/listStagiaires' element={<ListStagiaires darkMode={darkMode} />}/>
          <Route path="/profile" element={<UserProfile darkMode={darkMode} />} />
        </Routes>
        </div>
      </div>
);
}

export default DashboardGest
