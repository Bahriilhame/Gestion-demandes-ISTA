// import { Routes, Route, Link } from 'react-router-dom';
// // import FormStagiaire from './Components/FormStagiaire';
// import ListStagiaires from './Components/ListStagiaires';
// import ListDemandes from './Components/ListDemandes';
// import AddGestionnaire from './Components/AddGestionnaire';
// import ListeGestionnaires from './Components/ListeGestionnaires';
// import NavbarProfile from './Components/NavbarProfile';
// import { useState } from 'react';
// import UserProfile from './UserProfile';

// function DashboardDirect() {
//   const [isNavOpen, setIsNavOpen] = useState(true);

//   const toggleNav = () => {
//     setIsNavOpen(!isNavOpen);
//   };
//   return (
//     <div className="flex h-screen">
//       {
//         isNavOpen && (
//         <nav className={`bg-[#00246B] text-white p-4 transition-all duration-600 ease-in-out ${isNavOpen ? '' : '-translate-x-full'}`}>
//           <ul className="flex flex-col">
//             <div className="flex items-center align-middle mr-4 mb-8">
//               <img src="/logo.png" alt="logo" className="w-12 h-12 mr-2" />
//               <span className='align-middle font-bold'>ISTA HAY SALAM</span>
//             </div>
//             <li className="mb-4">
//               <Link to='/dashboard-directeur/listDemandes' className="hover:text-gray-300">Liste des demandes</Link>
//             </li>
//             {/* <li className="mb-4">
//               <Link to='/dashboard-directeur/AddStagiaire' className="hover:text-gray-300">Form Ajout des stagiaires</Link>
//             </li> */}
//             <li className="mb-4">
//               <Link to='/dashboard-directeur/listStagiaires' className="hover:text-gray-300">Liste des stagiaires</Link>
//             </li>
//             <li className="mb-4">
//               <Link to='/dashboard-directeur/listGestionnaire' className="hover:text-gray-300">Liste des Gestionnaires</Link>
//             </li>
//             <li className="mb-4">
//               <Link to='/dashboard-directeur/AddGestionnaire' className="hover:text-gray-300">Form Ajout des Gestionnaires</Link>
//             </li>
//           </ul>
//         </nav>
//         )
//       }
//       <div className="flex-grow bg-gray-100">
//         <NavbarProfile toggleNav={toggleNav}/>
//         <Routes>
//           <Route path='/listDemandes' element={<ListDemandes />}/>
//           <Route path='/listStagiaires' element={<ListStagiaires />}/>
//           {/* <Route path='/AddStagiaire' element={<FormStagiaire />}/> */}
//           <Route path='/AddGestionnaire' element={<AddGestionnaire />}/>
//           <Route path='/listGestionnaire' element={<ListeGestionnaires />}/>
//           <Route path="/profile" element={<UserProfile />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default DashboardDirect;





// App.js

import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ListStagiaires from './Components/ListStagiaires';
import ListDemandes from './Components/ListDemandes';
import AddGestionnaire from './Components/AddGestionnaire';
import ListeGestionnaires from './Components/ListeGestionnaires';
import NavbarProfile from './Components/NavbarProfile';
import UserProfile from './UserProfile';

function DashboardDirect() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      {
        isNavOpen && (
          <nav className={`bg-[#00246B] ${darkMode ? 'dark bg-gray-700 text-white' : ''} text-white p-4 transition-all duration-600 ease-in-out ${isNavOpen ? '' : '-translate-x-full'}`}>
            <ul className="flex flex-col">
              <div className="flex items-center align-middle mr-4 mb-8">
                <img src="/logo.png" alt="logo" className="w-12 h-12 mr-2" />
                <span className='align-middle font-bold'>ISTA HAY SALAM</span>
              </div>
              <li className="mb-4">
                <Link to='/dashboard-directeur/listDemandes' className="hover:text-gray-300">Liste des demandes</Link>
              </li>
              <li className="mb-4">
                <Link to='/dashboard-directeur/listStagiaires' className="hover:text-gray-300">Liste des stagiaires</Link>
              </li>
              <li className="mb-4">
                <Link to='/dashboard-directeur/listGestionnaire' className="hover:text-gray-300">Liste des Gestionnaires</Link>
              </li>
              <li className="mb-4">
                <Link to='/dashboard-directeur/AddGestionnaire' className="hover:text-gray-300">Form Ajout des Gestionnaires</Link>
              </li>
            </ul>
          </nav>
        )
      }
      <div className={`flex-grow ${darkMode ? 'dark bg-gray-800' : ''} bg-gray-100`}>
        <NavbarProfile toggleNav={toggleNav} toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
        <Routes>
          <Route path='/listDemandes' element={<ListDemandes darkMode={darkMode} />} />
          <Route path='/listStagiaires' element={<ListStagiaires darkMode={darkMode}  />} />
          <Route path='/AddGestionnaire' element={<AddGestionnaire darkMode={darkMode}  />} />
          <Route path='/listGestionnaire' element={<ListeGestionnaires darkMode={darkMode}  />} />
          <Route path="/profile" element={<UserProfile darkMode={darkMode}  />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashboardDirect;
