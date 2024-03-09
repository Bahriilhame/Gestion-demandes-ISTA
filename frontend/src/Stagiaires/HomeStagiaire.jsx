import { Link } from "react-router-dom";
import FormStagiaire from './FormStagiaire'
import { UserCircleIcon } from '@heroicons/react/outline';
import { useState } from "react";

function HomeStagiaire() {
    const userData = localStorage.getItem('stagiaire') ? JSON.parse(localStorage.getItem('stagiaire')) : null;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };

  return (
    <div className='overflow-hidden bg-gray-100'>
          <nav className="bg-[#00246B] p-4 z-10">
      <div className="flex items-center align-middle justify-between p-2">
          <div className="flex items-center justify-start">
              <img src='./logo.png' alt="Logo" className="h-10" />
              <div className='text-white ml-2 font-bold text-lg'>
                  <h1>ISTA HAY SALAM</h1>
              </div>
          </div>        
          <div className="relative">
          <button onClick={toggleDropdown} className="text-white px-4 hover:text-gray-300 focus:outline-none">
            <UserCircleIcon className="h-8 w-8 text-gray-100" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white rounded shadow-lg">
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">{userData.nom + ' '+userData.prenom}</div>
              <Link  onClick={()=>{localStorage.removeItem("stagiaire")}} to="/" className="block px-4 py-2 text-red-500 font-bold hover:bg-gray-200">Déconnexion</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
      <h1 className="text-center font-bold text-lg m-2">Form des demandes</h1>
      <FormStagiaire/>
    </div>
  )
}

export default HomeStagiaire
