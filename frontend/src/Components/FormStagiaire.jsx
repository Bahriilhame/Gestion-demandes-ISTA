import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MultiStepForm() {
    const navigate=useNavigate()
    document.title = "ISTA | Ajout des stagiaires"; 
    const userData=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).role : null

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    CIN: "",
    filiere: "",
    groupe: "",
    anneeScolaire: "",
    typeDemande: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/AddStagiaire', formData);
      if (response.status === 201) {
        if(userData==='directeur'){
          navigate('/dashboard-directeur/listDemandes', { state: { showNotification: true } })
        }
        else{
          navigate('/dashboard-gestionnaire/listDemandes', { state: { showNotification: true } })
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la requête:', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Step 1: Infos</h2>
            <div>
              <label className="block mb-2">Nom:</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2">Prénom:</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2">CIN:</label>
              <input
                type="text"
                name="CIN"
                value={formData.CIN}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={nextStep} className="bg-[#41E4A9] text-white px-4 py-2 rounded hover:bg-[#32ce95]">Next</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Step 2: Votre filière</h2>
            <select 
              className="border p-2 w-full" 
              name="filiere" 
              value={formData.filiere} 
              onChange={handleChange} 
              required
            >
              <option value="">Choisir votre filière</option>
              <option value="Dev">Dev</option>
              <option value="Infra">Infra</option>
              <option value="Infographie">Infographie</option>
            </select>
            <div className="flex justify-between">
              <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Previous</button>
              <button onClick={nextStep} className="bg-[#41E4A9] text-white px-4 py-2 rounded hover:bg-[#32ce95]">Next</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Step 3: Groupe et Année Scolaire</h2>
            <div>
              <label className="block mb-2">Groupe:</label>
              <input
                type="number"
                name="groupe"
                value={formData.groupe}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Année Scolaire:</label>
              <input
                type="number"
                name="anneeScolaire"
                value={formData.anneeScolaire}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="flex justify-between">
              <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Previous</button>
              <button onClick={nextStep} className="bg-[#41E4A9] text-white px-4 py-2 rounded hover:bg-[#32ce95]">Next</button>
            </div>
          </div>
        );
    case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Step 3: Votre choix</h2>
            <select className="border p-2 w-full" name="typeDemande" value={formData.typeDemande} onChange={handleChange} required>
                <option value="">Choisir votre demande</option>
                <option value="Attestation interruption">Attestation interruption</option>
                <option value="Attestation de poursuite">Attestation de poursuite</option>
                <option value="Releve de note">Releve de note</option>
            </select>
            <div className="flex justify-between">
              <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Previous</button>
              <button onClick={nextStep} className="bg-[#41E4A9] text-white px-4 py-2 rounded hover:bg-[#32ce95]">Next</button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Step 4: Validation</h2>
            <div>
              <h3 className="text-lg font-semibold mb-2">Form Data:</h3>
              <p><strong>Nom:</strong> {formData.nom}</p>
              <p><strong>Prénom:</strong> {formData.prenom}</p>
              <p><strong>CIN:</strong> {formData.CIN}</p>
              <p><strong>Filière:</strong> {formData.filiere}</p>
              <p><strong>Groupe:</strong> {formData.groupe}</p>
              <p><strong>Année Scolaire:</strong> {formData.anneeScolaire}</p>
              <p><strong>Type de Demande:</strong> {formData.typeDemande}</p>
            </div>
            <div className="flex justify-between">
              <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Previous</button>
              <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Submit</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 h-screen bg-gray-200 shadow-lg p-4">
        <div className="flex flex-col">
          <div 
            onClick={() => goToStep(1)} 
            className={`mb-4 p-2 rounded-lg cursor-pointer ${currentStep === 1 ? 'bg-[#41E4A9] text-white' : 'bg-[#c0c1c4] text-gray-800'}`}
          >
            Étape 1 <br />
            Vos informations
          </div>
          <div 
            onClick={() => goToStep(2)} 
            className={`mb-4 p-2 rounded-lg cursor-pointer ${currentStep === 2 ? 'bg-[#41E4A9] text-white' : 'bg-[#c0c1c4] text-gray-800'}`}
          >
            Étape 2
          </div>
          <div 
            onClick={() => goToStep(3)} 
            className={`mb-4 p-2 rounded-lg cursor-pointer ${currentStep === 3 ? 'bg-[#41E4A9] text-white' : 'bg-[#c0c1c4] text-gray-800'}`}
          >
            Étape 3
          </div>
          <div 
            onClick={() => goToStep(4)} 
            className={`mb-4 p-2 rounded-lg cursor-pointer ${currentStep === 4 ? 'bg-[#41E4A9] text-white' : 'bg-[#c0c1c4] text-gray-800'}`}
          >
            Étape 4
          </div>
          <div 
            onClick={() => goToStep(5)} 
            className={`mb-4 p-2 rounded-lg cursor-pointer ${currentStep === 5 ? 'bg-[#41E4A9] text-white' : 'bg-[#c0c1c4] text-gray-800'}`}
          >
            Étape 5
          </div>
        </div>
      </div>
      <div className="w-3/4 p-6">
        {renderStep()}
      </div>
    </div>
  );
}

export default MultiStepForm;
