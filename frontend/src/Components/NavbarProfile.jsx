import { useState, useEffect, useRef } from 'react';
import { UserCircleIcon, MenuIcon, MoonIcon, SunIcon } from '@heroicons/react/outline'; // Import MoonIcon and SunIcon for dark mode toggle
import { Link } from 'react-router-dom';

function NavbarProfile({ toggleNav, toggleDarkMode, darkMode }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user : null;
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className={`bg-gray-200 shadow-lg ${darkMode ? 'dark bg-gray-700' : ''}`}>
        <div className="flex items-center justify-between p-2">
          <div className='flex justify-center text-gray-600 font-bold items-center'>
            <button onClick={toggleNav} className='mr-2'>
              <MenuIcon className={`h-8 w-8 mr-2 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
            </button>
            <h5 className={`${darkMode ? 'text-white' : 'text-gray-600'}`}>Tableau de bord</h5>
          </div>
          <div className="flex items-center">
            <button onClick={toggleDarkMode} title={`${darkMode ? 'Light Mode' : 'Dark Mode'}`} className={`text-gray-600 mr-3 hover:text-gray-700 focus:outline-none ${darkMode ? 'text-gray-300' : ''}`}>
              {darkMode ? <SunIcon className="h-6 w-6 text-white" /> : <MoonIcon className="h-6 w-6" />}
            </button>
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className={`text-white px-4 hover:text-gray-300 focus:outline-none ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <UserCircleIcon className={`h-8 w-8 ${darkMode ? 'text-white' : 'text-[#00246B]'}`} />
              </button>
              {dropdownOpen && (
                <div className={`absolute right-0 mt-2 bg-white rounded shadow-lg ${darkMode ? 'dark:bg-gray-700 text-gray-300' : 'text-gray-800'}`}>
                  <Link to={`/dashboard-${userData.role}/profile`} className={`block px-4 py-2 hover:bg-gray-200 ${darkMode ? ' hover:text-gray-800' : ''}`}>{userData.nom + ' ' + userData.prenom}</Link>
                  <Link onClick={() => { localStorage.removeItem("user") }} to="/app/ista" className="block px-4 py-2 text-red-500 font-bold hover:bg-gray-200">Déconnexion</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavbarProfile;
