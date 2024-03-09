// import { useState } from "react";
// import axios from "axios";

// function MultiStepForm() {
//   document.title = "ISTA | Ajout des stagiaires";
//   const userData = localStorage.getItem("stagiaire")
//     ? JSON.parse(localStorage.getItem("stagiaire"))
//     : null;

//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     nom: userData.nom,
//     prenom: userData.prenom,
//     CIN: userData.CIN,
//     email:userData.email,
//     password:userData.password,
//     filiere: "",
//     groupe: "",
//     anneeScolaire: "",
//     typeDemande: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(
//         "http://127.0.0.1:8000/api/UpdateDemande",
//         formData
//       );
//       if (response.status === 201) {
// // 
//       }
//     } catch (error) {
//       console.error("Erreur lors de l'envoi de la requête:", error);
//       alert("Une erreur s'est produite. Veuillez réessayer.");
//     }
//   };

//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const goToStep = (step) => {
//     setCurrentStep(step);
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold mb-4">Step 1: Infos</h2>
//             <div>
//               <label className="block mb-2">Nom:</label>
//               <input
//                 type="text"
//                 name="nom"
//                 value={formData.nom}
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Prénom:</label>
//               <input
//                 type="text"
//                 name="prenom"
//                 value={formData.prenom}
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//               />
//             </div>
//             <div>
//               <label className="block mb-2">CIN:</label>
//               <input
//                 type="text"
//                 name="CIN"
//                 value={formData.CIN}
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//               />
//             </div>
//             <div className="flex justify-end">
//               <button
//                 onClick={nextStep}
//                 className="bg-[#41E4A9] text-white px-4 py-2 rounded hover:bg-[#32ce95]"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold mb-4">Step 2: Votre filière</h2>
//             <select
//               className="border p-2 w-full"
//               name="filiere"
//               value={formData.filiere}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Choisir votre filière</option>
//               <option value="Dev">Dev</option>
//               <option value="Infra">Infra</option>
//               <option value="Infographie">Infographie</option>
//             </select>
//             <div className="flex justify-between">
//               <button
//                 onClick={prevStep}
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={nextStep}
//                 className="bg-[#41E4A9] text-white px-4 py-2 rounded hover:bg-[#32ce95]"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         );
//       case 3:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold mb-4">
//               Step 3: Groupe et Année Scolaire
//             </h2>
//             <div>
//               <label className="block mb-2">Groupe:</label>
//               <input
//                 type="number"
//                 name="groupe"
//                 value={formData.groupe}
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Année Scolaire:</label>
//               <input
//                 type="number"
//                 name="anneeScolaire"
//                 value={formData.anneeScolaire}
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//                 required
//               />
//             </div>
//             <div className="flex justify-between">
//               <button
//                 onClick={prevStep}
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={nextStep}
//                 className="bg-[#41E4A9] text-white px-4 py-2 rounded hover:bg-[#32ce95]"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         );
//       case 4:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold mb-4">
//               Step 3: Votre choix
//             </h2>
//             <select
//               className="border p-2 w-full"
//               name="typeDemande"
//               value={formData.typeDemande}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Choisir votre demande</option>
//               <option value="Attestation interruption">
//                 Attestation interruption
//               </option>
//               <option value="Attestation de poursuite">
//                 Attestation de poursuite
//               </option>
//               <option value="Releve de note">Releve de note</option>
//             </select>
//             <div className="flex justify-between">
//               <button
//                 onClick={prevStep}
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={nextStep}
//                 className="bg-[#41E4A9] text-white px-4 py-2 rounded hover:bg-[#32ce95]"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         );
//       case 5:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold mb-4">Step 4: Validation</h2>
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Form Data:</h3>
//               <p>
//                 <strong>Nom:</strong> {formData.nom}
//               </p>
//               <p>
//                 <strong>Prénom:</strong> {formData.prenom}
//               </p>
//               <p>
//                 <strong>CIN:</strong> {formData.CIN}
//               </p>
//               <p>
//                 <strong>Filière:</strong> {formData.filiere}
//               </p>
//               <p>
//                 <strong>Groupe:</strong> {formData.groupe}
//               </p>
//               <p>
//                 <strong>Année Scolaire:</strong> {formData.anneeScolaire}
//               </p>
//               <p>
//                 <strong>Type de Demande:</strong> {formData.typeDemande}
//               </p>
//             </div>
//             <div className="flex justify-between">
//               <button
//                 onClick={prevStep}
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row">
//       <div className="w-full md:w-1/4 bg-gray-200 shadow-lg p-4">
//         <div className="flex flex-col">
//           <div className="mb-4 p-2 rounded-lg cursor-pointer flex justify-around">
//             {[1, 2, 3, 4, 5].map((step) => (
//               <div
//                 key={step}
//                 onClick={() => goToStep(step)}
//                 className={`h-8 w-8 rounded-full flex items-center justify-center ${
//                   currentStep === step
//                     ? "bg-[#41E4A9] text-white"
//                     : "bg-[#c0c1c4] text-gray-800"
//                 }`}
//               >
//                 {step}
//               </div>
//             ))}
//           </div>
//           <div className="relative h-1 bg-gray-300 rounded-full">
//             <div
//               className="absolute left-0 h-1 bg-[#41E4A9] rounded-full"
//               style={{
//                 width: `${(currentStep - 1) * 25}%`,
//               }}
//             ></div>
//           </div>
//         </div>
//       </div>
//       <div className="w-full md:w-3/4 p-6">{renderStep()}</div>
//     </div>
//   );
// }

