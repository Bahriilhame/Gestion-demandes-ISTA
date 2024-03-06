// import { useState, useEffect } from "react";
// import axios from "axios";
// import { XIcon } from '@heroicons/react/outline';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

// function ListeAdministrateurs() {
//   const [administrateurs, setAdministrateurs] = useState([]);
//   const [selectedAdministrateur, setSelectedAdministrateur] = useState(null);

//   useEffect(() => {
//     axios.get("http://127.0.0.1:8000/api/gestionnaires")
//       .then((response) => {
//         const reversedAdministrateurs = [...response.data].reverse();
//         setAdministrateurs(reversedAdministrateurs);
//       })
//       .catch((error) => {
//         console.error("Erreur lors de la récupération des administrateurs:", error);
//       });
      
//       // Esc button 
//       const handleEscKeyPress = (event) => {
//         if (event.keyCode === 27) {
//           closeModal();
//         }
//       };
  
//       window.addEventListener('keydown', handleEscKeyPress);
  
//       return () => {
//         window.removeEventListener('keydown', handleEscKeyPress);
//       };
//   }, []);

//   const handleDelete = (id) => {
//     axios.delete(`http://127.0.0.1:8000/api/gestionnaires/${id}`).then(() => {
//       setAdministrateurs(prevAdministrateurs => prevAdministrateurs.filter(administrateur => administrateur.id !== id));
//     })
//     .catch((error) => {
//       console.error("Erreur lors de la suppression de l'administrateur:", error);
//     });
//   };

//   const openModal = (administrateur) => {
//     setSelectedAdministrateur(administrateur);
//   };

//   const closeModal = () => {
//     setSelectedAdministrateur(null);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Liste des gestionnaires</h1>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="px-4 py-2">Nom</th>
//               <th className="px-4 py-2">Prénom</th>
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {administrateurs.map((administrateur) => (
//               <tr key={administrateur.id} className="text-gray-700">
//                 <td className="border px-4 py-2">{administrateur.nom}</td>
//                 <td className="border px-4 py-2">{administrateur.prenom}</td>
//                 <td className="border px-4 py-2">{administrateur.email}</td>
//                 <td className="border px-4 py-2">
//                   <button onClick={() => openModal(administrateur)} className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" style={{ fontSize: '0.8rem' }}>
//                     <FontAwesomeIcon icon={faEye} className="mr-2" />
//                     Afficher
//                   </button>
//                   <button onClick={() => handleDelete(administrateur.id)} className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" style={{ fontSize: '0.8rem' }}>
//                     <FontAwesomeIcon icon={faTrash} className="mr-2" />
//                     Supprimer
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {selectedAdministrateur && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
//             <button onClick={closeModal} className="absolute top-2 right-2">
//               <span title="Fermer">
//                 <XIcon className="h-8 w-8 text-red-500 hover:text-red-700" aria-hidden="true"/>
//               </span>
//             </button>
//             <h2 className="text-xl font-bold mb-4">{selectedAdministrateur.nom + ' ' + selectedAdministrateur.prenom}</h2>
//             <p><strong>Email:</strong> {selectedAdministrateur.email}</p>
//             {/* <div className="flex justify-between">
//               <button onClick={closeModal} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">Fermer</button>
//             </div> */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ListeAdministrateurs;



import { useState, useEffect } from "react";
import axios from "axios";
import { XIcon } from '@heroicons/react/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import Toast from "../Toast";
import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function ListeAdministrateurs() {
  // const navigate=useNavigate()
  const [administrateurs, setAdministrateurs] = useState([]);
  const [selectedAdministrateur, setSelectedAdministrateur] = useState(null);
  const [modifiedNom, setModifiedNom] = useState("");
  const [modifiedPrenom, setModifiedPrenom] = useState("");
  const [modifiedEmail, setModifiedEmail] = useState("");

  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setShowNotification(location.state && location.state.showNotification);
  }, [location]);

  useEffect(() => {
    document.title = "ISTA | Liste des gestionnaires"; 

    axios.get("http://127.0.0.1:8000/api/gestionnaires")
      .then((response) => {
        const reversedAdministrateurs = [...response.data].reverse();
        setAdministrateurs(reversedAdministrateurs);
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
  };

  const handleSave = () => {
    const { id } = selectedAdministrateur;
    
    const updatedData = {
      nom: modifiedNom,
      prenom: modifiedPrenom,
      email: modifiedEmail,
    };
  
    axios.put(`http://127.0.0.1:8000/api/UpdateGestionnaire/${id}`, updatedData)
      .then(() => {
        // navigate('/listGestionnaire');
        window.location.href = '/dashboard-directeur/listGestionnaire';
        closeModal();
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'administrateur:", error);
      });
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
            {showNotification && <Toast />} 
      <h1 className="text-3xl font-bold mb-6">Liste des gestionnaires</h1>
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
                    Modifier
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
            <h2 className="text-xl font-bold mb-4">Modifier les infos de {selectedAdministrateur.nom + ' ' + selectedAdministrateur.prenom}</h2>
            <div className="mb-4">
              <label htmlFor="modifiedNom" className="block text-sm font-semibold mb-1">Nom:</label>
              <input
                type="text"
                id="modifiedNom"
                value={modifiedNom}
                onChange={(e) => setModifiedNom(e.target.value)}
                className="input w-full h-10 text-gray-500 border rounded-md px-3 border-gray-300"
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
                className="input w-full h-10 text-gray-500 border rounded-md px-3 border-gray-300"
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
                className="input w-full h-10 text-gray-500 border rounded-md px-3 border-gray-300"
                placeholder="Entrez l'email modifié"
              />
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
  );
}

export default ListeAdministrateurs;
