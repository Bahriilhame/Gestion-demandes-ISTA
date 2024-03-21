import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddGestionnaire({darkMode}) {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "gestionnaire";

  document.title = "ISTA | Ajout gestionnaire"; 

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { nom, prenom, email, password, role };
    axios.post("http://127.0.0.1:8000/api/AddGestionnaire", formData)
      .then(() => {
          navigate('/dashboard-directeur/listGestionnaire', { state: { showNotification: true,message:'Ajouter avec succès' } })
          window.location.reload()
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du gestionnaire:", error);
      });
  };

  return (
    <div className={` bg-gray-100 ${darkMode ? 'dark bg-gray-800 text-white' : ''} flex justify-center items-center`}>
      <div className="p-8 rounded-lg shadow-md w-full max-w-md ">
        <h2 className="text-2xl font-bold mb-4 text-center">Ajouter un gestionnaire</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nom" className="block text-sm font-semibold mb-1">Nom:</label>
            <input
              type="text"
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className={`block  ${darkMode ? 'dark bg-gray-800 text-white' : ''} w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Entrer votre Nom"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="prenom" className="block text-sm font-semibold mb-1">Prénom:</label>
            <input
              type="text"
              id="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className={`block  ${darkMode ? 'dark bg-gray-800 text-white' : ''} w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Entrer votre Prénom"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`block  ${darkMode ? 'dark bg-gray-800 text-white' : ''} w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Entrer votre Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-1">Mot de passe:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`block  ${darkMode ? 'dark bg-gray-800 text-white' : ''} w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Entrer votre Mot de passe"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddGestionnaire;
