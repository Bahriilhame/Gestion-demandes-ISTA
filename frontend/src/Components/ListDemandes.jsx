import { useState, useEffect } from "react";
import axios from "axios";
import { XIcon } from '@heroicons/react/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";
import Toast from "./Toast";
import Stats from "./Stats";

function ListStagiaires() {
  const [Demandes, setDemandes] = useState([]);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setShowNotification(location.state && location.state.showNotification);
  }, [location]);

  useEffect(() => {
    document.title = "ISTA | Liste des demandes";
    axios.get("http://127.0.0.1:8000/api/demandes")
      .then((rep) => {
        const reversedDemandes = [...rep.data].reverse();
        setDemandes(reversedDemandes);
      })
      .catch((error) => console.error("Error fetching demandes:", error));

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

  function formatDate(dateString) {
    const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  const filterByType = (type) => {
    setFilterType(type);
  };

  console.log(Demandes.length);
  const filteredDemandes = filterType
    ? Demandes.filter(demande =>
      demande.typeDemande=== filterType
    )
    : Demandes;


  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/DeleteDemande/${id}`).then(() => {
      setDemandes(prevDemandes => prevDemandes.filter(demande => demande.id !== id));
    })
      .catch((error) => console.error("Error deleting stagiaire:", error));
  };

  const openModal = (demande) => {
    setSelectedDemande(demande);
  };

  const closeModal = () => {
    setSelectedDemande(null);
  };

  const getBackgroundColor = (demande) => {
    if (demande==="Attestation de poursuite") {
      return "bg-green-500 bg-opacity-20 ";
    } else if (demande==="Attestation interruption") {
      return "bg-red-500 bg-opacity-20";
    } else if (demande==="Releve de note") {
      return "bg-yellow-500 bg-opacity-20";
    }
    return "bg-gray-200";
  };

  // Calculate indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDemandes.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const updateDemandeStatus = (id, newStatus) => {
    axios.put(`http://127.0.0.1:8000/api/demandes/${id}/update-status`, { status: newStatus })
      .then(() => {
        // Mettre à jour localement le statut de la demande
        setDemandes(prevDemandes => {
          return prevDemandes.map(demande => {
            if (demande.id === id) {
              return { ...demande, status: newStatus };
            }
            return demande;
          });
        });
      })
      .catch(error => {
        console.error('Error updating demande status:', error);
      });
  };

  return (
    <div>
      <br />
      <Stats/>
      <div className="container mx-auto px-4 py-8">
        {showNotification && <Toast />}
        <h1 className="text-3xl font-bold mb-6">Liste des demandes</h1>
        <div className="mb-4">
          <select
            className="block w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterType}
            onChange={(e) => filterByType(e.target.value)}
          >
            <option value="">Tous les types de demande</option>
            <option value="Attestation de poursuite">Attestation de poursuite</option>
            <option value="Attestation interruption">Attestation interruption</option>
            <option value="Releve de note">Releve de note</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Stagiaire</th>
                <th className="px-4 py-2">CIN</th>
                <th className="px-4 py-2">Filiere</th>
                <th className="px-4 py-2">Type d&apos;attestation</th>
                <th className="px-4 py-2">Demande a</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((s) => (
                <tr key={s.id} className="text-gray-700">
                  <td className="border px-4 py-2">{s.stagiaire.nom + ' ' + s.stagiaire.prenom}</td>
                  <td className="border px-4 py-2">{s.stagiaire.CIN}</td>
                  <td className="border px-4 py-2">{s.stagiaire.filiere}</td>
                  <td className={`border px-4 py-2 p-2`}>
                    <div className={`p-1 ${getBackgroundColor(s.typeDemande)}`}>
                      {s.typeDemande}
                    </div>
                  </td>
                  <td className="border px-4 py-2">{formatDate(s.dateSoumission)}</td>
                  <td className="border px-4 py-2">
                    <select
                      value={s.status}
                      onChange={(e) => updateDemandeStatus(s.id, e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="En cours de traitement">En attente</option>
                      <option value="Approuvé">Approuvé</option>
                      <option value="Rejeté">Rejeté</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <button onClick={() => openModal(s)} className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 w-[48%]" style={{ fontSize: '0.8rem' }}>
                      <FontAwesomeIcon icon={faEye} className="mr-2" />
                      Afficher
                    </button>
                    <button onClick={() => handleDelete(s.id)} className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-[48%]" style={{ fontSize: '0.8rem' }}>
                      <FontAwesomeIcon icon={faTrash} className="mr-2" />
                      Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          {Array.from({ length: Math.ceil(filteredDemandes.length / itemsPerPage) }, (_, index) => (
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
        {selectedDemande && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
              <button onClick={closeModal} className="absolute top-2 right-2">
                <span title="Fermer">
                  <XIcon className="h-8 w-8 text-red-500 hover:text-red-700" aria-hidden="true" />
                </span>
              </button>
              <h2 className="text-xl font-bold mb-4">{selectedDemande.stagiaire.nom + ' ' + selectedDemande.stagiaire.prenom}</h2>
              <p><strong>CIN :</strong> {selectedDemande.stagiaire.CIN}</p>
              <p><strong>Filiere :</strong> {selectedDemande.stagiaire.filiere}</p>
              <p><strong>Groupe :</strong> {selectedDemande.stagiaire.groupe}</p>
              <p><strong>Année Scolaire :</strong> {selectedDemande.stagiaire.anneeScolaire}</p>
              <h3 className="text-lg font-semibold mt-4 mb-2">Demandes :</h3>
                <div className={`${getBackgroundColor(selectedDemande.typeDemande)} p-4 rounded-lg mb-4`}>
                  <p><strong>Date de Soumission :</strong> {formatDate(selectedDemande.dateSoumission)}</p>
                  <p><strong>Type de selectedDemande :</strong> {selectedDemande.typeDemande}</p>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListStagiaires;
