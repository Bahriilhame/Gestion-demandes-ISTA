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

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
      <div className="flex h-screen bg-gray-100">
              {
        isNavOpen && (
        <nav className="bg-[#00246B] text-white p-4">
          <ul className="flex flex-col">
            <div className="flex items-center align-middle mr-4 mb-8">
              <img src="/logo.png" alt="logo" className="w-12 h-12 mr-2" />
              <span className='align-middle font-bold'>ISTA HAY SALAM</span>
            </div>
            <li className="mb-4">
              <Link to='/dashboard-gestionnaire/listDemandes' className="hover:text-gray-300">Liste des demandes</Link>
            </li>
            {/* <li className="mb-4">
              <Link to='/dashboard-gestionnaire/AddStagiaire' className="hover:text-gray-300">Form Ajout des stagiaires</Link>
            </li>        */}
            <li className="mb-4">
              <Link to='/dashboard-gestionnaire/listStagiaires' className="hover:text-gray-300">Liste des stagiaires</Link>
            </li>
   
          </ul>
        </nav>
                )
              }
        <div className="flex-grow">
        <NavbarProfile toggleNav={toggleNav}/>
        <Routes>
          <Route path='/listDemandes' element={<ListDemandes />}/>
          {/* <Route path='/AddStagiaire' element={<FormStagiaire />}/> */}
          <Route path='/listStagiaires' element={<ListStagiaires />}/>
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
        </div>
      </div>
);
}

export default DashboardGest
