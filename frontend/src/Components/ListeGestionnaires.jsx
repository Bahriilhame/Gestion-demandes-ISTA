// ListGestionnaire

import { useState, useEffect } from "react";
import axios from "axios";
import { XIcon } from '@heroicons/react/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import Toast from "./Toast";
import { useLocation } from "react-router-dom";
import Stats from "./Stats";
import { useNavigate } from "react-router-dom";

function ListeAdministrateurs({darkMode}) {
  const [administrateurs, setAdministrateurs] = useState([]);
  const [selectedAdministrateur, setSelectedAdministrateur] = useState(null);
  const [modifiedNom, setModifiedNom] = useState("");
  const [modifiedPrenom, setModifiedPrenom] = useState("");
  const [modifiedEmail, setModifiedEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [msg,setMsg]=useState('')

  const navigate = useNavigate();

  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setShowNotification(location.state && location.state.showNotification);
    setMsg(location.state && location.state.message)
  }, [location]);

  useEffect(() => {
    document.title = "ISTA | Liste des gestionnaires"; 

    axios.get("http://127.0.0.1:8000/api/gestionnaires")
      .then((response) => {
        const gestionnaires=response.data.filter(res=>res.role==='gestionnaire')
        const reversedGestionnaires = [...gestionnaires].reverse();
        setAdministrateurs(reversedGestionnaires);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des administrateurs:", error);
      });
      
      // Esc button 
      const handleEscKeyPress = (event) => {
        if (event.keyCode === 27) {
          closeModal();
        }
      };
  
      window.addEventListener('keydown', handleEscKeyPress);
  
      return () => {
        window.removeEventListener('keydown', handleEscKeyPress);
      };
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/DeleteGestionnaire/${id}`).then(() => {
      setAdministrateurs(prevAdministrateurs => prevAdministrateurs.filter(administrateur => administrateur.id !== id));
      navigate('/dashboard-directeur/listGestionnaire', { state: { showNotification: true,message:'Supprimer avec succès'} })
      window.location.reload()
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de l'administrateur:", error);
    });
  };

  const openModal = (administrateur) => {
    setSelectedAdministrateur(administrateur);
    setModifiedNom(administrateur.nom);
    setModifiedPrenom(administrateur.prenom);
    setModifiedEmail(administrateur.email);
  };

  const closeModal = () => {
    setSelectedAdministrateur(null);
    setModifiedNom("");
    setModifiedPrenom("");
    setModifiedEmail("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSave = () => {
    const { id } = selectedAdministrateur;
    
    if (newPassword !== confirmPassword) {
      // Afficher un message d'erreur ou une notification
      console.error("Les mots de passe ne correspondent pas");
      return;
    }

    const updatedData = {
      nom: modifiedNom,
      prenom: modifiedPrenom,
      email: modifiedEmail,
      password: newPassword, // Nouveau mot de passe
    };

    axios.put(`http://127.0.0.1:8000/api/UpdateGestionnaire/${id}`, updatedData)
      .then(() => {
        // window.location.href = '/dashboard-directeur/listGestionnaire';
        navigate('/dashboard-directeur/listGestionnaire', { state: { showNotification: true,message:'Modifier avec succès'} })
        window.location.reload()
  
        closeModal();
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'administrateur:", error);
      });
  };

  // Calculate indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = administrateurs.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`${darkMode ? 'dark bg-gray-800' : ''}`}>
        <br />
        <Stats darkMode={darkMode}/>
        <div className={`container mx-auto px-4 py-8  ${darkMode ? 'dark bg-gray-800' : ''}`}>
          {showNotification && <Toast message={msg}/>} 
        <h1 className={`text-3xl font-bold mb-6  ${darkMode ? ' text-white' : ''}`}>Liste des gestionnaires</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className={`bg-gray-200 ${darkMode ? 'dark bg-gray-600 text-white' : ''}`}>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Prénom</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((administrateur) => (
                <tr key={administrateur.id} className={`text-gray-700 ${darkMode ? 'dark bg-gray-800 text-white' : ''}`}>
                  <td className="border px-4 py-2">{administrateur.nom}</td>
                  <td className="border px-4 py-2">{administrateur.prenom}</td>
                  <td className="border px-4 py-2">{administrateur.email}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => openModal(administrateur)} className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 w-[48%]" style={{ fontSize: '0.8rem' }}>
                      <FontAwesomeIcon icon={faEye} className="mr-2" />
                      Modifier
                    </button>
                    <button onClick={() => handleDelete(administrateur.id)} className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-[48%]" style={{ fontSize: '0.8rem' }}>
                      <FontAwesomeIcon icon={faTrash} className="mr-2" />
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          {Array.from({ length: Math.ceil(administrateurs.length / itemsPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {selectedAdministrateur && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className={`${darkMode ? 'dark bg-gray-800 text-white' : 'bg-white'}  p-8 rounded-lg shadow-lg w-full max-w-lg relative`}>
              <button onClick={closeModal} className="absolute top-2 right-2">
                <span title="Fermer">
                  <XIcon className="h-8 w-8 text-red-500 hover:text-red-700" aria-hidden="true"/>
                </span>
              </button>
              <h2 className="text-xl font-bold mb-4">Modifier les infos de {selectedAdministrateur.nom + ' ' + selectedAdministrateur.prenom}</h2>
              <div className="mb-4">
                <label htmlFor="modifiedNom" className="block text-sm font-semibold mb-1">Nom:</label>
                <input
                  type="text"
                  id="modifiedNom"
                  value={modifiedNom}
                  onChange={(e) => setModifiedNom(e.target.value)}
                  className={`input ${darkMode ? 'dark bg-gray-800 text-gray-200' : ''} w-full h-10 text-gray-500 border rounded-md px-3 border-gray-300`}
                  placeholder="Entrez le nom modifié"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="modifiedPrenom" className="block text-sm font-semibold mb-1">Prénom:</label>
                <input
                  type="text"
                  id="modifiedPrenom"
                  value={modifiedPrenom}
                  onChange={(e) => setModifiedPrenom(e.target.value)}
                  className={`input ${darkMode ? 'dark bg-gray-800 text-white' : ''} w-full h-10 text-gray-500 border rounded-md px-3 border-gray-300`}
                  placeholder="Entrez le prénom modifié"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="modifiedEmail" className="block text-sm font-semibold mb-1">Email:</label>
                <input
                  type="email"
                  id="modifiedEmail"
                  value={modifiedEmail}
                  onChange={(e) => setModifiedEmail(e.target.value)}
                  className={`input ${darkMode ? 'dark bg-gray-800 text-white' : ''} w-full h-10 text-gray-500 border rounded-md px-3 border-gray-300`}
                  placeholder="Entrez l'email modifié"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-semibold mb-1">Nouveau mot de passe:</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`input ${darkMode ? 'dark bg-gray-800 text-white' : ''} w-full h-10 text-gray-500 border rounded-md px-3 border-gray-300 pr-10`}
                    placeholder="Entrez le nouveau mot de passe"
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-1">Confirmez le mot de passe:</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`input ${darkMode ? 'dark bg-gray-800 text-white' : ''} w-full h-10 text-gray-500 border rounded-md px-3 border-gray-300 pr-10`}
                    placeholder="Confirmez le mot de passe"
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <button onClick={handleSave} className="mt-4 mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                  <FontAwesomeIcon icon={faSave} className="mr-2" />
                  Sauvegarder
                </button>
                <button onClick={closeModal} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListeAdministrateurs;
