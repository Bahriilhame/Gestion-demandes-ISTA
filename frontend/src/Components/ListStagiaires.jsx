import { useState, useEffect } from "react";
import axios from "axios";

function ListStagiaires() {
  const [Stagiaires, setStagiaires] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/stagiaires")
      .then((rep) => {
        const reversedStagiaires = [...rep.data].reverse();
        setStagiaires(reversedStagiaires);
      })
      .catch((error) => console.error("Error fetching stagiaires:", error));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Liste des stagiaires</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Stagiaire</th>
              <th className="px-4 py-2">CIN</th>
              <th className="px-4 py-2">Filiere</th>
              <th className="px-4 py-2">Type d&apos;attestation</th>
              <th className="px-4 py-2">Demande a</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {Stagiaires.map((s) => (
              <tr key={s.id} className="text-gray-700">
                <td className="border px-4 py-2">{s.nom+' '+s.prenom}</td>
                <td className="border px-4 py-2">{s.CIN}</td>
                <td className="border px-4 py-2">{s.filiere}</td>
                <td className={`border px-4 py-2 p-2`}>
                  <div className={`p-1 `}>
                  {s.demandes.map((d) => d.typeDemande).join(", ")}
                  </div>
                </td>
                <td className="border px-4 py-2">{s.demandes.map((d) => d.dateSoumission).join(", ")}</td>
                <td className="border px-4 py-2">
                  <button className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" style={{ fontSize: '0.8rem' }}>
                    Afficher
                  </button>
                  <button className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" style={{ fontSize: '0.8rem' }}>
                    Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListStagiaires;

