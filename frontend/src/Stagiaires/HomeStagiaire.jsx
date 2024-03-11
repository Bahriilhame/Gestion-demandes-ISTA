import { Link } from "react-router-dom";
import { UserCircleIcon } from '@heroicons/react/outline';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Demande from './Demande'


function HomeStagiaire() {
    const userData = localStorage.getItem('stagiaire') ? JSON.parse(localStorage.getItem('stagiaire')) : null;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [demandeStatus, setDemandeStatus] = useState(null);
    const [allDemandes, setAllDemandes] = useState([]);

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

    const handleAfficherToutesDemandes = () => {
        // Si le tableau des demandes est déjà affiché, cacher le tableau et réinitialiser les demandes
        if (allDemandes.length > 0) {
            setAllDemandes([]); // Réinitialiser les demandes à un tableau vide
        } else {
            // Sinon, charger toutes les demandes
            axios.get(`http://127.0.0.1:8000/api/stagiaire/${userData.id}/demandes`)
                .then(response => {
                  const reversedDemandes=[...response.data].reverse()
                    setAllDemandes(reversedDemandes);
                })
                .catch(error => {
                    console.error('Error fetching all demandes:', error);
                });
        }
    };

    function formatDate(dateString) {
      const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
      const date = new Date(dateString);
      const month = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
    }

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
                                <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">{userData.nom + ' ' + userData.prenom}</div>
                                <Link onClick={() => { localStorage.removeItem("stagiaire") }} to="/" className="block px-4 py-2 text-red-500 font-bold hover:bg-gray-200">Déconnexion</Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            {demandeStatus ? (
                <div className={`text-center p-4 shadow-md ${
                    demandeStatus === "En cours de traitement" ? "bg-yellow-300" :
                        demandeStatus === "Approuvé" ? "bg-green-300" :
                            demandeStatus === "Rejeté" ? "bg-red-500" :
                                ""
                    }`}>
                    <p className="text-xl font-bold text-gray-600">Statut de la dernière demande : <br />
                        <span className="font-semibold text-white">
                            {demandeStatus}
                        </span>
                    </p>
                    <div className="flex justify-center my-2">
                        <button onClick={handleAfficherToutesDemandes} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 text-sm rounded">
                            {allDemandes.length > 0 ? "Masquer les demandes" : "Afficher toutes les demandes"}
                        </button>
                    </div>
                </div>
            ) : (
                <span className="text-sm text-gray-500"></span>
            )}
            {allDemandes.length > 0 && (
                <div className="container p-3 sm:m-2 mx-auto">
                    <h1 className="text-center font-bold m-4 text-xl">Toutes les demandes</h1>
                    <table className="w-full border-collapse border border-gray-200 text-sm sm:text-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-200 px-4 py-2">Type de demande</th>
                                <th className="border border-gray-200 px-4 py-2">Statut</th>
                                <th className="border border-gray-200 px-4 py-2">Date demande</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allDemandes.map(demande => (
                                <tr key={demande.id}>
                                    <td className="border border-gray-200 px-4 py-2">{demande.typeDemande}</td>
                                    <td className='text-center p-4 border border-gray-200'>
                                        <div className={`p-1 ${
                                            demande.status === "En cours de traitement" ? "bg-yellow-300" :
                                                demande.status === "Approuvé" ? "bg-green-300" :
                                                    demande.status === "Rejeté" ? "bg-red-500" :
                                                        ""
                                            }`}>{demande.status}</div></td>
                                    <td className="border border-gray-200 px-4 py-2">{formatDate(demande.dateSoumission)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {allDemandes.length === 0 && (
              <div>
                <h1 className="text-center font-bold m-4 text-2xl">Formulaire des demandes</h1>
                <Demande/>
              </div>
            )}
        </div>
    )
}

export default HomeStagiaire;
