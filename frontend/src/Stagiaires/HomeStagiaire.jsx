  import { Link } from "react-router-dom";
  import FormStagiaire from './FormStagiaire'
  import { UserCircleIcon } from '@heroicons/react/outline';
  import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

  function HomeStagiaire() {
      const userData = localStorage.getItem('stagiaire') ? JSON.parse(localStorage.getItem('stagiaire')) : null;
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const [demandeStatus, setDemandeStatus] = useState(null);

      const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
      };

      useEffect(() => {
          if (userData) {
              axios.get(`http://127.0.0.1:8000/api/stagiaire/${userData.id}/demande`)
                  .then(response => {
                      setDemandeStatus(response.data.status);
                  })
                  .catch(error => {
                      console.error('Error fetching demande status:', error);
                  });
          }
      }, [userData]);

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
            {demandeStatus ? (
              <div className="text-center bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="text-xl font-bold text-gray-600">Statut de la dernier demande : <br />
                  {/* <span>{demandeStatus}</span> */}
                  <span className={`font-semibold ${
                      demandeStatus === "En cours de traitement" ? "text-yellow-500" :
                      demandeStatus === "Approuvé" ? "text-green-500" :
                      demandeStatus === "Rejeté" ? "text-red-500" :
                      ""
                  }`}>
                      {demandeStatus}
                  </span>
                </p>
              </div>
            ) : (
              <span className="text-sm text-gray-500"></span>
              )}
        <h1 className="text-center font-bold m-4 text-2xl">Formulaire des demandes</h1>
        <FormStagiaire/>
      </div>
    )
  }

  export default HomeStagiaire
