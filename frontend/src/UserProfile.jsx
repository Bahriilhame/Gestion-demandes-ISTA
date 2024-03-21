import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSave } from '@fortawesome/free-solid-svg-icons';
import Toast from "./Components/Toast";
import { useNavigate } from "react-router-dom";
import { UserIcon } from '@heroicons/react/outline';

export default function UserProfile({darkMode}) {
    const [userData,setUserData] =useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user : null)

    const fetchData = async () => {
      try {
          const response = await axios.get(`http://127.0.0.1:8000/api/gestionnaires/${userData.id}/user-profile`);
          localStorage.setItem('user', JSON.stringify(response.data));
          setUserData(response.data)
          setNom(response.data.nom);
          setPrenom(response.data.prenom);
          setEmail(response.data.email);
          setPassword('')
          setConfirmPassword('')
      } catch (error) {
          console.error('Error fetching user profile:', error);
      }
  };

  const navigate=useNavigate()
  const [nom, setNom] = useState(userData.nom);
  const [prenom, setPrenom] = useState(userData.prenom);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState();


  const handleSave = () => {
    if(password=='' && confirmPassword==''){
      setError("Entrer votre mot de passe");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    const updatedData = {
      nom: nom,
      prenom: prenom,
      email: email,
      password: password,
    };

    axios.put(`http://127.0.0.1:8000/api/UpdateGestionnaire/${userData.id}`, updatedData)
      .then(() => {
        localStorage.removeItem("user")
        setShowNotification(true);
        fetchData()
        navigate('/app/ista')
      })
      .catch(() => {
        setError("Erreur lors de la mise à jour , essayez plus tard");
      });
  };

  return (
    <div>
      <div className={`container mx-auto px-4 py-8 text-lg ${darkMode ? 'dark bg-gray-800 text-lg' : ''}`}>
        {showNotification && <Toast />} 
        <h1 className={`text-3xl font-bold mb-6 flex align-bottom items-end ${darkMode ? ' text-white' : ''}`}>
          <UserIcon className="w-10 text-blue-800"/>
          Profil</h1>
        <div className="mb-4">
          <label htmlFor="nom" className={`block ${darkMode ? ' text-white' : ''} font-semibold mb-1`}>Nom:</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className={`block  ${darkMode ? 'dark bg-gray-800 text-gray-300' : ''} w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Entrez votre nom"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="prenom" className={`block ${darkMode ? ' text-white' : ''} font-semibold mb-1`}>Prénom:</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className={`block  ${darkMode ? 'dark bg-gray-800 text-gray-300' : ''} w-full px-4 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Entrez votre prénom"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className={`block ${darkMode ? ' text-white' : ''} font-semibold mb-1`}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`block  ${darkMode ? 'dark bg-gray-800 text-gray-300' : ''} w-full px-4 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Entrez votre email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className={`block ${darkMode ? ' text-white' : ''} font-semibold mb-1`}>Mot de passe:</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`block  ${darkMode ? 'dark bg-gray-800 text-gray-300' : ''} w-full px-4 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Entrez votre mot de passe"
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className={`block ${darkMode ? ' text-white' : ''} font-semibold mb-1`}>Confirmez le mot de passe:</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`block  ${darkMode ? 'dark bg-gray-800 text-gray-300 ' : ''} w-full px-4 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Confirmez votre mot de passe"
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
            </button>
          </div>
            <span className='text-red-500 text-lg pl-2'>{error}</span>        
          </div>
        <div className="flex justify-end">
          <button onClick={handleSave} className="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 w-full rounded">
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
}
