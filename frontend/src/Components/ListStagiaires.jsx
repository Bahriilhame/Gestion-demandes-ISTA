import { useState, useEffect } from "react";
import axios from "axios";
import { XIcon } from '@heroicons/react/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Stats from "./Stats";

function ListStagiaires() {
  const [Stagiaires, setStagiaires] = useState([]);
  const [selectedStagiaire, setSelectedStagiaire] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

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
      }
    };

    window.addEventListener('keydown', handleEscKeyPress);

    return () => {
      window.removeEventListener('keydown', handleEscKeyPress);
    };
  }, []);

  const openModal = (stagiaire) => {
    setSelectedStagiaire(stagiaire);
  };

  const closeModal = () => {
    setSelectedStagiaire(null);
  };


  // Calculate indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Stagiaires.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <br />
      <Stats/>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Liste des comptes stagiaires</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Stagiaire</th>
                <th className="px-4 py-2">CIN</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((s) => (
                <tr key={s.id} className="text-gray-700">
                  <td className="border px-4 py-2">{s.nom + ' ' + s.prenom}</td>
                  <td className="border px-4 py-2">{s.CIN}</td>
                  <td className="border px-4 py-2">{s.email}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => openModal(s)} className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 w-full" style={{ fontSize: '0.8rem' }}>
                      <FontAwesomeIcon icon={faEye} className="mr-2" />
                      Afficher
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          {Array.from({ length: Math.ceil(Stagiaires.length / itemsPerPage) }, (_, index) => (
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
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
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
      </div>
    </div>
  );
}

export default ListStagiaires;