// export default MultiStepForm;



// import { useState } from 'react';
// import axios from 'axios';

// const UpdateStagiaireForm = () => {
//   const userData = localStorage.getItem("stagiaire")
//   ? JSON.parse(localStorage.getItem("stagiaire"))
//   : null;

//   const [id, setId] = useState(userData.id);
//   const [fieldsToUpdate, setFieldsToUpdate] = useState(
//     {
//     id:userData.id,
//     nom:userData.nom,
//     prenom:userData.prenom,
//     filiere: '',
//     groupe: '',
//     anneeScolaire: '',
//     typeDemande: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFieldsToUpdate({ ...fieldsToUpdate, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`/stagiaires/${id}`, fieldsToUpdate);
//       console.log('Stagiaire updated successfully');
//       const updatedStagiaire = response.data;
      
//       if (fieldsToUpdate.typeDemande) {
//         await axios.post(`/stagiaires/${updatedStagiaire.id}/demandes`, {
//           typeDemande: fieldsToUpdate.typeDemande,
//         });
//         console.log('Demande added successfully');
//       }
  
//       // Handle further actions
//     } catch (error) {
//       console.error('Error updating stagiaire:', error);
//       // Handle error
//     }
//   };
  

//   return (
//     <div>
//       <h2>Update Stagiaire and Add Demande</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//         filiere:
//           <input
//             type="text"
//             name="filiere"
//             value={fieldsToUpdate.filiere}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//         groupe:
//           <input
//             type="text"
//             name="groupe"
//             value={fieldsToUpdate.groupe}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//         anneeScolaire:
//           <input
//             type="text"
//             name="anneeScolaire"
//             value={fieldsToUpdate.anneeScolaire}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Type de Demande:
//           <input
//             type="text"
//             name="typeDemande"
//             value={fieldsToUpdate.typeDemande}
//             onChange={handleChange}
//           />
//         </label>
//         <button type="submit">Add Demande</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateStagiaireForm;






import { useState } from "react";
import axios from "axios";

function UpdateForm() {
  const userData = localStorage.getItem("stagiaire")
  ? JSON.parse(localStorage.getItem("stagiaire"))
  : null;
  const id=userData.id;

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
        alert("Stagiaire mis à jour avec succès");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête:", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Filière:</label>
        <input
          type="text"
          name="filiere"
          value={formData.filiere}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Groupe:</label>
        <input
          type="number"
          name="groupe"
          value={formData.groupe}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Année Scolaire:</label>
        <input
          type="number"
          name="anneeScolaire"
          value={formData.anneeScolaire}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Type de Demande:</label>
        <select
          name="typeDemande"
          value={formData.typeDemande}
          onChange={handleChange}
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
      <button type="submit">Mettre à jour</button>
    </form>
  );
}

export default UpdateForm;
