import { useState, useEffect } from "react";
import axios from "axios";
import { XIcon } from '@heroicons/react/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

function ListeAdministrateurs() {
  const [administrateurs, setAdministrateurs] = useState([]);
  const [selectedAdministrateur, setSelectedAdministrateur] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/gestionnaires")
      .then((response) => {
        const reversedAdministrateurs = [...response.data].reverse();
        setAdministrateurs(reversedAdministrateurs);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des administrateurs:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/gestionnaires/${id}`).then(() => {
      setAdministrateurs(prevAdministrateurs => prevAdministrateurs.filter(administrateur => administrateur.id !== id));
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de l'administrateur:", error);
    });
  };

  const openModal = (administrateur) => {
    setSelectedAdministrateur(administrateur);
  };

  const closeModal = () => {
    setSelectedAdministrateur(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Liste des administrateurs</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Prénom</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {administrateurs.map((administrateur) => (
              <tr key={administrateur.id} className="text-gray-700">
                <td className="border px-4 py-2">{administrateur.nom}</td>
                <td className="border px-4 py-2">{administrateur.prenom}</td>
                <td className="border px-4 py-2">{administrateur.email}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => openModal(administrateur)} className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" style={{ fontSize: '0.8rem' }}>
                    <FontAwesomeIcon icon={faEye} className="mr-2" />
                    Afficher
                  </button>
                  <button onClick={() => handleDelete(administrateur.id)} className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" style={{ fontSize: '0.8rem' }}>
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedAdministrateur && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
            <button onClick={closeModal} className="absolute top-2 right-2">
              <span title="Fermer">
                <XIcon className="h-8 w-8 text-red-500 hover:text-red-700" aria-hidden="true"/>
              </span>
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedAdministrateur.nom + ' ' + selectedAdministrateur.prenom}</h2>
            <p><strong>Email:</strong> {selectedAdministrateur.email}</p>
            <div className="flex justify-between">
              <button onClick={closeModal} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListeAdministrateurs;


