//list stagiaire
import { useState, useEffect } from "react";
import axios from "axios";
import { XIcon } from '@heroicons/react/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faKey, faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import Stats from "./Stats";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";
import { useLocation } from "react-router-dom";

function ListStagiaires({darkMode}) {
  const [stagiaires, setStagiaires] = useState([]);
  const [selectedStagiaire, setSelectedStagiaire] = useState(null);
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate=useNavigate()

  const [msg,setMsg]=useState('')
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);

  const userData=useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user : null)

  useEffect(() => {
    document.title = "ISTA | Liste des demandes";
    axios.get("http://127.0.0.1:8000/api/stagiaires")
      .then((rep) => {
        const reversedStagiaires = [...rep.data].reverse();
        setStagiaires(reversedStagiaires);
      })
      .catch((error) => console.error("Error fetching stagiaires:", error));

    // Esc button
    const handleEscKeyPress = (event) => {
      if (event.keyCode === 27) {
        closeModal();
        closeChangeModal();
      }
    };

    window.addEventListener('keydown', handleEscKeyPress);

    return () => {
      window.removeEventListener('keydown', handleEscKeyPress);
    };
  }, []);

  useEffect(() => {
    setShowNotification(location.state && location.state.showNotification);
    setMsg(location.state && location.state.message)
  }, [location]);

  const openModal = (stagiaire) => {
    setSelectedStagiaire(stagiaire);
  };

  const closeModal = () => {
    setSelectedStagiaire(null);
  };

  const openChangeModal = (stagiaire) => {
    setSelectedPassword(stagiaire);
  };

  const closeChangeModal = () => {
    setSelectedPassword(null);
  };

  const handleChangePassword = async () => {
    try {
      const response = await axios.put('http://127.0.0.1:8000/api/change-password', {
        id: selectedPassword.id,
        password: newPassword,
        password_confirmation: confirmPassword
      });
      console.log(response.data.message);
      setNewPassword('');
      setConfirmPassword('');
      closeChangeModal();
      if(userData[0].role=='directeur'){
        navigate('/dashboard-directeur/listStagiaires', { state: { showNotification: true,message:'Changer avec succès'} })
      }
      else{
        navigate('/dashboard-gestionnaire/listStagiaires', { state: { showNotification: true,message:'Changer avec succès'} })
      }
      window.location.reload()
    } catch (error) {
      console.error("Error changing password:", error.response);
      console.error("Error changing password:");
    }
  };

  // Calculate indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter stagiaires based on search query
  const filteredStagiaires = stagiaires.filter(stagiaire => {
    const { nom, prenom, CIN } = stagiaire;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      nom.toLowerCase().includes(lowerCaseQuery) ||
      prenom.toLowerCase().includes(lowerCaseQuery) ||
      CIN.includes(searchQuery)
    );
  });

  const currentItems = filteredStagiaires.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <br />
      <Stats darkMode={darkMode}/>
      <div className={`container mx-auto px-4 py-8  ${darkMode ? 'dark bg-gray-800' : ''}`}>
      {showNotification && <Toast message={msg}/>} 
        <h1 className={`text-3xl font-bold mb-6  ${darkMode ? ' text-white' : ''}`}>Liste des comptes stagiaires</h1>
        <div className="mb-4 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par CIN, nom ou prénom"
            className={`block  ${darkMode ? 'dark bg-gray-800 text-white' : 'bg-white'} w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-3 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
            <tr className={`bg-gray-200 ${darkMode ? 'dark bg-gray-600 text-white' : ''}`}>
                <th className="px-4 py-2">Stagiaire</th>
                <th className="px-4 py-2">CIN</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((s) => (
                <tr key={s.id} className={`text-gray-700 ${darkMode ? 'dark bg-gray-800 text-white' : ''}`}>
                  <td className="border px-4 py-2">{s.nom + ' ' + s.prenom}</td>
                  <td className="border px-4 py-2">{s.CIN}</td>
                  <td className="border px-4 py-2">{s.email}</td>
                  <td className="border px-4 py-2 flex">
                    <button onClick={() => { openModal(s); }} className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 w-full text-sm" style={{ fontSize: '0.8rem' }}>
                      <FontAwesomeIcon icon={faEye} className="mr-2" />
                      Afficher
                    </button>
                    <button onClick={() => { openChangeModal(s) }} className="inline-block bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2 w-full text-sm" style={{ fontSize: '0.8rem' }}>
                      <FontAwesomeIcon icon={faKey} className="mr-2" />
                      Changer Mot de passe
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          {Array.from({ length: Math.ceil(filteredStagiaires.length / itemsPerPage) }, (_, index) => (
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
        {selectedStagiaire && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className={`${darkMode ? 'dark bg-gray-800 text-white' : 'bg-white'} p-8 rounded-lg shadow-lg w-full max-w-lg relative`}>
              <button onClick={closeModal} className="absolute top-2 right-2">
                <span title="Fermer">
                  <XIcon className="h-8 w-8 text-red-500 hover:text-red-700" aria-hidden="true" />
                </span>
              </button>
              <h2 className="text-xl font-bold mb-4">{selectedStagiaire.nom + ' ' + selectedStagiaire.prenom}</h2>
              <p><strong>CIN:</strong> {selectedStagiaire.CIN}</p>
              <p><strong>Email:</strong> {selectedStagiaire.email}</p>
            </div>
          </div>
        )}

        {selectedPassword && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className={`${darkMode ? 'dark bg-gray-800 text-white' : 'bg-white '}  p-8 rounded-lg shadow-lg w-full max-w-lg relative`}>
              <button onClick={closeChangeModal} className="absolute top-2 right-2">
                <span title="Fermer">
                  <XIcon className="h-8 w-8 text-red-500 hover:text-red-700" aria-hidden="true" />
                </span>
              </button>
              <h2 className="text-xl font-bold mb-4">Modifier le mot de passe de {selectedPassword.nom + ' ' + selectedPassword.prenom}</h2>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-semibold mb-1">Nouveau Mot de passe</label>
                <div className="relative">
                  <input type={showNewPassword ? "text" : "password"} id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={`input ${darkMode ? 'dark bg-gray-800 text-white' : ''} w-full h-10 text-gray-500 border rounded-md px-3 border-gray-300`} />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowNewPassword(!showNewPassword);
                    }}
                  >
                    <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-1">Confirmer Mot de passe</label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`input ${darkMode ? 'dark bg-gray-800 text-white' : ''} w-full h-10 text-gray-500 border rounded-md px-3 border-gray-300`} />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                  >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <button onClick={() => handleChangePassword()} className="mt-4 mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                  <FontAwesomeIcon icon={faSave} className="mr-2" />
                  Changer
                </button>
                <button onClick={closeChangeModal} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
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

export default ListStagiaires;
