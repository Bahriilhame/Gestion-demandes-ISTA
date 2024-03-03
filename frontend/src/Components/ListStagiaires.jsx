import { useState, useEffect } from "react";
import axios from "axios";
import { XIcon } from '@heroicons/react/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

function ListStagiaires() {
  const [Stagiaires, setStagiaires] = useState([]);
  const [selectedStagiaire, setSelectedStagiaire] = useState(null);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
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

  const filteredStagiaires = filterType
    ? Stagiaires.filter(stagiaire =>
        stagiaire.demandes.some(demande => demande.typeDemande === filterType)
      )
    : Stagiaires;

  const handleDelete = (cin) => {
    axios.delete(`http://127.0.0.1:8000/api/DeleteStagiaires/${cin}`).then(() => {
      setStagiaires(prevStagiaires => prevStagiaires.filter(stagiaire => stagiaire.CIN !== cin));
      })
      .catch((error) => console.error("Error deleting stagiaire:", error));
  };

  const openModal = (stagiaire) => {
    setSelectedStagiaire(stagiaire);
  };

  const closeModal = () => {
    setSelectedStagiaire(null);
  };

  const getBackgroundColor = (demandes) => {
    const demandeTypes = demandes.map(demande => demande.typeDemande);
    if (demandeTypes.includes("Attestation de poursuite")) {
      return "bg-green-500 bg-opacity-20 ";
    } else if (demandeTypes.includes("Attestation interruption")) {
      return "bg-red-500 bg-opacity-20";
    } else if (demandeTypes.includes("Releve de note")) {
      return "bg-yellow-500 bg-opacity-20";
    }
    return "bg-gray-200";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Liste des stagiaires</h1>
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
            {/* <tr className="bg-[#c5d6f8]"> */}
              <th className="px-4 py-2">Stagiaire</th>
              <th className="px-4 py-2">CIN</th>
              <th className="px-4 py-2">Filiere</th>
              <th className="px-4 py-2">Type d&apos;attestation</th>
              <th className="px-4 py-2">Demande a</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStagiaires.map((s) => (
              <tr key={s.id} className="text-gray-700">
                <td className="border px-4 py-2">{s.nom+' '+s.prenom}</td>
                <td className="border px-4 py-2">{s.CIN}</td>
                <td className="border px-4 py-2">{s.filiere}</td>
                <td className={`border px-4 py-2 p-2`}>
                  <div className={`p-1 ${getBackgroundColor(s.demandes)}`}>
                  {s.demandes.map((d) => d.typeDemande).join(", ")}
                  </div>
                </td>
                <td className="border px-4 py-2">{s.demandes.map((d) => formatDate(d.dateSoumission)).join(", ")}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => openModal(s)} className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" style={{ fontSize: '0.8rem' }}>
                    <FontAwesomeIcon icon={faEye} className="mr-2" />
                    Afficher
                  </button>
                  <button onClick={() => handleDelete(s.CIN)} className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" style={{ fontSize: '0.8rem' }}>
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedStagiaire && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
            <button onClick={closeModal} className="absolute top-2 right-2">
              <span title="Fermer">
                <XIcon className="h-8 w-8 text-red-500 hover:text-red-700" aria-hidden="true"/>
              </span>
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedStagiaire.nom+ ' ' +selectedStagiaire.prenom}</h2>
            <p><strong>CIN:</strong> {selectedStagiaire.CIN}</p>
            <p><strong>Filiere:</strong> {selectedStagiaire.filiere}</p>
            <p><strong>Groupe:</strong> {selectedStagiaire.groupe}</p>
            <p><strong>Année Scolaire:</strong> {selectedStagiaire.anneeScolaire}</p>
            <h3 className="text-lg font-semibold mt-4 mb-2">Demandes :</h3>
            {selectedStagiaire.demandes.map((demande, index) => (
              <div key={index} className={`${getBackgroundColor(selectedStagiaire.demandes)} p-4 rounded-lg mb-4`}>
                <p><strong>Date de Soumission:</strong> {formatDate(demande.dateSoumission)}</p>
                <p><strong>Type de Demande:</strong> {demande.typeDemande}</p>
              </div>
            ))}
            {/* <div className="flex justify-between">
              <button onClick={closeModal} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">Fermer</button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default ListStagiaires;

