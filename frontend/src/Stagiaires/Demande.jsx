import { useState } from "react";
import axios from "axios";

function Demande() {
  const userData = localStorage.getItem("stagiaire")
    ? JSON.parse(localStorage.getItem("stagiaire"))
    : null;
  const id = userData.id;

  const [formData, setFormData] = useState({
    filiere: "",
    groupe: "",
    anneeScolaire: "",
    typeDemande: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/UpdateDemande/${id}`,
        formData
      );
      if (response.status === 200) {
        alert("Demande envoyer avec succès");
        setFormData({
          filiere: "",
          groupe: "",
          anneeScolaire: "",
          typeDemande: "",
        })
        window.location.reload()
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête:", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <label className="block mb-1">Filière:</label>
        <input
          type="text"
          name="filiere"
          value={formData.filiere}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Groupe:</label>
        <input
          type="number"
          name="groupe"
          value={formData.groupe}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Année Scolaire:</label>
        <input
          type="number"
          name="anneeScolaire"
          value={formData.anneeScolaire}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Type de Demande:</label>
        <select
          name="typeDemande"
          value={formData.typeDemande}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Choisir le type de demande</option>
          <option value="Attestation interruption">
            Attestation interruption
          </option>
          <option value="Attestation de poursuite">
            Attestation de poursuite
          </option>
          <option value="Releve de note">Releve de note</option>
        </select>
      </div>
      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600 transition duration-300">Demander</button>
    </form>
  );
}

export default Demande;
