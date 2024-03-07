import { Routes, Route, Link } from 'react-router-dom';
import FormStagiaire from './Components/FormStagiaire';
import ListStagiaires from './Components/ListStagiaires';
import AddGestionnaire from './Components/AddGestionnaire';
import ListeGestionnaires from './Components/ListeGestionnaires';
import NavbarProfile from './Components/NavbarProfile';
// import { DocumentTextIcon, UserIcon, FolderIcon } from '@heroicons/react/outline'; 

function DashboardDirect() {
  return (
    <div className="flex h-screen">
      <nav className="bg-[#00246B] text-white p-4">
        <ul className="flex flex-col">
          <div className="flex items-center align-middle mr-4 mb-8">
            <img src="/logo.png" alt="logo" className="w-12 h-12 mr-2" />
            <span className='align-middle font-bold'>ISTA HAY SALAM</span>
          </div>
          <li className="mb-4">
            <Link to='/dashboard-directeur/listDemandes' className="hover:text-gray-300">Liste des demandes</Link>
          </li>
          <li className="mb-4">
            <Link to='/dashboard-directeur/AddStagiaire' className="hover:text-gray-300">Form Ajout des stagiaires</Link>
          </li>
          <li className="mb-4">
            <Link to='/dashboard-directeur/listGestionnaire' className="hover:text-gray-300">Liste des Gestionnaires</Link>
          </li>
          <li className="mb-4">
            <Link to='/dashboard-directeur/AddGestionnaire' className="hover:text-gray-300">Form Ajout des Gestionnaires</Link>
          </li>
        </ul>
      </nav>
      <div className="flex-grow bg-gray-100">
        <NavbarProfile/>
        {/* <br />
        <div className="grid grid-cols-3 gap-4 mx-4">
            <div className="bg-white shadow-lg p-2 rounded-lg">
                <h2 className="text-lg flex text-gray-500 items-center font-semibold mb-2"><DocumentTextIcon className='w-6 h-6 text-blue-800 mr-2'/>10 Demandes</h2>
            </div>
            <div className="bg-white shadow-lg p-2 rounded-lg">
                <h2 className="text-lg flex text-gray-500 items-center font-semibold mb-2"><UserIcon className='w-6 h-6 text-blue-800 mr-2'/>320 Stagiaires</h2>
            </div>
            <div className="bg-white shadow-lg p-2 rounded-lg">
                <h2 className="text-lg flex text-gray-500 items-center font-semibold mb-2"><FolderIcon className='w-6 h-6 text-blue-800 mr-2'/>1200 Total des attestations</h2>
            </div>
        </div> */}
        <Routes>
          <Route path='/listDemandes' element={<ListStagiaires />}/>
          <Route path='/AddStagiaire' element={<FormStagiaire />}/>
          <Route path='/AddGestionnaire' element={<AddGestionnaire />}/>
          <Route path='/listGestionnaire' element={<ListeGestionnaires />}/>
        </Routes>
      </div>
    </div>
  );
}

export default DashboardDirect;

