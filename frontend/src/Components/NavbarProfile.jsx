import {useState} from 'react'
import { UserCircleIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { MenuIcon } from '@heroicons/react/outline';

function NavbarProfile() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };
  return (
    <div>
    <nav className="bg-gray-200 shadow-lg">
      <div className="flex items-center justify-between p-2">
        <div className='flex justify-center text-gray-600 font-bold items-center'><MenuIcon className="h-8 w-8 mr-2" /><h5>Tableau de bord</h5></div>
        <div className="relative">
          <button onClick={toggleDropdown} className="text-white px-4 hover:text-gray-300 focus:outline-none">
            <UserCircleIcon className="h-8 w-8 text-[#00246B]" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white rounded shadow-lg">
              <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
              <Link to="/deconnexion" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Déconnexion</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
    </div>
  )
}

export default NavbarProfile
