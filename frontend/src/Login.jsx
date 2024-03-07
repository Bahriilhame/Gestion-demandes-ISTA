import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [mdp, setMdp] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                mdp,
            });
            const role = response.data.role;

            if (role === 'directeur') {
                navigate('/dashboard-directeur/listDemandes', { state: { showNotification: true } });
            } else if (role === 'gestionnaire') {
                navigate('/dashboard-gestionnaire/listDemandes', { state: { showNotification: true } });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='overflow-hidden bg-gray-100'>
            <nav className="bg-[#00246B] p-4 z-10">
                <div className="flex items-center justify-start">
                    <img src='./logo.png' alt="Logo" className="h-14" /> {/* Remplacez la source par votre logo */}
                    <div className='text-white ml-2 font-bold text-lg'>
                        <h1>ISTA HAY SALAM</h1>
                    </div>
                </div>
            </nav>
            <div className=" bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Connexion</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mot de passe
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Mot de passe"
                                    value={mdp}
                                    onChange={(e) => setMdp(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Connexion
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Login;



