import {useState} from 'react'
import { UserCircleIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { MenuIcon } from '@heroicons/react/outline';

function NavbarProfile({ toggleNav }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user : null;

    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };
  return (
    <div>
    <nav className="bg-gray-200 shadow-lg">
      <div className="flex items-center justify-between p-2">
        <div className='flex justify-center text-gray-600 font-bold items-center'><button onClick={toggleNav} className='mr-2'><MenuIcon className="h-8 w-8 mr-2" /></button><h5>Tableau de bord</h5></div>
        <div className="relative">
          <button onClick={toggleDropdown} className="text-white px-4 hover:text-gray-300 focus:outline-none">
            <UserCircleIcon className="h-8 w-8 text-[#00246B]" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white rounded shadow-lg">
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">{userData.nom + ' '+userData.prenom}</div>
              <Link  onClick={()=>{localStorage.removeItem("user")}} to="/app/ista" className="block px-4 py-2 text-red-500 font-bold hover:bg-gray-200">Déconnexion</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
    </div>
  )
}

export default NavbarProfile
