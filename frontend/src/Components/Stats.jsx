import axios from "axios";
import { useState, useEffect } from "react";
import { DocumentTextIcon, UserIcon, FolderIcon } from '@heroicons/react/outline';
import { Link } from "react-router-dom";

function Stats({darkMode}) {
    const [Demandes, setDemandes] = useState([]);
    const [Stagiaires, setStagiaires] = useState([]);
    const [DemandesDay, setDemandesDay] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/demandes")
            .then((rep) => {
                setDemandes(rep.data);
                const today = new Date().toISOString().slice(0, 10);
                const demandesToday = rep.data.filter(demande => demande.dateSoumission.slice(0, 10) === today);
                setDemandesDay(demandesToday);
            })
            .catch((error) => console.error("Error fetching demandes:", error));

        axios.get("http://127.0.0.1:8000/api/stagiaires")
            .then((rep) => {
                setStagiaires(rep.data);
            })
            .catch((error) => console.error("Error fetching stagiaires:", error));
    }, []);

    return (
        <div className={`grid ${darkMode ? 'dark bg-gray-800' : ''} grid-cols-3 gap-4 mx-4`}>
            <div className={`${darkMode ? 'dark bg-gray-800 text-white shadow-lg shadow-black border-gray-400 rounded-lg' : 'bg-white'} shadow-lg p-2 rounded-lg`}>
                <h2 className={`text-lg flex text-gray-500 ${darkMode ? 'text-white' : ''} items-center font-semibold mb-2`}>
                    <DocumentTextIcon className='w-6 h-6 text-blue-800 mr-2' />
                    {DemandesDay.length} Demandes aujourd&apos;hui
                </h2>
            </div>
            <Link to='/dashboard-directeur/listStagiaires' className={` ${darkMode ? 'dark bg-gray-800 text-white shadow-lg shadow-black border-gray-400 rounded-lg' : 'bg-white'} shadow-lg p-2 rounded-lg`}>
                <h2 className={`text-lg flex  ${darkMode ? 'text-white' : 'text-gray-500'} items-center font-semibold mb-2`}>
                    <UserIcon className='w-6 h-6 text-blue-800 mr-2' />
                    {Stagiaires.length} Stagiaires
                </h2>
            </Link>
            <Link to='/dashboard-directeur/listDemandes' className={`   ${darkMode ? 'dark bg-gray-800 text-white shadow-lg shadow-black border-gray-400 rounded-lg' : 'bg-white'} shadow-lg p-2 rounded-lg`}>
                <h2 className={`text-lg flex  ${darkMode ? 'text-white' : 'text-gray-500'} items-center font-semibold mb-2`}>
                    <FolderIcon className='w-6 h-6 text-blue-800 mr-2' />
                    {Demandes.length} Total des demandes
                </h2>
            </Link>
        </div>
    );
}

export default Stats;
